/**
 * Info about a given property of a class, interface or type which will be used to generate the declaration-infos.js file
 * and which will be used later by the create() method
 */
export class Property {

    hasQuestionToken?: boolean;
    initializer?: any; // TODO: Initializer with new()
    name?: string;
    stringifiedType?: string;

    constructor(name?: string, stringifiedType?: string, initializer?: any, hasQuestionToken?: boolean) {
        this.name = name;
        this.stringifiedType = stringifiedType;
        this.initializer = initializer;
        this.hasQuestionToken = hasQuestionToken;
    }


    get isRequired(): boolean {
        return !this.hasQuestionToken && !this.initializer;
    }
}
