export function hasTypeOfObjectButIsNotArray(data: any): boolean {
    return typeof data === 'object' && !Array.isArray(data);
}
