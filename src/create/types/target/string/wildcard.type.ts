export type WildCard = 'any' | 'unknown' | undefined;


export function isWildCard(typeName: string): boolean {
    return typeName === 'any' || typeName === undefined || typeName === 'unknown';
}
