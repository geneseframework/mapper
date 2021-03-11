import { hasSeparators } from './has-separators.type';

export type ArrayType = `${string}[]`;
export type EndsWithEmptyBrackets = ArrayType;


export function isArrayType(text: string): text is ArrayType {
    return endsWithEmptyBrackets(text) && !hasSeparators(typeOfArray(text));
}


function endsWithEmptyBrackets(text: string): text is EndsWithEmptyBrackets {
    return /^\w.*\[\]$/g.test(text);
}

export function typeOfArray(text: ArrayType): string {
    return text.slice(0, -2);
}
