export type IndexableKey = `[${string}:${string}]: ${string}`;

export function isIndexableKey(text: string): text is IndexableKey {
    return /^\[\w+: \w+]: \w+$/.test(text.trim());
}


export function startsWithIndexableKey(text: string): text is IndexableKey {
    return /^\[\w+: \w+]: \w+/.test(text.trim());
}
