import * as chalk from 'chalk';
import { CreateOptions } from '../models/create-options.model';
import { CONFIG } from '../const/config.const';

export function throwError(message = '', value: any = ''): never {
    console.log(chalk.redBright(`Error : ${message}`), value);
    throw Error(value);
}

export function throwWarning(message = '', value: any = ''): void {
    console.log(chalk.yellowBright(`Warning : ${message}`), value);
}


export function throwTarget(target: string, data?: any, options?: CreateOptions): any | never {
    const opt: CreateOptions = options ?? CONFIG.create;
    if (opt.throwTarget.error) {
        throwError(`impossible to read target "${target}" and throwTarget.error is set to true in geneseconfig.json or in the createOption parameter of Mapper.create().`);
    } else if (opt.throwTarget.setToUndefined) {
        throwWarning(`impossible to read target "${target}". @genese/mapper interpreted it as "any" and data will be set to "undefined" in the mapped response. You can change this behavior in geneseconfig.json or as option in Mapper.create().`);
        return undefined;
    } else {
        throwWarning(`impossible to read target "${target}". @genese/mapper interpreted it as "any" and data will be set "as is" in the mapped response. You can change this behavior in geneseconfig.json or as option in Mapper.create().`);
        return data;
    }
}
