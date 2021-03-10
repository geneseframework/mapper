
/**
 * Calls a mapper function asking target and key initializers and returns the element mapped by this function
 * @param mapper
 * @param args
 */
export async function newMappedElement<T>(mapper: (target: any, key: any, ...args: any[]) => Promise<void>, ...args: any): Promise<T> {
    const root = { rootKey: undefined };
    await mapper(root, 'rootKey', ...args);
    return root.rootKey;
}
