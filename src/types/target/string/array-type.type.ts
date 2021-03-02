export type ArrayType = `${string}[]`;

export function typeOfArray(text: ArrayType): string {
    return text.slice(0, -2);
}
