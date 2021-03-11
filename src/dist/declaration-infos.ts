import { DeclarationInfo } from '../models/declarations/declaration-info.model';

export const DECLARATION_INFOS = [
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/init/check-targets.service.ts`,
        kind: `Class`,
        name: `CheckTargetsService`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/init/declaration-info-generator.service.ts`,
        kind: `Class`,
        name: `DeclarationInfoGeneratorService`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/init/declaration-info.service.ts`,
        kind: `Class`,
        name: `DeclarationInfoService`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/init/init-config.service.ts`,
        kind: `Class`,
        name: `InitConfigService`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/init/init.model.ts`,
        kind: `Class`,
        name: `Init`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `false`,
            isRequired: true,
            name: `debug`,
            type: `undefined`
        },
        {
            initializer: `[]`,
            isRequired: true,
            name: `declarationInfos`,
            type: `DeclarationInfo[]`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `declarationInfoSourceFile`,
            type: `SourceFile`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `generateInstance`,
            type: `<T>(instanceGenerator: InstanceGenerator<T>) => Promise<T>`
        },
        {
            initializer: `[]`,
            isRequired: true,
            name: `instanceGenerators`,
            type: `InstanceGenerator<any>[]`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `instanceGeneratorSourceFile`,
            type: `SourceFile`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `nodeModulePath`,
            type: `string`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `project`,
            type: `Project`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `projectPath`,
            type: `string`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `_projectWithNodeModules`,
            type: `Project`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `start`,
            type: `number`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/init/init.service.ts`,
        kind: `Class`,
        name: `InitService`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/init/instance-generator.service.ts`,
        kind: `Class`,
        name: `InstanceGeneratorService`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/models/config.model.ts`,
        kind: `Class`,
        name: `Config`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `new CreateOptions()`,
            isRequired: false,
            name: `create`,
            type: `CreateOptions`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/models/create-options.model.ts`,
        kind: `Class`,
        name: `CreateOptions`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `true`,
            isRequired: false,
            name: `differentiateStringsAndNumbers`,
            type: `undefined`
        },
        {
            initializer: `false`,
            isRequired: false,
            name: `isArray`,
            type: `undefined`
        },
        {
            initializer: `new ThrowTargetError()`,
            isRequired: false,
            name: `throwTarget`,
            type: `ThrowTargetError`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/models/date-declaration.model.ts`,
        kind: `Class`,
        name: `DateDeclaration`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `() => 'DateDeclaration'`,
            isRequired: true,
            name: `getName`,
            type: `undefined`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/models/global.model.ts`,
        kind: `Class`,
        name: `Global`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `[]`,
            isRequired: true,
            name: `checkedTargets`,
            type: `string[]`
        },
        {
            initializer: `false`,
            isRequired: true,
            name: `debug`,
            type: `undefined`
        },
        {
            initializer: `[]`,
            isRequired: true,
            name: `declarationInfos`,
            type: `DeclarationInfo[]`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `generateInstance`,
            type: `<T>(instanceGenerator: InstanceGenerator<T>) => Promise<T>`
        },
        {
            initializer: `[]`,
            isRequired: true,
            name: `instanceGenerators`,
            type: `InstanceGenerator<any>[]`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `nodeModulePath`,
            type: `string`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `project`,
            type: `Project`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `projectPath`,
            type: `string`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `_projectWithNodeModules`,
            type: `Project`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `start`,
            type: `number`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/models/instance-generator.model.ts`,
        kind: `Class`,
        name: `InstanceGenerator`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 3,
        properties: [
        {
            initializer: `undefined`,
            isRequired: true,
            name: `numberOfConstructorArguments`,
            type: `number`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `typeDeclarationPath`,
            type: `string`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `typeName`,
            type: `string`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/models/mapper.ts`,
        kind: `Class`,
        name: `Mapper`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/models/throw-target-error.model.ts`,
        kind: `Class`,
        name: `ThrowTargetError`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `false`,
            isRequired: false,
            name: `error`,
            type: `undefined`
        },
        {
            initializer: `false`,
            isRequired: false,
            name: `setToUndefined`,
            type: `undefined`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/services/main.service.ts`,
        kind: `Class`,
        name: `MainService`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/services/options.service.ts`,
        kind: `Class`,
        name: `OptionsService`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/test-engine/test-it.model.ts`,
        kind: `Class`,
        name: `TestIt`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 5,
        properties: [
        {
            initializer: `undefined`,
            isRequired: true,
            name: `data`,
            type: `any`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `expected`,
            type: `any`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `title`,
            type: `string`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `method`,
            type: `Function`
        },
        {
            initializer: `undefined`,
            isRequired: false,
            name: `options`,
            type: `TestMapperOptions`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/test-engine/test-mapper.model.ts`,
        kind: `Class`,
        name: `TestMapper`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 4,
        properties: [
        {
            initializer: `undefined`,
            isRequired: true,
            name: `title`,
            type: `string`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `mapParameter`,
            type: `Target<any>`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `data`,
            type: `any`
        },
        {
            initializer: `undefined`,
            isRequired: false,
            name: `options`,
            type: `TestMapperOptions`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/models/declarations/class-info.model.ts`,
        kind: `Class`,
        name: `ClassInfo`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 5,
        properties: [
        {
            initializer: `undefined`,
            isRequired: true,
            name: `hasPrivateConstructor`,
            type: `boolean`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `indexableType`,
            type: `IndexableType`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `isAbstract`,
            type: `boolean`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `numberOfConstructorArguments`,
            type: `number`
        },
        {
            initializer: `[]`,
            isRequired: true,
            name: `properties`,
            type: `Property[]`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/models/declarations/declaration-info.model.ts`,
        kind: `Class`,
        name: `DeclarationInfo`,
        typeParameters: [
        ],
        hasPrivateConstructor: true,
        indexableType: `undefined`,
        isAbstract: true,
        numberOfConstructorArguments: 4,
        properties: [
        {
            initializer: `undefined`,
            isRequired: true,
            name: `filePath`,
            type: `string`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `kind`,
            type: `TypeDeclarationKind`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `name`,
            type: `string`
        },
        {
            initializer: `[]`,
            isRequired: true,
            name: `typeParameters`,
            type: `any[]`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/models/declarations/enum-info.model.ts`,
        kind: `Class`,
        name: `EnumInfo`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 3,
        properties: [
        {
            initializer: `[]`,
            isRequired: true,
            name: `initializers`,
            type: `any[]`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/models/declarations/interface-info.model.ts`,
        kind: `Class`,
        name: `InterfaceInfo`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 4,
        properties: [
        {
            initializer: `undefined`,
            isRequired: true,
            name: `indexableType`,
            type: `IndexableType`
        },
        {
            initializer: `[]`,
            isRequired: true,
            name: `properties`,
            type: `Property[]`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/models/declarations/type-info.model.ts`,
        kind: `Class`,
        name: `TypeInfo`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 3,
        properties: [
        {
            initializer: `undefined`,
            isRequired: true,
            name: `type`,
            type: `string`
        },
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/services/map/map-array.service.ts`,
        kind: `Class`,
        name: `MapArrayService`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/services/map/map-class.service.ts`,
        kind: `Class`,
        name: `MapClassService`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/services/map/map-complex.service.ts`,
        kind: `Class`,
        name: `MapComplexService`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/services/map/map-date.service.ts`,
        kind: `Class`,
        name: `MapDateService`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/services/map/map-declaration.service.ts`,
        kind: `Class`,
        name: `MapDeclarationService`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/services/map/map-enum.service.ts`,
        kind: `Class`,
        name: `MapEnumService`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/services/map/map-generic.service.ts`,
        kind: `Class`,
        name: `MapGenericService`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/services/map/map-instance-or-interface.service.ts`,
        kind: `Class`,
        name: `MapInstanceOrInterfaceService`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/services/map/map-interface.service.ts`,
        kind: `Class`,
        name: `MapInterfaceService`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/services/map/map-literal-object.service.ts`,
        kind: `Class`,
        name: `MapLiteralObjectService`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/services/map/map-null-or-literal.service.ts`,
        kind: `Class`,
        name: `MapNullOrLiteralService`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/services/map/map-object.service.ts`,
        kind: `Class`,
        name: `MapObjectService`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/services/map/map-out-of-project.service.ts`,
        kind: `Class`,
        name: `MapOutOfProjectService`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/services/map/map-primitive.service.ts`,
        kind: `Class`,
        name: `MapPrimitiveService`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/services/map/map-quoted.service.ts`,
        kind: `Class`,
        name: `MapQuotedService`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/services/map/map-tuple.service.ts`,
        kind: `Class`,
        name: `MapTupleService`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/services/map/map-type.service.ts`,
        kind: `Class`,
        name: `MapTypeService`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/services/targets/target.service.ts`,
        kind: `Class`,
        name: `TargetService`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/models/address.model.ts`,
        kind: `Class`,
        name: `Address`,
        typeParameters: [
        ],
        hasPrivateConstructor: false,
        indexableType: `undefined`,
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
        indexableType: `undefined`,
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
            type: `undefined`
        },
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
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
            type: `undefined`
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
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
            isRequired: true,
            name: `name`,
            type: `string`
        },
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
            isRequired: true,
            name: `name`,
            type: `string`
        },
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: true,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
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
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
            isRequired: true,
            name: `str`,
            type: `string`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `num`,
            type: `number`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `bool`,
            type: `boolean`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `strs`,
            type: `string[]`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `nums`,
            type: `number[]`
        },
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
            isRequired: true,
            name: `a`,
            type: `any`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `b`,
            type: `any[]`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `c`,
            type: `undefined`
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
        indexableType: `[object Object]`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
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
        indexableType: `[object Object]`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `'aaa'`,
            isRequired: true,
            name: `a`,
            type: `undefined`
        },
        {
            initializer: `2`,
            isRequired: true,
            name: `b`,
            type: `undefined`
        },
        {
            initializer: `false`,
            isRequired: true,
            name: `c`,
            type: `undefined`
        },
        {
            initializer: `true`,
            isRequired: true,
            name: `d`,
            type: `undefined`
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 4,
        properties: [
        {
            initializer: `undefined`,
            isRequired: true,
            name: `a`,
            type: `undefined`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `b`,
            type: `undefined`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `c`,
            type: `undefined`
        },
        {
            initializer: `undefined`,
            isRequired: true,
            name: `d`,
            type: `undefined`
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
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
            name: `cat`,
            type: `CatSpec`
        },
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 1,
        properties: [
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 2,
        properties: [
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: true,
        numberOfConstructorArguments: 1,
        properties: [
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 2,
        properties: [
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
            isRequired: true,
            name: `name`,
            type: `string`
        },
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
            isRequired: true,
            name: `name`,
            type: `string`
        },
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
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
            name: `cat`,
            type: `CatTupleSpec`
        },
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
            isRequired: true,
            name: `name`,
            type: `string`
        },
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
            isRequired: true,
            name: `name`,
            type: `string`
        },
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
            isRequired: true,
            name: `name`,
            type: `string`
        },
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
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
        indexableType: `undefined`,
        isAbstract: false,
        numberOfConstructorArguments: 0,
        properties: [
        {
            initializer: `undefined`,
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
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/enums/mood.enum.ts`,
        kind: `Enum`,
        name: `Mood`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/enums.spec.ts`,
        kind: `Enum`,
        name: `ColorSpec`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/test-engine/test-mapper-options.interface.ts`,
        kind: `Interface`,
        name: `TestMapperOptions`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/date-constructor-parameters.type.ts`,
        kind: `Interface`,
        name: `YearMonth`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/interfaces/prey.interface.ts`,
        kind: `Interface`,
        name: `Prey`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `Interface`,
        name: `IDefaultsSpec`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/interfaces.spec.ts`,
        kind: `Interface`,
        name: `AnimalSpec`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/tuple.spec.ts`,
        kind: `Interface`,
        name: `TupleInterfaceSpec`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/test-engine/test-type.type.ts`,
        kind: `TypeAlias`,
        name: `TestType`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/class-or-interface-declaration.type.ts`,
        kind: `TypeAlias`,
        name: `ClassOrInterfaceDeclaration`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/class-or-interface-info.type.ts`,
        kind: `TypeAlias`,
        name: `ClassOrInterfaceInfo`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/date-constructor-parameters.type.ts`,
        kind: `TypeAlias`,
        name: `DateConstructorParameters`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/indexable-type.type.ts`,
        kind: `TypeAlias`,
        name: `IndexableType`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/literal-node.type.ts`,
        kind: `TypeAlias`,
        name: `LiteralNode`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/not-some-type.type.ts`,
        kind: `TypeAlias`,
        name: `NotString`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/not-some-type.type.ts`,
        kind: `TypeAlias`,
        name: `NotNumber`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/not-some-type.type.ts`,
        kind: `TypeAlias`,
        name: `NotBoolean`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/not-some-type.type.ts`,
        kind: `TypeAlias`,
        name: `NotObject`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/not-some-type.type.ts`,
        kind: `TypeAlias`,
        name: `NotDate`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/not-some-type.type.ts`,
        kind: `TypeAlias`,
        name: `ObjectNotArray`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/not-some-type.type.ts`,
        kind: `TypeAlias`,
        name: `NotArray`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/not-some-type.type.ts`,
        kind: `TypeAlias`,
        name: `NotInstance`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/null-or-literal.type.ts`,
        kind: `TypeAlias`,
        name: `NullOrLiteral`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/primitives.type.ts`,
        kind: `TypeAlias`,
        name: `Primitive`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/primitives.type.ts`,
        kind: `TypeAlias`,
        name: `ArrayOfPrimitiveElements`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/primitives.type.ts`,
        kind: `TypeAlias`,
        name: `PrimitiveType`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/primitives.type.ts`,
        kind: `TypeAlias`,
        name: `PrimitiveConstructor`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/property-declaration-or-signature.type.ts`,
        kind: `TypeAlias`,
        name: `PropertyDeclarationOrSignature`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/string-or-number.type.ts`,
        kind: `TypeAlias`,
        name: `StringOrNumber`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/t-constructor.type.ts`,
        kind: `TypeAlias`,
        name: `TConstructor`,
        typeParameters: [
        
],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/type-declaration-kind.type.ts`,
        kind: `TypeAlias`,
        name: `TypeDeclarationKind`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/type-declaration.type.ts`,
        kind: `TypeAlias`,
        name: `Declaration`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/type-declaration.type.ts`,
        kind: `TypeAlias`,
        name: `GenericableDeclaration`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/type-declaration.type.ts`,
        kind: `TypeAlias`,
        name: `DeclarationOrDate`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/services/map/resolve-generics.ts`,
        kind: `TypeAlias`,
        name: `FooType`,
        typeParameters: [
        
],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/services/map/resolve-generics.ts`,
        kind: `TypeAlias`,
        name: `Ternary`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/services/map/resolve-generics.ts`,
        kind: `TypeAlias`,
        name: `BarTypeParent`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/services/map/resolve-generics.ts`,
        kind: `TypeAlias`,
        name: `BarType`,
        typeParameters: [
        
],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/target/constructor-array.type.ts`,
        kind: `TypeAlias`,
        name: `ConstructorArray`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/target/generic-parameter.type.ts`,
        kind: `TypeAlias`,
        name: `GenericParameter`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/target/property.type.ts`,
        kind: `TypeAlias`,
        name: `Property`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/target/target.type.ts`,
        kind: `TypeAlias`,
        name: `Target`,
        typeParameters: [
        
],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/target/string/array-type.type.ts`,
        kind: `TypeAlias`,
        name: `ArrayType`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/target/string/array-type.type.ts`,
        kind: `TypeAlias`,
        name: `EndsWithEmptyBrackets`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/target/string/borders.type.ts`,
        kind: `TypeAlias`,
        name: `LeftBorder`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/target/string/borders.type.ts`,
        kind: `TypeAlias`,
        name: `RightBorder`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/target/string/borders.type.ts`,
        kind: `TypeAlias`,
        name: `HasLeftBorder`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/target/string/borders.type.ts`,
        kind: `TypeAlias`,
        name: `HasRightBorder`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/target/string/bracketed-or-penthesized.type.ts`,
        kind: `TypeAlias`,
        name: `BracketedOrParenthesized`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/target/string/bracketed.type.ts`,
        kind: `TypeAlias`,
        name: `Bracketed`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/target/string/combination.type.ts`,
        kind: `TypeAlias`,
        name: `Combination`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/target/string/commas.type.ts`,
        kind: `TypeAlias`,
        name: `Commas`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/target/string/containerized.type.ts`,
        kind: `TypeAlias`,
        name: `Containerized`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/target/string/curve-bracketed.type.ts`,
        kind: `TypeAlias`,
        name: `CurveBracketed`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/target/string/element-and-separator.type.ts`,
        kind: `TypeAlias`,
        name: `ElementAndSeparator`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/target/string/extends.type.ts`,
        kind: `TypeAlias`,
        name: `Extends`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/target/string/generics.type.ts`,
        kind: `TypeAlias`,
        name: `Generic`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/target/string/generics.type.ts`,
        kind: `TypeAlias`,
        name: `EndsWithTag`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/target/string/has-separators.type.ts`,
        kind: `TypeAlias`,
        name: `HasSeparators`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/target/string/interrogation.type.ts`,
        kind: `TypeAlias`,
        name: `Interrogation`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/target/string/intersection.type.ts`,
        kind: `TypeAlias`,
        name: `Intersection`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/target/string/parenthesis.type.ts`,
        kind: `TypeAlias`,
        name: `Parenthesized`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/target/string/quoted.type.ts`,
        kind: `TypeAlias`,
        name: `Quoted`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/target/string/semi-column.type.ts`,
        kind: `TypeAlias`,
        name: `SemiColumn`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/target/string/separator.type.ts`,
        kind: `TypeAlias`,
        name: `Separator`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/target/string/starting-container.type.ts`,
        kind: `TypeAlias`,
        name: `StartingContainer`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/target/string/tagged.type.ts`,
        kind: `TypeAlias`,
        name: `Tagged`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/types/target/string/union.type.ts`,
        kind: `TypeAlias`,
        name: `Union`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/check-targets.spec.ts`,
        kind: `TypeAlias`,
        name: `CheckTypeSpec`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `TypeAlias`,
        name: `StringsOrStringSpec`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `TypeAlias`,
        name: `StringOrStringsSpec`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `TypeAlias`,
        name: `NumbersOrNumberSpec`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `TypeAlias`,
        name: `NumberOrNumbersSpec`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `TypeAlias`,
        name: `LevelSpec`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `TypeAlias`,
        name: `UnionTypeClassAndStringSpec`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts`,
        kind: `TypeAlias`,
        name: `EmployerSpec`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/generics.spec.ts`,
        kind: `TypeAlias`,
        name: `TExtends`,
        typeParameters: [
        
],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/tuple.spec.ts`,
        kind: `TypeAlias`,
        name: `TupleTypeSpec`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/tuple.spec.ts`,
        kind: `TypeAlias`,
        name: `TupleStringTupleStringStringSpec`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/tuple.spec.ts`,
        kind: `TypeAlias`,
        name: `TupleStringTupleStringNumberSpec`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/types.spec.ts`,
        kind: `TypeAlias`,
        name: `StringAloneSpec`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/types.spec.ts`,
        kind: `TypeAlias`,
        name: `ColorsTypeSpec`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/types.spec.ts`,
        kind: `TypeAlias`,
        name: `ParentTypeSpec`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/types.spec.ts`,
        kind: `TypeAlias`,
        name: `ChildTypeSpec`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/types.spec.ts`,
        kind: `TypeAlias`,
        name: `Parent1TypeSpec`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/types.spec.ts`,
        kind: `TypeAlias`,
        name: `Parent2TypeSpec`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/types.spec.ts`,
        kind: `TypeAlias`,
        name: `ChildParentsTypeSpec`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/types.spec.ts`,
        kind: `TypeAlias`,
        name: `ParentNumberOrBooleanSpec`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/types.spec.ts`,
        kind: `TypeAlias`,
        name: `ChildParentNumberOrBooleanAndStringSpec`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/types.spec.ts`,
        kind: `TypeAlias`,
        name: `CompanyAloneSpec`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/types.spec.ts`,
        kind: `TypeAlias`,
        name: `UnionTypeNumberLiteralSpec`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/types.spec.ts`,
        kind: `TypeAlias`,
        name: `UnionTypeSpec`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/types.spec.ts`,
        kind: `TypeAlias`,
        name: `UnionTypeStringOrStringsSpec`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/types.spec.ts`,
        kind: `TypeAlias`,
        name: `UnionClassStringOrNumberSpec`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/types.spec.ts`,
        kind: `TypeAlias`,
        name: `EmployerTypeSpec`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/warnings.spec.ts`,
        kind: `TypeAlias`,
        name: `NonReadableType`,
        typeParameters: [
        
],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/types/employer.type.ts`,
        kind: `TypeAlias`,
        name: `Employer`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/types/order.type.ts`,
        kind: `TypeAlias`,
        name: `Order`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/types/race.type.ts`,
        kind: `TypeAlias`,
        name: `Race`,
        typeParameters: [
        ],
    },
    {
        filePath: `/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/types/string-or-strings.type.ts`,
        kind: `TypeAlias`,
        name: `StringOrStrings`,
        typeParameters: [
        ],
    },
] as DeclarationInfo[];
