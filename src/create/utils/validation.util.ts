import { ClassOrInterfaceInfo } from '../../shared/types/class-or-interface-info.type';
import { isObject } from '@genese/core';
import { requiredProperties } from '../../init/utils/property.util';
import * as chalk from 'chalk';


export function hasRequiredProperties(data: any, declaration: ClassOrInterfaceInfo): boolean {
    console.log(chalk.magentaBright('has rqqqqqq'), data, declaration);
    console.log(chalk.magentaBright('has rqqqqqq'), isObject(data));
    console.log(chalk.magentaBright('has rqqqqqq'), requiredProperties(declaration.properties));
    return isObject(data) && requiredProperties(declaration.properties).every(p => Object.keys(data).includes(p.name));
}
