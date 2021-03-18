export function throwError(message = '', value: any = ''): void {
    console.log(`Error : ${message}\n`, value);
}


export function throwWarning(message = '', value: any = ''): void {
    console.log(`Warning : ${message}\n`, value);
}
