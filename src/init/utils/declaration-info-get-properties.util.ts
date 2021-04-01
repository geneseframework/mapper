import { Property } from '../../shared/types/target/property.type';
import { PropertyDeclarationOrSignature } from '../types/property-declaration-or-signature.type';
import { hasTypeLiteral } from './ast/ast-type-literal.util';
import { HierarchicTypeLiteralService } from '../services/hierarchic-type-literal.service';
import { declarationType } from './ast/ast-declaration.util';
import { isTypeLiteralProperty } from '../models/type-literal-property.model';
import { TypeLiteralNode } from 'ts-morph';
import { InterfaceInfo } from '../../shared/models/declarations/interface-info.model';
import { INIT } from '../const/init.const';
import { capitalize } from '../../shared/utils/strings.util';
import { ClassOrInterfaceDeclaration } from '../types/class-or-interface-declaration.type';

/**
 * Returns the array of Property of a given ClassDeclaration or InterfaceDeclaration
 * @param declaration   // The ClassDeclaration or InterfaceDeclaration
 */
export function getPropertiesFromClassOrInterface(declaration: ClassOrInterfaceDeclaration): Property[] {
    const properties: Property[] = [];
    for (const propDecOrSign of declaration.getProperties()) {
        properties.push(getPropertyFromDeclarationOrSignature(propDecOrSign))
    }
    return properties;
}

/**
 * Returns the Property corresponding to a given PropertyDeclaration or PropertySignature
 * - If it has a TypeLiteral Node, returns a Property with a type corresponding to the stringifiedType created during the HTLService process
 * - If not, returns a Property with a name corresponding to the PropertyStructure name and a type corresponding to the structureType of the property itself
 * @param propDecOrSign     // The PropertyDeclaration or PropertySignature
 */
function getPropertyFromDeclarationOrSignature(propDecOrSign: PropertyDeclarationOrSignature): Property {
    if (hasTypeLiteral(propDecOrSign)) {
        return {name: propDecOrSign.getName(), type: HierarchicTypeLiteralService.create(propDecOrSign).stringifiedType};
    } else {
        const propertyStructure = propDecOrSign.getStructure();
        return {name: propertyStructure.name, type: declarationType(propDecOrSign), initializer: propertyStructure.initializer, isRequired: !propertyStructure.hasQuestionToken} as Property;
    }
}

/**
 * Returns the InterfaceInfo with some given name and corresponding to a given TypeLiteral Node (HTLService process)
 * @param interfaceInfoName     // The name of the future InterfaceInfo
 * @param typeLiteralNode       // The TypeLiteral Node corresponding to the InterfaceInfo to create
 */
function createInterfaceInfoFromTypeLiteralNode(interfaceInfoName: string, typeLiteralNode: TypeLiteralNode): InterfaceInfo {
    const properties: Property[] = [];
    for (const propertySignature of typeLiteralNode.getProperties()) {
        const interfaceInfoPropertyName = `${interfaceInfoName}${propertySignature.getName()}`;
        properties.push(getPropertyFromPropertySignature(interfaceInfoPropertyName, propertySignature));
    }
    const interfaceInfo = new InterfaceInfo(interfaceInfoName, typeLiteralNode.getSourceFile().getFilePath(), properties);
    INIT.addDeclarationInfo(interfaceInfo);
    return interfaceInfo;
}

/**
 * Returns the Property corresponding to a given PropertyDeclaration or PropertySignature with a name composed from a given parent name
 * - If it has a TypeLiteral Node, returns a Property with a type corresponding to the PropertyStructure name and the type corresponding to a new InterfaceInfo created from the TypeLiteral Node of the PropertyDeclaration or PropertySignature
 * - If not, returns a Property with a name corresponding to the PropertyStructure name and a type corresponding to the structureType of the property itself
 * @param parentName        // The name of the parent HTL (ex: the name of the parent property, the parent typeAlias or the parent HTL for the TL Node parent)
 * @param propDecOrSign     // Some PropertyDeclaration or PropertySignature
 */
function getPropertyFromPropertySignature(parentName: string, propDecOrSign: PropertyDeclarationOrSignature): Property {
    if (isTypeLiteralProperty(propDecOrSign)) {
        const typeLiteralNode: TypeLiteralNode = propDecOrSign.getTypeNode();
        const newInterfaceInfo: InterfaceInfo = createInterfaceInfoFromTypeLiteralNode(getInterfaceInfoName(parentName, propDecOrSign.getName()), typeLiteralNode);
        return {name: propDecOrSign.getName(), type: newInterfaceInfo.name};
    } else {
        const propertyStructure = propDecOrSign.getStructure();
        return {name: propertyStructure.name, type: propertyStructure.type, initializer: propertyStructure.initializer, isRequired: !propertyStructure.hasQuestionToken} as Property;
    }
}

/**
 * Returns a name mixing the name of a declaration and a name of a property
 * @param declarationName   // The name of the Declaration
 * @param propertyName      // The name of its property
 */
function getInterfaceInfoName(declarationName: string, propertyName: string): string {
    return `${declarationName}${capitalize(propertyName)}`;
}
