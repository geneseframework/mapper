import { ClassDeclaration, InterfaceDeclaration, TypeLiteralNode } from 'ts-morph';
import { Property } from '../../shared/types/target/property.type';
import { PropertyDeclarationOrSignature } from './property-declaration-or-signature.type';
import { hasTypeLiteral } from '../utils/ast/ast-type-literal.util';
import { HierarchicTypeLiteralService } from '../services/hierarchic-type-literal.service';
import { isTypeLiteralProperty } from './type-literal-property.type';
import { InterfaceInfo } from '../../shared/models/declarations/interface-info.model';
import { INIT } from '../const/init.const';
import { capitalize } from '../../shared/utils/strings.util';
import { TargetService } from '../../create/services/target.service';
import { declarationType } from '../utils/ast/ast-declaration.util';


export type ClassOrInterfaceDeclaration = ClassDeclaration | InterfaceDeclaration;



export function getPropertiesFromClassOrInterface(declaration: ClassOrInterfaceDeclaration): Property[] {
    const properties: Property[] = [];
    for (const propDecOrSign of declaration.getProperties()) {
        properties.push(getPropertyFromPropDecOrSign(declaration.getName(), propDecOrSign))
    }
    return properties;
}


function getPropertyFromPropDecOrSign(parentName: string, propDecOrSign: PropertyDeclarationOrSignature): Property {
    if (hasTypeLiteral(propDecOrSign)) {
        // console.log(chalk.yellowBright('PROPERTYYYYYY'), propDecOrSign.getName(), propDecOrSign.getKindName(), propDecOrSign.getName());
        return {name: propDecOrSign.getName(), type: HierarchicTypeLiteralService.create(propDecOrSign).stringifiedType};
    } else {
        const propertyStructure = propDecOrSign.getStructure();
        // const stringifiedType: string = TargetService.removeIncorrectChars(propertyStructure.type)
        const prop = {name: propertyStructure.name, type: declarationType(propDecOrSign), initializer: propertyStructure.initializer, isRequired: !propertyStructure.hasQuestionToken} as Property;
        return prop;
    }
}


function getPropertyFromPropertySignature(parentName: string, propertySignature: PropertyDeclarationOrSignature): Property {
    if (isTypeLiteralProperty(propertySignature)) {
        const typeLiteralNode: TypeLiteralNode = propertySignature.getTypeNode();
        const newInterfaceInfo: InterfaceInfo = createInterfaceInfoFromTypeLiteralNode(getInterfaceInfoName(parentName, propertySignature.getName()), typeLiteralNode);
        return {name: propertySignature.getName(), type: newInterfaceInfo.name};
    } else {
        const propertyStructure = propertySignature.getStructure();
        return {name: propertyStructure.name, type: propertyStructure.type, initializer: propertyStructure.initializer, isRequired: !propertyStructure.hasQuestionToken} as Property;
    }
}


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


function getInterfaceInfoName(declarationName: string, propertyName: string): string {
    return `${declarationName}${capitalize(propertyName)}`;
}
