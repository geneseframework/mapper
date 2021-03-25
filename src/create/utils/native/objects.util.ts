export function isObject(data: any): data is object {
    return typeof data === 'object';
}


export function isObjectType(text: string): text is 'object' | 'Object' {
    return ['object', 'Object'].includes(text);
}
