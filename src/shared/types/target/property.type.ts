/**
 * Info about a given property of a class, interface or type which will be used to generate the declaration-infos.js file
 * and which will be used later by the create() method
 */
export type Property = {
    initializer?: any, // TODO: Initializer with new()
    isRequired?: boolean,
    name?: string,
    stringifiedType?: string,
}
