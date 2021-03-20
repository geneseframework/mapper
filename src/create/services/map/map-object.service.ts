import { MapperConfig } from '../../../shared/models/config.model';
import { CurveBracketed } from '../../types/target/string/curve-bracketed.type';
import { removeBorders } from '../../../shared/utils/strings.util';
import * as chalk from 'chalk';
import { getFirstContainer, hasLeftBorder } from '../../types/target/string/borders.type';
import { Containerized } from '../../types/target/string/containerized.type';
import { isComma } from '../../types/target/string/commas.type';
import { trimSeparators } from '../../utils/target.util';
import { Property } from '../../../shared/types/target/property.type';

export class MapObjectService {


    static create(target: CurveBracketed, data: any, options?: MapperConfig): object {
        console.log(chalk.cyanBright('MAP OBJJJJJJ'), target, data);
        return this.createNewInstance(target);
    }

    // TODO: check if it really runs
    private static createNewInstance(target: CurveBracketed): object {
        const newInstance = {};
        const properties: string[] = this.getProperties(target);
        console.log(chalk.magentaBright('MAP OBJJJJJJ properties'), properties);
        for (const property of properties) {
            this.addMappedProperty(newInstance, property);
        }
        return newInstance;
    }


    private static getProperties(target: CurveBracketed): string[] {
        const properties: string[] = [];
        let textToParse: string = removeBorders(target);
        while (textToParse.length > 0) {
            textToParse = trimSeparators(textToParse);
            const nextProperty: string = this.getNextPropertyText(textToParse);
            console.log(chalk.redBright('MAP OBJJJJJJ nextProperty'), nextProperty);
            properties.push(nextProperty);
            textToParse = nextProperty ? textToParse.slice(nextProperty.length) : textToParse.slice(1);
        }
        return properties;
    }


    private static getNextPropertyText(text: string): string {
        const propertyName: string = this.getPropertyName(text);
        let property: string = propertyName;
        console.log(chalk.yellowBright('MAP OBJJJJJJ property'), property);
        let rest: string = text.slice(propertyName.length);
        let propertyLength: number = propertyName.length;
        let isTheEndOfTheProperty = false;
        while (rest.length > 0 && !isTheEndOfTheProperty) {
            if (hasLeftBorder(rest)) {
                const container: Containerized = getFirstContainer(rest);
                rest = rest.slice(container.length);
                propertyLength += container.length;
            } else if (isComma(rest.charAt(0))) {
                isTheEndOfTheProperty = true;
            } else {
                rest = rest.slice(1);
                propertyLength++;
            }
        }
        return text.slice(0, propertyLength);
    }


    private static getPropertyName(text: string): string {
        return text.match(/^\w+:/g)?.[0]?.slice(0, -1);
    }


    private static addMappedProperty(instance: any, property: string): void {

    }


    private static getNextProperty(target: string): Property {
        const property: Property = {};
        property.name = target.match(/^\w+:/g)?.[0]?.slice(0, -1);
        console.log(chalk.yellowBright('MAP OBJJJJJJ nextPropertyName'), property.name);
        if (property.name) {
            const rest: string = target.slice(property.name.length + 1).trimLeft();
            const firstChar: string = rest[0];
            console.log(chalk.yellowBright('MAP OBJJJJJJ firstChar'), firstChar);
            if (hasLeftBorder(rest)) {
                property.type = getFirstContainer(rest);
            } else {
                property.type = this.getFirstWord(rest);
            }
        }
        return property;
    }


    private static isNewInstance(text: string) {
        // TODO
    }


    private static getFirstWord(text: string) {
        return text ?? text.split(' ')[0];
    }


}
