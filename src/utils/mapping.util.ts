
/**
 * Calls a mapper function asking target and key values and returns the element mapped by this function
 * @param mapper
 * @param args
 */
export function newMappedElement<T>(mapper: (target: any, key: any, ...args: any[]) => void, ...args: any): T {
    const root = { rootKey: undefined };
    mapper(root, 'rootKey', ...args);
    return root.rootKey;
}
