export function isObjectButNotArray(data: any): boolean {
    return typeof data === 'object' && !Array.isArray(data);
}
