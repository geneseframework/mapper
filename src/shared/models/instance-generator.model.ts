/**
 * Mandatory elements for the generation of the instance-generator.js file
 */
export class InstanceGenerator<T> {

    numberOfConstructorArguments: number = undefined;       // The number of the arguments of the constructor of a given class
    typeDeclarationPath: string = undefined;                // The path of the file where the class is declared in the project of the user
    typeName: string = undefined;                           // The name of the class


    constructor(typeName: string, typeDeclarationPath: string, numberOfConstructorArguments: number) {
        this.typeName = typeName;
        this.typeDeclarationPath = typeDeclarationPath;
        this.numberOfConstructorArguments = numberOfConstructorArguments;
    }

    /**
     * Returns the 'id' of the InstanceGenerator, (ie: the text in the 'case' clause in the instance-generator.js file)
     */
    get id(): string {
        return `${this.typeName}_${this.typeDeclarationPath.toLowerCase()}`;
    }
}
