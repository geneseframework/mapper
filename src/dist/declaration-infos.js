const declarationInfos = [
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/out-of-project.model.ts`,
        kind: `Class`,
        name: `OutOfProject`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `name`,
            type: `'oop'`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/models/address.model.ts`,
        kind: `Class`,
        name: `Address`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 3,
        properties: [
        {
            initializer: `undefined`,
            isRequired: true,
            name: `street`,
            type: `string`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `streetNumber`,
            type: `number`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `town`,
            type: `string`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/models/animal.model.ts`,
        kind: `Class`,
        name: `Animal`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 1,
        properties: [
        {
            initializer: `undefined`,
            isRequired: true,
            name: `age`,
            type: `number`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `kind`,
            type: `string`
        },
        {
            initializer: `true`,
            isRequired: true,
            name: `live`,
            type: undefined
        },
        {
            initializer: undefined,
            isRequired: true,
            name: `order`,
            type: `Order`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/models/cat.model.ts`,
        kind: `Class`,
        name: `Cat`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 3,
        properties: [
        {
            initializer: `[]`,
            isRequired: true,
            name: `colors`,
            type: `Color[]`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `favouritePrey`,
            type: `Prey`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `friend`,
            type: `Person`
        },
        {
            initializer: `false`,
            isRequired: true,
            name: `hungry`,
            type: undefined
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `mood`,
            type: `Mood`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `name`,
            type: `string`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `race`,
            type: `Race`
        },
        {
            initializer: undefined,
            isRequired: true,
            name: `tattoo`,
            type: `[string, number, Color, Person]`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/models/company.model.ts`,
        kind: `Class`,
        name: `Company`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `name`,
            type: `string`
        },
        {
            initializer: undefined,
            isRequired: true,
            name: `employees`,
            type: `number`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/models/main-app-process.ts`,
        kind: `Class`,
        name: `MainAppProcess`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/models/ngo.model.ts`,
        kind: `Class`,
        name: `Ngo`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `name`,
            type: `string`
        },
        {
            initializer: undefined,
            isRequired: true,
            name: `volunteers`,
            type: `number`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/models/organism.model.ts`,
        kind: `Class`,
        name: `Organism`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: true,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `live`,
            type: `boolean`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/models/person.model.ts`,
        kind: `Class`,
        name: `Person`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 6,
        properties: [
        {
            initializer: `undefined`,
            isRequired: true,
            name: `address`,
            type: `Address`
        },
        {
            initializer: `[]`,
            isRequired: true,
            name: `cats`,
            type: `Cat[]`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `employer`,
            type: `Employer`
        },
        {
            initializer: `[]`,
            isRequired: true,
            name: `family`,
            type: `Person[]`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `firstName`,
            type: `string`
        },
        {
            initializer: undefined,
            isRequired: true,
            name: `isHappy`,
            type: `boolean`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `lastName`,
            type: `string`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `nickNames`,
            type: `StringOrStrings`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/check-targets.spec.ts`,
        kind: `Class`,
        name: `CheckClassSpec`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `name`,
            type: `string`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/check-targets.spec.ts`,
        kind: `Class`,
        name: `NotExportedCheckClassSpec`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `name`,
            type: `string`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/check-typing.ts`,
        kind: `Class`,
        name: `FooClass`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `foo`,
            type: `string`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/check-typing.ts`,
        kind: `Class`,
        name: `BarClass`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `bar`,
            type: `string`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `Class`,
        name: `OnePrimitiveClassSpec`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `prop`,
            type: `string`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `Class`,
        name: `ClassWithPrimitivesSpec`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `str`,
            type: `string`
        },
        {
            initializer: undefined,
            isRequired: true,
            name: `num`,
            type: `number`
        },
        {
            initializer: undefined,
            isRequired: true,
            name: `bool`,
            type: `boolean`
        },
        {
            initializer: undefined,
            isRequired: true,
            name: `strs`,
            type: `string[]`
        },
        {
            initializer: undefined,
            isRequired: true,
            name: `nums`,
            type: `number[]`
        },
        {
            initializer: undefined,
            isRequired: true,
            name: `bools`,
            type: `boolean[]`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `Class`,
        name: `ClassWithAnySpec`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `a`,
            type: `any`
        },
        {
            initializer: undefined,
            isRequired: true,
            name: `b`,
            type: `any[]`
        },
        {
            initializer: undefined,
            isRequired: true,
            name: `c`,
            type: undefined
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `Class`,
        name: `IndexableSpec`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        indexableType: {
            returnType: `string`,
            type: `string`
        },
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `a`,
            type: `string`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `Class`,
        name: `IndexableNumberSpec`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        indexableType: {
            returnType: `string`,
            type: `number`
        },
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `a`,
            type: `string`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `Class`,
        name: `ValuesByDefault`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `'aaa'`,
            isRequired: true,
            name: `a`,
            type: undefined
        },
        {
            initializer: `2`,
            isRequired: true,
            name: `b`,
            type: undefined
        },
        {
            initializer: `false`,
            isRequired: true,
            name: `c`,
            type: undefined
        },
        {
            initializer: `true`,
            isRequired: true,
            name: `d`,
            type: undefined
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `Class`,
        name: `ValuesOnConstructor`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 4,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `a`,
            type: undefined
        },
        {
            initializer: undefined,
            isRequired: true,
            name: `b`,
            type: undefined
        },
        {
            initializer: undefined,
            isRequired: true,
            name: `c`,
            type: undefined
        },
        {
            initializer: undefined,
            isRequired: true,
            name: `d`,
            type: undefined
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `Class`,
        name: `CatSpec`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `name`,
            type: `string`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `Class`,
        name: `PersonCatSpec`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `age`,
            type: `number`
        },
        {
            initializer: undefined,
            isRequired: true,
            name: `cat`,
            type: `CatSpec`
        },
        {
            initializer: undefined,
            isRequired: true,
            name: `firstName`,
            type: `string`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `Class`,
        name: `ParentClassSpec`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 1,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `name`,
            type: `string`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `Class`,
        name: `ChildClassSpec`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 2,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `color`,
            type: `string`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `Class`,
        name: `AbstractParentClassSpec`,
        typeParameters: [
        ],
        hasPrivateConstructor: true,
        isAbstract: true,
        numberOfConstructorArguments: 1,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `name`,
            type: `string`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `Class`,
        name: `ChildAbstractClassSpec`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 2,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `color`,
            type: `string`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `Class`,
        name: `CDefaultsSpec`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `{
        name: 'Léa'
    }`,
            isRequired: true,
            name: `person`,
            type: `IDefaultsSpec`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `Class`,
        name: `StringOrNumberClassSpec`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `age`,
            type: `string | number`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `Class`,
        name: `NullSpec`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `prop`,
            type: `null`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `Class`,
        name: `UndefinedSpec`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `prop`,
            type: `undefined`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `Class`,
        name: `UnknownSpec`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `prop`,
            type: `unknown`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `Class`,
        name: `NumberLiteralSpec`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `prop`,
            type: `4`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `Class`,
        name: `StringLiteralSpec`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `prop`,
            type: `'a'`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `Class`,
        name: `BooleanLiteralSpec`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `prop`,
            type: `false`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `Class`,
        name: `PaintStringsOrStringSpec`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `colors`,
            type: `StringsOrStringSpec`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `Class`,
        name: `PaintStringOrStringsSpec`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `colors`,
            type: `StringOrStringsSpec`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `Class`,
        name: `AgeNumbersOrNumberSpec`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `ages`,
            type: `NumbersOrNumberSpec`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `Class`,
        name: `AgeNumberOrNumbersSpec`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `ages`,
            type: `NumberOrNumbersSpec`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `Class`,
        name: `LevelClassSpec`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `level`,
            type: `LevelSpec`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `Class`,
        name: `NameSpec`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `name`,
            type: `string`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `Class`,
        name: `ClassWithUnionTypeSpec`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `union`,
            type: `UnionTypeClassAndStringSpec`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `Class`,
        name: `NgoSpec`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `name`,
            type: `string`
        },
        {
            initializer: undefined,
            isRequired: true,
            name: `volunteers`,
            type: `number`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `Class`,
        name: `CompanySpec`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `name`,
            type: `string`
        },
        {
            initializer: undefined,
            isRequired: true,
            name: `employees`,
            type: `number`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `Class`,
        name: `PersonSpec`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `employer`,
            type: `EmployerSpec`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `Class`,
        name: `ObjectLiteralStringSpec`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `prop`,
            type: `{str: string}`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `Class`,
        name: `ObjectLiteralStringNumberSpec`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `prop`,
            type: `{str: string, nb: number}`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/dates.spec.ts`,
        kind: `Class`,
        name: `DateSpec`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `date`,
            type: `Date`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/enums.spec.ts`,
        kind: `Class`,
        name: `ColorClassSpec`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `color`,
            type: `ColorSpec`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/enums.spec.ts`,
        kind: `Class`,
        name: `ColorsClassSpec`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `colors`,
            type: `ColorSpec[]`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/generics.spec.ts`,
        kind: `Class`,
        name: `TClass`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `name`,
            type: `string`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/generics.spec.ts`,
        kind: `Class`,
        name: `TInterface`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `name`,
            type: `string`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/interfaces.spec.ts`,
        kind: `Class`,
        name: `AnimalOwner`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `animal`,
            type: `AnimalSpec`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/tuple.spec.ts`,
        kind: `Class`,
        name: `TupleClassSpec`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `name`,
            type: `string`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/tuple.spec.ts`,
        kind: `Class`,
        name: `CatTupleSpec`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `name`,
            type: `string`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/tuple.spec.ts`,
        kind: `Class`,
        name: `PersonCatTupleSpec`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `age`,
            type: `number`
        },
        {
            initializer: undefined,
            isRequired: true,
            name: `cat`,
            type: `CatTupleSpec`
        },
        {
            initializer: undefined,
            isRequired: true,
            name: `firstName`,
            type: `string`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/types.spec.ts`,
        kind: `Class`,
        name: `CompanyAloneClassSpec`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `name`,
            type: `string`
        },
        {
            initializer: undefined,
            isRequired: true,
            name: `employees`,
            type: `number`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/types.spec.ts`,
        kind: `Class`,
        name: `ClassStringSpec`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `str`,
            type: `string`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/types.spec.ts`,
        kind: `Class`,
        name: `NgoClassSpec`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `name`,
            type: `string`
        },
        {
            initializer: undefined,
            isRequired: true,
            name: `volunteers`,
            type: `number`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/types.spec.ts`,
        kind: `Class`,
        name: `CompanyClassSpec`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `name`,
            type: `string`
        },
        {
            initializer: undefined,
            isRequired: true,
            name: `employees`,
            type: `number`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/types.spec.ts`,
        kind: `Class`,
        name: `PersonSpec`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `employer`,
            type: `EmployerTypeSpec`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/warnings.spec.ts`,
        kind: `Class`,
        name: `WarningSpec`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `name`,
            type: `NonReadableType<any>`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/enums/colors.enum.ts`,
        kind: `Enum`,
        name: `Color`,
        typeParameters: [
        ],
        initializers: [
            `White`,
            `Black`,
            `Red`,
        ]
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/enums/mood.enum.ts`,
        kind: `Enum`,
        name: `Mood`,
        typeParameters: [
        ],
        initializers: [
            `angry`,
            `happy`,
            `sad`,
        ]
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/enums.spec.ts`,
        kind: `Enum`,
        name: `ColorSpec`,
        typeParameters: [
        ],
        initializers: [
            `White`,
            `Black`,
            `Red`,
        ]
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/interfaces/prey.interface.ts`,
        kind: `Interface`,
        name: `Prey`,
        typeParameters: [
        ],
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `animal`,
            type: `Animal`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `Interface`,
        name: `IDefaultsSpec`,
        typeParameters: [
        ],
        properties: [
        {
            initializer: undefined,
            isRequired: false,
            name: `name`,
            type: `string`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/interfaces.spec.ts`,
        kind: `Interface`,
        name: `AnimalSpec`,
        typeParameters: [
        ],
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `name`,
            type: `string`
        },
        {
            initializer: undefined,
            isRequired: false,
            name: `otherName`,
            type: `string`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/tuple.spec.ts`,
        kind: `Interface`,
        name: `TupleInterfaceSpec`,
        typeParameters: [
        ],
        properties: [
        {
            initializer: undefined,
            isRequired: true,
            name: `name`,
            type: `string`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/check-targets.spec.ts`,
        kind: `TypeAlias`,
        name: `CheckTypeSpec`,
        typeParameters: [
        ],
        type: `string | number`,
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `TypeAlias`,
        name: `StringsOrStringSpec`,
        typeParameters: [
        ],
        type: `string[] | string`,
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `TypeAlias`,
        name: `StringOrStringsSpec`,
        typeParameters: [
        ],
        type: `string | string[]`,
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `TypeAlias`,
        name: `NumbersOrNumberSpec`,
        typeParameters: [
        ],
        type: `number[] | number`,
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `TypeAlias`,
        name: `NumberOrNumbersSpec`,
        typeParameters: [
        ],
        type: `number | number[]`,
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `TypeAlias`,
        name: `LevelSpec`,
        typeParameters: [
        ],
        type: `1 | 2 | 3`,
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `TypeAlias`,
        name: `UnionTypeClassAndStringSpec`,
        typeParameters: [
        ],
        type: `CatSpec | string`,
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `TypeAlias`,
        name: `EmployerSpec`,
        typeParameters: [
        ],
        type: `NgoSpec | NgoSpec[] | CompanySpec`,
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/generics.spec.ts`,
        kind: `TypeAlias`,
        name: `TExtends`,
        typeParameters: [
        
],
        type: `T extends string ? string : boolean`,
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/tuple.spec.ts`,
        kind: `TypeAlias`,
        name: `TupleTypeSpec`,
        typeParameters: [
        ],
        type: `TupleClassSpec | TupleInterfaceSpec`,
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/tuple.spec.ts`,
        kind: `TypeAlias`,
        name: `TupleStringTupleStringStringSpec`,
        typeParameters: [
        ],
        type: `['string', ['string', 'string']]`,
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/tuple.spec.ts`,
        kind: `TypeAlias`,
        name: `TupleStringTupleStringNumberSpec`,
        typeParameters: [
        ],
        type: `['string', ['string', 'number']]`,
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/types.spec.ts`,
        kind: `TypeAlias`,
        name: `StringAloneSpec`,
        typeParameters: [
        ],
        type: `string`,
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/types.spec.ts`,
        kind: `TypeAlias`,
        name: `ColorsTypeSpec`,
        typeParameters: [
        ],
        type: `'Blue' | 'White'`,
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/types.spec.ts`,
        kind: `TypeAlias`,
        name: `ParentTypeSpec`,
        typeParameters: [
        ],
        type: `string`,
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/types.spec.ts`,
        kind: `TypeAlias`,
        name: `ChildTypeSpec`,
        typeParameters: [
        ],
        type: `ParentTypeSpec`,
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/types.spec.ts`,
        kind: `TypeAlias`,
        name: `Parent1TypeSpec`,
        typeParameters: [
        ],
        type: `string`,
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/types.spec.ts`,
        kind: `TypeAlias`,
        name: `Parent2TypeSpec`,
        typeParameters: [
        ],
        type: `number`,
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/types.spec.ts`,
        kind: `TypeAlias`,
        name: `ChildParentsTypeSpec`,
        typeParameters: [
        ],
        type: `Parent1TypeSpec | Parent2TypeSpec`,
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/types.spec.ts`,
        kind: `TypeAlias`,
        name: `ParentNumberOrBooleanSpec`,
        typeParameters: [
        ],
        type: `number | boolean`,
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/types.spec.ts`,
        kind: `TypeAlias`,
        name: `ChildParentNumberOrBooleanAndStringSpec`,
        typeParameters: [
        ],
        type: `ParentNumberOrBooleanSpec | string`,
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/types.spec.ts`,
        kind: `TypeAlias`,
        name: `CompanyAloneSpec`,
        typeParameters: [
        ],
        type: `CompanyAloneClassSpec`,
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/types.spec.ts`,
        kind: `TypeAlias`,
        name: `UnionTypeNumberLiteralSpec`,
        typeParameters: [
        ],
        type: `0 | 1 | 2`,
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/types.spec.ts`,
        kind: `TypeAlias`,
        name: `UnionTypeSpec`,
        typeParameters: [
        ],
        type: `string | number`,
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/types.spec.ts`,
        kind: `TypeAlias`,
        name: `UnionTypeStringOrStringsSpec`,
        typeParameters: [
        ],
        type: `string | string[]`,
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/types.spec.ts`,
        kind: `TypeAlias`,
        name: `UnionClassStringOrNumberSpec`,
        typeParameters: [
        ],
        type: `ClassStringSpec | number`,
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/types.spec.ts`,
        kind: `TypeAlias`,
        name: `EmployerTypeSpec`,
        typeParameters: [
        ],
        type: `NgoClassSpec | NgoClassSpec[] | CompanyClassSpec`,
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/warnings.spec.ts`,
        kind: `TypeAlias`,
        name: `NonReadableType`,
        typeParameters: [
        
],
        type: `T extends string ? number : boolean`,
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/types/employer.type.ts`,
        kind: `TypeAlias`,
        name: `Employer`,
        typeParameters: [
        ],
        type: `Ngo | Ngo[] | Company`,
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/types/order.type.ts`,
        kind: `TypeAlias`,
        name: `Order`,
        typeParameters: [
        ],
        type: `'vertebrate' | 'invertebrate'`,
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/types/race.type.ts`,
        kind: `TypeAlias`,
        name: `Race`,
        typeParameters: [
        ],
        type: `'European' | 'Siamese' | 'British short hair'`,
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/types/string-or-strings.type.ts`,
        kind: `TypeAlias`,
        name: `StringOrStrings`,
        typeParameters: [
        ],
        type: `string | string[]`,
    },
];
exports.declarationInfos = declarationInfos;
