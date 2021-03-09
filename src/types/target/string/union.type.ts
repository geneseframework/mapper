export type Union = `${string}|${string}`;


export function hasUnion(text: string): text is Union {
    return /.+\|.+/g.test(text);
}
