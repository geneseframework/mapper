export interface MapperOptions {

    classFilePath?: string; // If you have two classes with the same name, you must add this option to remove the ambiguity
    isArray?: boolean // false by default.
    isEnum?: boolean // false by default. Only one element of [isEnum, isInterface, isType] can be true
    isInterface?: boolean // false by default. Only one element of [isEnum, isInterface, isType] can be true
    isType?: boolean // false by default. Only one element of [isEnum, isInterface, isType] can be true

}
