export function throwError(message = '', value: any = ''): void {
    console.log(`Error : ${message}\n`, value);
}


export function throwWarning(message = '', value: any = ''): void {
    console.log(`Warning : ${message}\n`, value);
}


// export function throwTarget(target: string, data?: any, options?: MapperConfig): any | never {
//     const opt: MapperConfig = options ?? GLOBAL.config;
//     if (opt.throwTarget.error) {
//         throwError(`impossible to read target "${target}" and throwTarget.error is set to true in geneseconfig.json or in the createOption parameter of Mapper.create().`);
//     } else if (opt.throwTarget.setToUndefined) {
//         throwWarning(`impossible to read target "${target}". @genese/mapper interpreted it as "any" and data will be set to "undefined" in the mapped response. You can change this behavior in geneseconfig.json or as option in Mapper.create().`);
//         return undefined;
//     } else {
//         throwWarning(`impossible to read target "${target}". @genese/mapper interpreted it as "any" and data will be set "as is" in the mapped response. You can change this behavior in geneseconfig.json or as option in Mapper.create().`);
//         return data;
//     }
// }
