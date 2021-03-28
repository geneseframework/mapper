import { CurvedBracketed } from '../../types/target/string/curve-bracketed.type';
import { removeBorders } from '../../../shared/utils/strings.util';
import * as chalk from 'chalk';
import { getFirstContainer, hasLeftBorder } from '../../types/target/string/borders.type';
import { Containerized } from '../../types/target/string/containerized.type';
import { isComma } from '../../types/target/string/commas.type';
import { trimSeparators } from '../../utils/target.util';
import { Property } from '../../../shared/types/target/property.type';
import { MapperBehavior } from '../../../shared/models/config-behavior.model';

export class MapObjectService {

    // TODO: create(some object)
    // static create(target: CurvedBracketed, data: any, options?: MapperBehavior): object {
        // console.log(chalk.cyanBright('MAP OBJJJJJJ'), target, data);
        // return this.createNewInstance(target);
    // }

    // TODO: check if it really runs and if we need options
    // private static createNewInstance(target: CurvedBracketed): object {
    //     const newInstance = {};
    //     const properties: string[] = this.getPropertiesFromClassOrInterface(target);
    //     console.log(chalk.magentaBright('MAP OBJJJJJJ properties'), properties);
    //     for (const property of properties) {
    //         this.addMappedProperty(newInstance, property);
    //     }
    //     return newInstance;
    // }
    //
    //
    // private static getPropertiesFromClassOrInterface(target: CurvedBracketed): string[] {
    //     const properties: string[] = [];
    //     let textToParse: string = removeBorders(target);
    //     while (textToParse.length > 0) {
    //         textToParse = trimSeparators(textToParse);
    //         const nextProperty: string = this.getNextPropertyText(textToParse);
    //         console.log(chalk.redBright('MAP OBJJJJJJ nextProperty'), nextProperty);
    //         properties.push(nextProperty);
    //         textToParse = nextProperty ? textToParse.slice(nextProperty.length) : textToParse.slice(1);
    //     }
    //     return properties;
    // }
    //
    //
    // private static getNextPropertyText(stringifiedType: string): string {
    //     const propertyName: string = this.getPropertyName(stringifiedType);
    //     let property: string = propertyName;
    //     console.log(chalk.yellowBright('MAP OBJJJJJJ property'), property);
    //     let rest: string = stringifiedType.slice(propertyName.length);
    //     let propertyLength: number = propertyName.length;
    //     let isTheEndOfTheProperty = false;
    //     while (rest.length > 0 && !isTheEndOfTheProperty) {
    //         if (hasLeftBorder(rest)) {
    //             const container: Containerized = getFirstContainer(rest);
    //             rest = rest.slice(container.length);
    //             propertyLength += container.length;
    //         } else if (isComma(rest.charAt(0))) {
    //             isTheEndOfTheProperty = true;
    //         } else {
    //             rest = rest.slice(1);
    //             propertyLength++;
    //         }
    //     }
    //     return stringifiedType.slice(0, propertyLength);
    // }
    //
    //
    // private static getPropertyName(stringifiedType: string): string {
    //     return stringifiedType.match(/^\w+:/g)?.[0]?.slice(0, -1);
    // }
    //
    //
    // private static addMappedProperty(instance: any, property: string): void {
    //
    // }
    //
    //
    // private static getNextProperty(target: string): Property {
    //     const property: Property = {};
    //     property.name = target.match(/^\w+:/g)?.[0]?.slice(0, -1);
    //     console.log(chalk.yellowBright('MAP OBJJJJJJ nextPropertyName'), property.name);
    //     if (property.name) {
    //         const rest: string = target.slice(property.name.length + 1).trimLeft();
    //         const firstChar: string = rest[0];
    //         console.log(chalk.yellowBright('MAP OBJJJJJJ firstChar'), firstChar);
    //         if (hasLeftBorder(rest)) {
    //             property.type = getFirstContainer(rest);
    //         } else {
    //             property.type = this.getFirstWord(rest);
    //         }
    //     }
    //     return property;
    // }
    //
    //
    // private static isNewInstance(stringifiedType: string) {
    //     // TODO
    // }
    //
    //
    // private static getFirstWord(stringifiedType: string) {
    //     return stringifiedType ?? stringifiedType.split(' ')[0];
    // }


}
