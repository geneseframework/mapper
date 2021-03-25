export type Numeric = string;

export function isNumeric(text: string): text is Numeric {
    return !isNaN(Number(text));
}
