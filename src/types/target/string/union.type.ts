export type Union = `${string}|${string}`;


export function isUnion(text: string): text is Union {
    return /.+\|.+/g.test(text);
}
