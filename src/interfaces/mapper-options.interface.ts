export interface MapperOptions {

    classFilePath: string; // If you have two classes with the same name, you must add this option to remove the ambiguity
    isInterface: boolean // false by default. isInterface and isType can't be both true
    isType: boolean // false by default. isInterface and isType can't be both true

}
