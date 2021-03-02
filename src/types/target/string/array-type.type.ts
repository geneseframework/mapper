export type ArrayType = `${string}[]`;


export function isArrayType(target: string): target is ArrayType {
    return /^\w.*\[\]$/g.test(target);
}

export function typeOfArray(text: ArrayType): string {
    return text.slice(0, -2);
}
