const generateInstance = async function(instanceGenerator) {
    try {
        let instance;
        switch (instanceGenerator.id) {
            case 'CheckTargetsService_/users/utilisateur/documents/projets/genese/genesemapper/src/init/check-targets.service.ts':
                const CheckTargetsService = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/init/check-targets.service.ts').CheckTargetsService;
                instance = new CheckTargetsService();
                break;
            case 'DeclarationInfoGeneratorService_/users/utilisateur/documents/projets/genese/genesemapper/src/init/declaration-info-generator.service.ts':
                const DeclarationInfoGeneratorService = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/init/declaration-info-generator.service.ts').DeclarationInfoGeneratorService;
                instance = new DeclarationInfoGeneratorService();
                break;
            case 'DeclarationInfoService_/users/utilisateur/documents/projets/genese/genesemapper/src/init/declaration-info.service.ts':
                const DeclarationInfoService = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/init/declaration-info.service.ts').DeclarationInfoService;
                instance = new DeclarationInfoService();
                break;
            case 'InitConfigService_/users/utilisateur/documents/projets/genese/genesemapper/src/init/init-config.service.ts':
                const InitConfigService = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/init/init-config.service.ts').InitConfigService;
                instance = new InitConfigService();
                break;
            case 'Init_/users/utilisateur/documents/projets/genese/genesemapper/src/init/init.model.ts':
                const Init = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/init/init.model.ts').Init;
                instance = new Init();
                break;
            case 'InitService_/users/utilisateur/documents/projets/genese/genesemapper/src/init/init.service.ts':
                const InitService = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/init/init.service.ts').InitService;
                instance = new InitService();
                break;
            case 'InstanceGeneratorService_/users/utilisateur/documents/projets/genese/genesemapper/src/init/instance-generator.service.ts':
                const InstanceGeneratorService = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/init/instance-generator.service.ts').InstanceGeneratorService;
                instance = new InstanceGeneratorService();
                break;
            case 'Config_/users/utilisateur/documents/projets/genese/genesemapper/src/models/config.model.ts':
                const Config = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/models/config.model.ts').Config;
                instance = new Config();
                break;
            case 'CreateOptions_/users/utilisateur/documents/projets/genese/genesemapper/src/models/create-options.model.ts':
                const CreateOptions = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/models/create-options.model.ts').CreateOptions;
                instance = new CreateOptions();
                break;
            case 'DateDeclaration_/users/utilisateur/documents/projets/genese/genesemapper/src/models/date-declaration.model.ts':
                const DateDeclaration = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/models/date-declaration.model.ts').DateDeclaration;
                instance = new DateDeclaration();
                break;
            case 'Global_/users/utilisateur/documents/projets/genese/genesemapper/src/models/global.model.ts':
                const Global = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/models/global.model.ts').Global;
                instance = new Global();
                break;
            case 'InstanceGenerator_/users/utilisateur/documents/projets/genese/genesemapper/src/models/instance-generator.model.ts':
                const InstanceGenerator = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/models/instance-generator.model.ts').InstanceGenerator;
                instance = new InstanceGenerator(undefined, undefined, undefined);
                break;
            case 'Mapper_/users/utilisateur/documents/projets/genese/genesemapper/src/models/mapper.ts':
                const Mapper = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/models/mapper.ts').Mapper;
                instance = new Mapper();
                break;
            case 'ThrowTargetError_/users/utilisateur/documents/projets/genese/genesemapper/src/models/throw-target-error.model.ts':
                const ThrowTargetError = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/models/throw-target-error.model.ts').ThrowTargetError;
                instance = new ThrowTargetError();
                break;
            case 'MainService_/users/utilisateur/documents/projets/genese/genesemapper/src/services/main.service.ts':
                const MainService = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/services/main.service.ts').MainService;
                instance = new MainService();
                break;
            case 'OptionsService_/users/utilisateur/documents/projets/genese/genesemapper/src/services/options.service.ts':
                const OptionsService = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/services/options.service.ts').OptionsService;
                instance = new OptionsService();
                break;
            case 'TestIt_/users/utilisateur/documents/projets/genese/genesemapper/src/test-engine/test-it.model.ts':
                const TestIt = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/test-engine/test-it.model.ts').TestIt;
                instance = new TestIt(undefined, undefined, undefined, undefined, undefined);
                break;
            case 'TestMapper_/users/utilisateur/documents/projets/genese/genesemapper/src/test-engine/test-mapper.model.ts':
                const TestMapper = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/test-engine/test-mapper.model.ts').TestMapper;
                instance = new TestMapper(undefined, undefined, undefined, undefined);
                break;
            case 'ClassInfo_/users/utilisateur/documents/projets/genese/genesemapper/src/models/declarations/class-info.model.ts':
                const ClassInfo = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/models/declarations/class-info.model.ts').ClassInfo;
                instance = new ClassInfo(undefined, undefined, undefined, undefined, undefined);
                break;
            case 'EnumInfo_/users/utilisateur/documents/projets/genese/genesemapper/src/models/declarations/enum-info.model.ts':
                const EnumInfo = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/models/declarations/enum-info.model.ts').EnumInfo;
                instance = new EnumInfo(undefined, undefined, undefined);
                break;
            case 'InterfaceInfo_/users/utilisateur/documents/projets/genese/genesemapper/src/models/declarations/interface-info.model.ts':
                const InterfaceInfo = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/models/declarations/interface-info.model.ts').InterfaceInfo;
                instance = new InterfaceInfo(undefined, undefined, undefined, undefined);
                break;
            case 'TypeInfo_/users/utilisateur/documents/projets/genese/genesemapper/src/models/declarations/type-info.model.ts':
                const TypeInfo = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/models/declarations/type-info.model.ts').TypeInfo;
                instance = new TypeInfo(undefined, undefined, undefined);
                break;
            case 'MapArrayService_/users/utilisateur/documents/projets/genese/genesemapper/src/services/map/map-array.service.ts':
                const MapArrayService = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/services/map/map-array.service.ts').MapArrayService;
                instance = new MapArrayService();
                break;
            case 'MapClassService_/users/utilisateur/documents/projets/genese/genesemapper/src/services/map/map-class.service.ts':
                const MapClassService = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/services/map/map-class.service.ts').MapClassService;
                instance = new MapClassService();
                break;
            case 'MapComplexService_/users/utilisateur/documents/projets/genese/genesemapper/src/services/map/map-complex.service.ts':
                const MapComplexService = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/services/map/map-complex.service.ts').MapComplexService;
                instance = new MapComplexService();
                break;
            case 'MapDateService_/users/utilisateur/documents/projets/genese/genesemapper/src/services/map/map-date.service.ts':
                const MapDateService = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/services/map/map-date.service.ts').MapDateService;
                instance = new MapDateService();
                break;
            case 'MapDeclarationService_/users/utilisateur/documents/projets/genese/genesemapper/src/services/map/map-declaration.service.ts':
                const MapDeclarationService = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/services/map/map-declaration.service.ts').MapDeclarationService;
                instance = new MapDeclarationService();
                break;
            case 'MapEnumService_/users/utilisateur/documents/projets/genese/genesemapper/src/services/map/map-enum.service.ts':
                const MapEnumService = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/services/map/map-enum.service.ts').MapEnumService;
                instance = new MapEnumService();
                break;
            case 'MapGenericService_/users/utilisateur/documents/projets/genese/genesemapper/src/services/map/map-generic.service.ts':
                const MapGenericService = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/services/map/map-generic.service.ts').MapGenericService;
                instance = new MapGenericService();
                break;
            case 'MapInstanceOrInterfaceService_/users/utilisateur/documents/projets/genese/genesemapper/src/services/map/map-instance-or-interface.service.ts':
                const MapInstanceOrInterfaceService = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/services/map/map-instance-or-interface.service.ts').MapInstanceOrInterfaceService;
                instance = new MapInstanceOrInterfaceService();
                break;
            case 'MapInterfaceService_/users/utilisateur/documents/projets/genese/genesemapper/src/services/map/map-interface.service.ts':
                const MapInterfaceService = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/services/map/map-interface.service.ts').MapInterfaceService;
                instance = new MapInterfaceService();
                break;
            case 'MapLiteralObjectService_/users/utilisateur/documents/projets/genese/genesemapper/src/services/map/map-literal-object.service.ts':
                const MapLiteralObjectService = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/services/map/map-literal-object.service.ts').MapLiteralObjectService;
                instance = new MapLiteralObjectService();
                break;
            case 'MapNullOrLiteralService_/users/utilisateur/documents/projets/genese/genesemapper/src/services/map/map-null-or-literal.service.ts':
                const MapNullOrLiteralService = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/services/map/map-null-or-literal.service.ts').MapNullOrLiteralService;
                instance = new MapNullOrLiteralService();
                break;
            case 'MapObjectService_/users/utilisateur/documents/projets/genese/genesemapper/src/services/map/map-object.service.ts':
                const MapObjectService = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/services/map/map-object.service.ts').MapObjectService;
                instance = new MapObjectService();
                break;
            case 'MapOutOfProjectService_/users/utilisateur/documents/projets/genese/genesemapper/src/services/map/map-out-of-project.service.ts':
                const MapOutOfProjectService = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/services/map/map-out-of-project.service.ts').MapOutOfProjectService;
                instance = new MapOutOfProjectService();
                break;
            case 'MapPrimitiveService_/users/utilisateur/documents/projets/genese/genesemapper/src/services/map/map-primitive.service.ts':
                const MapPrimitiveService = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/services/map/map-primitive.service.ts').MapPrimitiveService;
                instance = new MapPrimitiveService();
                break;
            case 'MapQuotedService_/users/utilisateur/documents/projets/genese/genesemapper/src/services/map/map-quoted.service.ts':
                const MapQuotedService = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/services/map/map-quoted.service.ts').MapQuotedService;
                instance = new MapQuotedService();
                break;
            case 'MapTupleService_/users/utilisateur/documents/projets/genese/genesemapper/src/services/map/map-tuple.service.ts':
                const MapTupleService = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/services/map/map-tuple.service.ts').MapTupleService;
                instance = new MapTupleService();
                break;
            case 'MapTypeService_/users/utilisateur/documents/projets/genese/genesemapper/src/services/map/map-type.service.ts':
                const MapTypeService = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/services/map/map-type.service.ts').MapTypeService;
                instance = new MapTypeService();
                break;
            case 'TargetService_/users/utilisateur/documents/projets/genese/genesemapper/src/services/targets/target.service.ts':
                const TargetService = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/services/targets/target.service.ts').TargetService;
                instance = new TargetService();
                break;
            case 'Address_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/models/address.model.ts':
                const Address = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/models/address.model.ts').Address;
                instance = new Address(undefined, undefined, undefined);
                break;
            case 'Animal_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/models/animal.model.ts':
                const Animal = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/models/animal.model.ts').Animal;
                instance = new Animal(undefined);
                break;
            case 'Cat_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/models/cat.model.ts':
                const Cat = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/models/cat.model.ts').Cat;
                instance = new Cat(undefined, undefined, undefined);
                break;
            case 'Company_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/models/company.model.ts':
                const Company = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/models/company.model.ts').Company;
                instance = new Company();
                break;
            case 'MainAppProcess_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/models/main-app-process.ts':
                const MainAppProcess = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/models/main-app-process.ts').MainAppProcess;
                instance = new MainAppProcess();
                break;
            case 'Ngo_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/models/ngo.model.ts':
                const Ngo = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/models/ngo.model.ts').Ngo;
                instance = new Ngo();
                break;
            case 'Person_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/models/person.model.ts':
                const Person = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/models/person.model.ts').Person;
                instance = new Person(undefined, undefined, undefined, undefined, undefined, undefined);
                break;
            case 'CheckClassSpec_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/check-targets.spec.ts':
                const CheckClassSpec = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/check-targets.spec.ts').CheckClassSpec;
                instance = new CheckClassSpec();
                break;
            case 'NotExportedCheckClassSpec_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/check-targets.spec.ts':
                const NotExportedCheckClassSpec = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/check-targets.spec.ts').NotExportedCheckClassSpec;
                instance = new NotExportedCheckClassSpec();
                break;
            case 'FooClass_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/check-typing.ts':
                const FooClass = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/check-typing.ts').FooClass;
                instance = new FooClass();
                break;
            case 'BarClass_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/check-typing.ts':
                const BarClass = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/check-typing.ts').BarClass;
                instance = new BarClass();
                break;
            case 'OnePrimitiveClassSpec_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts':
                const OnePrimitiveClassSpec = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts').OnePrimitiveClassSpec;
                instance = new OnePrimitiveClassSpec();
                break;
            case 'ClassWithPrimitivesSpec_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts':
                const ClassWithPrimitivesSpec = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts').ClassWithPrimitivesSpec;
                instance = new ClassWithPrimitivesSpec();
                break;
            case 'ClassWithAnySpec_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts':
                const ClassWithAnySpec = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts').ClassWithAnySpec;
                instance = new ClassWithAnySpec();
                break;
            case 'IndexableSpec_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts':
                const IndexableSpec = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts').IndexableSpec;
                instance = new IndexableSpec();
                break;
            case 'IndexableNumberSpec_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts':
                const IndexableNumberSpec = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts').IndexableNumberSpec;
                instance = new IndexableNumberSpec();
                break;
            case 'ValuesByDefault_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts':
                const ValuesByDefault = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts').ValuesByDefault;
                instance = new ValuesByDefault();
                break;
            case 'ValuesOnConstructor_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts':
                const ValuesOnConstructor = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts').ValuesOnConstructor;
                instance = new ValuesOnConstructor(undefined, undefined, undefined, undefined);
                break;
            case 'CatSpec_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts':
                const CatSpec = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts').CatSpec;
                instance = new CatSpec();
                break;
            case 'PersonCatSpec_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts':
                const PersonCatSpec = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts').PersonCatSpec;
                instance = new PersonCatSpec();
                break;
            case 'ParentClassSpec_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts':
                const ParentClassSpec = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts').ParentClassSpec;
                instance = new ParentClassSpec(undefined);
                break;
            case 'ChildClassSpec_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts':
                const ChildClassSpec = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts').ChildClassSpec;
                instance = new ChildClassSpec(undefined, undefined);
                break;
            case 'ChildAbstractClassSpec_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts':
                const ChildAbstractClassSpec = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts').ChildAbstractClassSpec;
                instance = new ChildAbstractClassSpec(undefined, undefined);
                break;
            case 'CDefaultsSpec_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts':
                const CDefaultsSpec = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts').CDefaultsSpec;
                instance = new CDefaultsSpec();
                break;
            case 'StringOrNumberClassSpec_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts':
                const StringOrNumberClassSpec = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts').StringOrNumberClassSpec;
                instance = new StringOrNumberClassSpec();
                break;
            case 'NullSpec_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts':
                const NullSpec = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts').NullSpec;
                instance = new NullSpec();
                break;
            case 'UndefinedSpec_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts':
                const UndefinedSpec = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts').UndefinedSpec;
                instance = new UndefinedSpec();
                break;
            case 'UnknownSpec_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts':
                const UnknownSpec = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts').UnknownSpec;
                instance = new UnknownSpec();
                break;
            case 'NumberLiteralSpec_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts':
                const NumberLiteralSpec = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts').NumberLiteralSpec;
                instance = new NumberLiteralSpec();
                break;
            case 'StringLiteralSpec_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts':
                const StringLiteralSpec = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts').StringLiteralSpec;
                instance = new StringLiteralSpec();
                break;
            case 'BooleanLiteralSpec_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts':
                const BooleanLiteralSpec = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts').BooleanLiteralSpec;
                instance = new BooleanLiteralSpec();
                break;
            case 'PaintStringsOrStringSpec_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts':
                const PaintStringsOrStringSpec = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts').PaintStringsOrStringSpec;
                instance = new PaintStringsOrStringSpec();
                break;
            case 'PaintStringOrStringsSpec_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts':
                const PaintStringOrStringsSpec = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts').PaintStringOrStringsSpec;
                instance = new PaintStringOrStringsSpec();
                break;
            case 'AgeNumbersOrNumberSpec_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts':
                const AgeNumbersOrNumberSpec = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts').AgeNumbersOrNumberSpec;
                instance = new AgeNumbersOrNumberSpec();
                break;
            case 'AgeNumberOrNumbersSpec_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts':
                const AgeNumberOrNumbersSpec = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts').AgeNumberOrNumbersSpec;
                instance = new AgeNumberOrNumbersSpec();
                break;
            case 'LevelClassSpec_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts':
                const LevelClassSpec = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts').LevelClassSpec;
                instance = new LevelClassSpec();
                break;
            case 'NameSpec_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts':
                const NameSpec = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts').NameSpec;
                instance = new NameSpec();
                break;
            case 'ClassWithUnionTypeSpec_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts':
                const ClassWithUnionTypeSpec = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts').ClassWithUnionTypeSpec;
                instance = new ClassWithUnionTypeSpec();
                break;
            case 'NgoSpec_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts':
                const NgoSpec = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts').NgoSpec;
                instance = new NgoSpec();
                break;
            case 'CompanySpec_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts':
                const CompanySpec = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts').CompanySpec;
                instance = new CompanySpec();
                break;
            case 'PersonSpec_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts':
                const PersonSpec = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts').PersonSpec;
                instance = new PersonSpec();
                break;
            case 'ObjectLiteralStringSpec_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts':
                const ObjectLiteralStringSpec = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts').ObjectLiteralStringSpec;
                instance = new ObjectLiteralStringSpec();
                break;
            case 'ObjectLiteralStringNumberSpec_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts':
                const ObjectLiteralStringNumberSpec = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/classes.spec.ts').ObjectLiteralStringNumberSpec;
                instance = new ObjectLiteralStringNumberSpec();
                break;
            case 'DateSpec_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/dates.spec.ts':
                const DateSpec = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/dates.spec.ts').DateSpec;
                instance = new DateSpec();
                break;
            case 'ColorClassSpec_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/enums.spec.ts':
                const ColorClassSpec = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/enums.spec.ts').ColorClassSpec;
                instance = new ColorClassSpec();
                break;
            case 'ColorsClassSpec_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/enums.spec.ts':
                const ColorsClassSpec = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/enums.spec.ts').ColorsClassSpec;
                instance = new ColorsClassSpec();
                break;
            case 'TClass_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/generics.spec.ts':
                const TClass = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/generics.spec.ts').TClass;
                instance = new TClass();
                break;
            case 'TInterface_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/generics.spec.ts':
                const TInterface = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/generics.spec.ts').TInterface;
                instance = new TInterface();
                break;
            case 'AnimalOwner_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/interfaces.spec.ts':
                const AnimalOwner = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/interfaces.spec.ts').AnimalOwner;
                instance = new AnimalOwner();
                break;
            case 'TupleClassSpec_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/tuple.spec.ts':
                const TupleClassSpec = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/tuple.spec.ts').TupleClassSpec;
                instance = new TupleClassSpec();
                break;
            case 'CatTupleSpec_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/tuple.spec.ts':
                const CatTupleSpec = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/tuple.spec.ts').CatTupleSpec;
                instance = new CatTupleSpec();
                break;
            case 'PersonCatTupleSpec_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/tuple.spec.ts':
                const PersonCatTupleSpec = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/tuple.spec.ts').PersonCatTupleSpec;
                instance = new PersonCatTupleSpec();
                break;
            case 'CompanyAloneClassSpec_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/types.spec.ts':
                const CompanyAloneClassSpec = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/types.spec.ts').CompanyAloneClassSpec;
                instance = new CompanyAloneClassSpec();
                break;
            case 'ClassStringSpec_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/types.spec.ts':
                const ClassStringSpec = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/types.spec.ts').ClassStringSpec;
                instance = new ClassStringSpec();
                break;
            case 'NgoClassSpec_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/types.spec.ts':
                const NgoClassSpec = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/types.spec.ts').NgoClassSpec;
                instance = new NgoClassSpec();
                break;
            case 'CompanyClassSpec_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/types.spec.ts':
                const CompanyClassSpec = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/types.spec.ts').CompanyClassSpec;
                instance = new CompanyClassSpec();
                break;
            case 'WarningSpec_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/project/src/tests/warnings.spec.ts':
                const WarningSpec = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/project/src/tests/warnings.spec.ts').WarningSpec;
                instance = new WarningSpec();
                break;
            default:
                console.log('WARNING: No instance found for instanceGenerator id = ', instanceGenerator?.id);
                instance = undefined;
        }
        return instance;
    } catch(err) {
        console.log('Impossible to map this instance. Did you exported it ?', err);
    }
}
exports.generateInstance = generateInstance;
