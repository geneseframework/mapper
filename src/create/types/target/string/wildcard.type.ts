export type WildCard = 'any' | 'unknown' | undefined;


export function isWildCard(typeName: string): typeName is WildCard {
    return typeName === 'any' || typeName === undefined || typeName === 'unknown';
}
