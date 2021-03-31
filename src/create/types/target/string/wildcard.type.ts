/**
 * Kind of properties which will be interpreted as 'any' by the create() method
 */
export type WildCard = 'any' | 'unknown' | undefined;

/**
 * Checks if a property type must be understood as 'any' by the create() method
 * @param typeName      // The type of the property
 */
export function isWildCard(typeName: string): typeName is WildCard {
    return typeName === 'any' || typeName === undefined || typeName === 'unknown';
}
