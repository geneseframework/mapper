import { InstanceGenerator } from '../models/instance-generator.model';
import * as chalk from 'chalk';
import { Address } from "../debug/project/src/models/address.model";
import { Animal } from "../debug/project/src/models/animal.model";
import { Cat } from "../debug/project/src/models/cat.model";
import { MainAppProcess } from "../debug/project/src/models/main-app-process";
import { Person } from "../debug/project/src/models/person.model";
import { Company } from "../debug/project/src/models/company.model";
import { Ngo } from "../debug/project/src/models/ngo.model";
import { ColorClassSpec, ColorsClassSpec } from "../debug/project/src/tests/enums.spec";
import { Mapper } from "../models/mapper";
import { AnimalOwner } from "../debug/project/src/tests/interfaces.spec";
import { TupleClassSpec } from "../debug/project/src/tests/tuple.spec";
import { CatSpec, ChildAbstractClassSpec,  ChildClassSpec,  ClassWithAnySpec,  ClassWithPrimitivesSpec,  DateSpec,    IndexableNumberSpec,    IndexableSpec,    OutOfProjectSpec, ParentClassSpec,  PersonCatSpec, ValuesByDefault, ValuesOnConstructor } from "../debug/project/src/tests/classes.spec";
import { NgoSpec, CompanySpec, PersonSpec, PaintStringOrStringsSpec, LevelClassSpec, AgeNumbersOrNumberSpec, PaintStringsOrStringSpec, AgeNumberOrNumbersSpec } from "../debug/project/src/tests/types.spec";
import { Global } from "../models/global.model";
import { FlagService } from "../services/flag.service";
import { InitService } from "../services/init.service";
import { MapArrayService } from "../services/map-array.service";
import { MapDeclarationService } from "../services/map-declaration.service";
import { MapEnumService } from "../services/map-enum.service";
import { MapInstanceOrInterfaceService } from "../services/map-instance-or-interface.service";
import { MapInstanceService } from "../services/map-instance.service";
import { MapInterfaceService } from "../services/map-interface.service";
import { MapPrimitiveService } from "../services/map-primitive.service";
import { MapPropertyService } from "../services/map-property.service";
import { MapTupleService } from "../services/map-tuple.service";
import { MapTypeService } from "../services/map-type.service";
import { TestMapper } from "../test-engine/test-mapper.model";
import { MapTypeArrayService } from "../services/map-type-array.service";
import { PropertyInfos } from "../types/property-infos.type";
import { DateDeclaration } from "../models/date-declaration.model";
import { MapDateService } from "../services/map-date.service";
import { MapObjectService } from "../services/map-object.service";
import { AppController } from "../../../../../backend/src/app.controller";
import { AppModule } from "../../../../../backend/src/app.module";
import { AppService } from "../../../../../backend/src/app.service";
import { ClassUTEntity } from "../../../../../backend/src/db/entities/class-ut.entity";
import { DeclarationEntity } from "../../../../../backend/src/db/entities/declaration.entity";
import { EnumUTEntity } from "../../../../../backend/src/db/entities/enum-ut.entity";
import { FilePathEntity } from "../../../../../backend/src/db/entities/file-path.entity";
import { FileUTEntity } from "../../../../../backend/src/db/entities/file-ut.entity";
import { FunctionUTEntity } from "../../../../../backend/src/db/entities/function-ut.entity";
import { KeyValueEntity } from "../../../../../backend/src/db/entities/key-value.entity";
import { MethodUTEntity } from "../../../../../backend/src/db/entities/method-ut.entity";
import { MockEntity } from "../../../../../backend/src/db/entities/mock.entity";
import { MutationEntity } from "../../../../../backend/src/db/entities/mutation.entity";
import { ParameterEntity } from "../../../../../backend/src/db/entities/parameter.entity";
import { PropertyEntity } from "../../../../../backend/src/db/entities/property.entity";
import { StatementUTEntity } from "../../../../../backend/src/db/entities/statement-ut.entity";
import { StoryEntity } from "../../../../../backend/src/db/entities/story.entity";
import { SystemUTEntity } from "../../../../../backend/src/db/entities/system-ut.entity";
import { TestCaseEntity } from "../../../../../backend/src/db/entities/test-case.entity";
import { ValueEntity } from "../../../../../backend/src/db/entities/value.entity";
import { Orm } from "../../../../../backend/src/db/models/orm.model";
import { ClassUtEntityService } from "../../../../../backend/src/db/services/class-ut-entity.service";
import { EnumUtEntityService } from "../../../../../backend/src/db/services/enum-ut-entity.service";
import { FileUtEntityService } from "../../../../../backend/src/db/services/file-ut-entity.service";
import { FunctionUtEntityService } from "../../../../../backend/src/db/services/function-ut-entity.service";
import { KeyValueEntityService } from "../../../../../backend/src/db/services/key-value-entity.service";
import { MethodUtEntityService } from "../../../../../backend/src/db/services/method-ut-entity.service";
import { MockEntityService } from "../../../../../backend/src/db/services/mock-entity.service";
import { ParameterEntityService } from "../../../../../backend/src/db/services/parameter-entity.service";
import { StatementUtEntityService } from "../../../../../backend/src/db/services/statement-ut-entity.service";
import { SystemUtEntityService } from "../../../../../backend/src/db/services/system-ut-entity.service";
import { FileUtController } from "../../../../../backend/src/file-ut/file-ut.controller";
import { FileUtModule } from "../../../../../backend/src/file-ut/file-ut.module";
import { FileUtService } from "../../../../../backend/src/file-ut/file-ut.service";
import { ReferencedClassOrEnumUTEntity } from "../../../../../backend/src/file-ut/referenced-class-ut-entity.model";
import { SystemUtController } from "../../../../../backend/src/system-ut/system-ut.controller";
import { SystemUtModule } from "../../../../../backend/src/system-ut/system-ut.module";
import { SystemUtService } from "../../../../../backend/src/system-ut/system-ut.service";
import { TestCaseController } from "../../../../../backend/src/test-case/test-case.controller";
import { TestCaseModule } from "../../../../../backend/src/test-case/test-case.module";
import { TestCaseService } from "../../../../../backend/src/test-case/test-case.service";
import { AuthGuardService } from "../../../../../dist/kuzzy/flag/auth-guard.service";
import { CoreModule } from "../../../../../dist/kuzzy/flag/cat.module";
import { Vet } from "../../../../../dist/kuzzy/flag/vet.model";
import { DeleteFileUtPathsDto } from "../../../../../dtos/file-ut/delete-file-ut-paths.dto";
import { PostFileUTsDto, PostFileUTDto, PostFileUTDtoClassUT, PostFileUTDtoCallerUT, PostFileUTDtoEnumUT, PostFileUTDtoProperty } from "../../../../../dtos/file-ut/post-file-uts.dto";
import { PutSystemUtDto } from "../../../../../dtos/system-ut/put-system-ut.dto";
import { GetTestCasesDto } from "../../../../../dtos/test-cases/get-test-cases.dto";
import { PostTestCaseDto } from "../../../../../dtos/test-cases/post-test-case.dto";
import { TestCaseDto, PostTestCaseDtoMock, PostTestCaseDtoParameter, PostTestCaseDtoKeyValue } from "../../../../../dtos/test-cases/test-case.dto";
import { ReferencedDeclaration } from "../../../../../frontend/api/models/referenced-class-ut-declaration.model";
import { FileUTDataService } from "../../../../../frontend/api/services/file-ut-data.service";
import { ShouldBeSavedService } from "../../../../../frontend/api/services/should-be-saved.service";
import { SystemUtDataService } from "../../../../../frontend/api/services/system-ut-data.service";
import { TestCaseDataService } from "../../../../../frontend/api/services/test-case-data.service";
import { Evolution } from "../../../../../frontend/capture/models/evolution.model";
import { Instance } from "../../../../../frontend/capture/models/instance.model";
import { MockDependency } from "../../../../../frontend/capture/models/mock-dependency.model";
import { Mock } from "../../../../../frontend/capture/models/mock.model";
import { Mutation } from "../../../../../frontend/capture/models/mutation.model";
import { TestCase } from "../../../../../frontend/capture/models/test-case.model";
import { CaptureService } from "../../../../../frontend/capture/services/capture.service";
import { CoverageService } from "../../../../../frontend/capture/services/coverage.service";
import { FlashService } from "../../../../../frontend/capture/services/flash.service";
import { InstanceService } from "../../../../../frontend/capture/services/instance.service";
import { DbLoggerService } from "../../../../../frontend/db/services/db-logger.service";
import { KeyValueDataService } from "../../../../../frontend/db/services/key-value-data.service";
import { CallerInformations } from "../../../../../frontend/flag/models/caller-informations.model";
import { ClassEnum } from "../../../../../frontend/flag/models/class-enum.model";
import { Enumerable } from "../../../../../frontend/flag/models/enumerable.model";
import { KeyValue } from "../../../../../frontend/flag/models/key-value.model";
import { ClassEnumService } from "../../../../../frontend/flag/services/class-enum.service";
import { EnumService } from "../../../../../frontend/flag/services/enum.service";
import { EnumerableService } from "../../../../../frontend/flag/services/enumerable.service";
import { GitService } from "../../../../../frontend/init/services/git.service";
import { InitSpecialCasesService } from "../../../../../frontend/init/services/init-special-cases.service";
import { Main } from "../../../../../frontend/start/main";
import { DynamicSystemState } from "../../../../../frontend/system/models/dynamic-app-state.model";
import { FileUT } from "../../../../../frontend/system/models/file-ut.model";
import { StatementUT } from "../../../../../frontend/system/models/statement-ut.model";
import { Story } from "../../../../../frontend/system/models/story.model";
import { SystemState } from "../../../../../frontend/system/models/system-state.model";
import { SystemUT } from "../../../../../frontend/system/models/system-ut.model";
import { TypeReferenceService } from "../../../../../frontend/system/services/type-reference.service";
import { DescribeClass } from "../../../../../frontend/write/models/describe-class.model";
import { DescribeMethod } from "../../../../../frontend/write/models/describe-method.model";
import { ImportDefault } from "../../../../../frontend/write/models/import-default.model";
import { ImportLine } from "../../../../../frontend/write/models/import-line.model";
import { It } from "../../../../../frontend/write/models/it.model";
import { MockFile } from "../../../../../frontend/write/models/mock-file.model";
import { TestFile } from "../../../../../frontend/write/models/test-file.model";
import { DescribeClassService } from "../../../../../frontend/write/services/describe-class.service";
import { DescribeMethodService } from "../../../../../frontend/write/services/describe-method.service";
import { ImportLineService } from "../../../../../frontend/write/services/import-line.service";
import { MockFileService } from "../../../../../frontend/write/services/mock-file.service";
import { TestFileService } from "../../../../../frontend/write/services/test-file.service";
import { WriteService } from "../../../../../frontend/write/services/write.service";
import { BooksController } from "../../../../../sut/bookstore/backend/src/books/books.controller";
import { BooksModule } from "../../../../../sut/bookstore/backend/src/books/books.module";
import { BooksService } from "../../../../../sut/bookstore/backend/src/books/books.service";
import { CreateBookDTO } from "../../../../../sut/bookstore/backend/src/books/dto/create-book.dto";
import { AppRoutingModule } from "../../../../../sut/bookstore/src/app/app-routing.module";
import { AppComponent } from "../../../../../sut/bookstore/src/app/app.component";
import { PaginatorComponent } from "../../../../../sut/bookstore/src/app/core/components/paginator/paginator.component";
import { MaterialModule } from "../../../../../sut/bookstore/src/app/core/modules/material.module";
import { TranslateModule } from "../../../../../sut/bookstore/src/app/core/modules/translate.module";
import { CreateComponent } from "../../../../../sut/bookstore/src/app/features/create/create.component";
import { DataListComponent } from "../../../../../sut/bookstore/src/app/features/data-list/data-list.component";
import { DeleteComponent } from "../../../../../sut/bookstore/src/app/features/delete/delete.component";
import { FeaturesComponent } from "../../../../../sut/bookstore/src/app/features/features.component";
import { FeaturesModule } from "../../../../../sut/bookstore/src/app/features/features.module";
import { GetAllComponent } from "../../../../../sut/bookstore/src/app/features/get-all/get-all.component";
import { GetArrayComponent } from "../../../../../sut/bookstore/src/app/features/get-array/get-array.component";
import { GetOneComponent } from "../../../../../sut/bookstore/src/app/features/get-one/get-one.component";
import { ArrayOfArraysOfBooks } from "../../../../../sut/bookstore/src/app/features/models/arrayOfArraysOfBooks.model";
import { ArrayOfArraysOfStrings } from "../../../../../sut/bookstore/src/app/features/models/arrayOfArraysOfStrings.model";
import { ArrayOfStrings } from "../../../../../sut/bookstore/src/app/features/models/arrayOfStrings.model";
import { UpdateComponent } from "../../../../../sut/bookstore/src/app/features/update/update.component";
import { WelcomeComponent } from "../../../../../sut/bookstore/src/app/features/welcome/welcome.component";
import { FileToDeleteTemp } from "../../../../../sut/bookstore/src/app/file-to-delete.temp";

export function generateInstance<T>(instanceGenerator: InstanceGenerator<T>): T {
    let instance: any;
    switch (instanceGenerator.id) {
        case 'AppController_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/backend/src/app.controller.ts':
            instance = new AppController(undefined);
            break;
        case 'AppModule_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/backend/src/app.module.ts':
            instance = new AppModule();
            break;
        case 'AppService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/backend/src/app.service.ts':
            instance = new AppService();
            break;
        case 'DeleteFileUtPathsDto_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/dtos/file-ut/delete-file-ut-paths.dto.ts':
            instance = new DeleteFileUtPathsDto();
            break;
        case 'PostFileUTsDto_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/dtos/file-ut/post-file-uts.dto.ts':
            instance = new PostFileUTsDto();
            break;
        case 'PostFileUTDto_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/dtos/file-ut/post-file-uts.dto.ts':
            instance = new PostFileUTDto();
            break;
        case 'PostFileUTDtoClassUT_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/dtos/file-ut/post-file-uts.dto.ts':
            instance = new PostFileUTDtoClassUT();
            break;
        case 'PostFileUTDtoCallerUT_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/dtos/file-ut/post-file-uts.dto.ts':
            instance = new PostFileUTDtoCallerUT();
            break;
        case 'PostFileUTDtoEnumUT_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/dtos/file-ut/post-file-uts.dto.ts':
            instance = new PostFileUTDtoEnumUT();
            break;
        case 'PostFileUTDtoProperty_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/dtos/file-ut/post-file-uts.dto.ts':
            instance = new PostFileUTDtoProperty();
            break;
        case 'PutSystemUtDto_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/dtos/system-ut/put-system-ut.dto.ts':
            instance = new PutSystemUtDto();
            break;
        case 'GetTestCasesDto_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/dtos/test-cases/get-test-cases.dto.ts':
            instance = new GetTestCasesDto();
            break;
        case 'PostTestCaseDto_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/dtos/test-cases/post-test-case.dto.ts':
            instance = new PostTestCaseDto();
            break;
        case 'TestCaseDto_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/dtos/test-cases/test-case.dto.ts':
            instance = new TestCaseDto();
            break;
        case 'PostTestCaseDtoMock_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/dtos/test-cases/test-case.dto.ts':
            instance = new PostTestCaseDtoMock();
            break;
        case 'PostTestCaseDtoParameter_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/dtos/test-cases/test-case.dto.ts':
            instance = new PostTestCaseDtoParameter();
            break;
        case 'PostTestCaseDtoKeyValue_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/dtos/test-cases/test-case.dto.ts':
            instance = new PostTestCaseDtoKeyValue();
            break;
        case 'Main_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/start/main.ts':
            instance = new Main();
            break;
        case 'Address_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/sut/cats/address.model.ts':
            instance = new Address(undefined, undefined, undefined);
            break;
        case 'AuthGuardService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/sut/cats/auth-guard.service.ts':
            instance = new AuthGuardService(undefined);
            break;
        case 'Cat_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/sut/cats/cat.model.ts':
            instance = new Cat(undefined, undefined, undefined);
            break;
        case 'CoreModule_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/sut/cats/cat.module.ts':
            instance = new CoreModule();
            break;
        case 'MainAppProcess_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/sut/cats/main-app-process.ts':
            instance = new MainAppProcess();
            break;
        case 'Person_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/sut/cats/person.model.ts':
            instance = new Person(undefined, undefined, undefined, undefined, undefined, undefined);
            break;
        case 'Vet_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/sut/cats/vet.model.ts':
            instance = new Vet(undefined, undefined, undefined);
            break;
        case 'Address_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/dist/kuzzy/flag/address.model.ts':
            instance = new Address(undefined, undefined, undefined);
            break;
        case 'AuthGuardService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/dist/kuzzy/flag/auth-guard.service.ts':
            instance = new AuthGuardService(undefined);
            break;
        case 'Cat_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/dist/kuzzy/flag/cat.model.ts':
            instance = new Cat(undefined, undefined, undefined);
            break;
        case 'CoreModule_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/dist/kuzzy/flag/cat.module.ts':
            instance = new CoreModule();
            break;
        case 'MainAppProcess_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/dist/kuzzy/flag/main-app-process.ts':
            instance = new MainAppProcess();
            break;
        case 'Person_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/dist/kuzzy/flag/person.model.ts':
            instance = new Person(undefined, undefined, undefined, undefined, undefined, undefined);
            break;
        case 'Vet_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/dist/kuzzy/flag/vet.model.ts':
            instance = new Vet(undefined, undefined, undefined);
            break;
        case 'ReferencedDeclaration_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/api/models/referenced-class-ut-declaration.model.ts':
            instance = new ReferencedDeclaration(undefined, undefined, undefined);
            break;
        case 'FileUTDataService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/api/services/file-ut-data.service.ts':
            instance = new FileUTDataService();
            break;
        case 'ShouldBeSavedService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/api/services/should-be-saved.service.ts':
            instance = new ShouldBeSavedService();
            break;
        case 'SystemUtDataService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/api/services/system-ut-data.service.ts':
            instance = new SystemUtDataService();
            break;
        case 'TestCaseDataService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/api/services/test-case-data.service.ts':
            instance = new TestCaseDataService();
            break;
        case 'Evolution_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/capture/models/evolution.model.ts':
            instance = new Evolution(undefined, undefined, undefined);
            break;
        case 'Instance_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/capture/models/instance.model.ts':
            instance = new Instance(undefined, undefined, undefined);
            break;
        case 'MockDependency_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/capture/models/mock-dependency.model.ts':
            instance = new MockDependency(undefined, undefined, undefined, undefined);
            break;
        case 'Mock_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/capture/models/mock.model.ts':
            instance = new Mock(undefined);
            break;
        case 'Mutation_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/capture/models/mutation.model.ts':
            instance = new Mutation(undefined, undefined, undefined);
            break;
        case 'TestCase_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/capture/models/test-case.model.ts':
            instance = new TestCase(undefined, undefined, undefined, undefined, undefined, undefined);
            break;
        case 'CaptureService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/capture/services/capture.service.ts':
            instance = new CaptureService();
            break;
        case 'CoverageService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/capture/services/coverage.service.ts':
            instance = new CoverageService();
            break;
        case 'FlashService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/capture/services/flash.service.ts':
            instance = new FlashService();
            break;
        case 'InstanceService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/capture/services/instance.service.ts':
            instance = new InstanceService();
            break;
        case 'TestCaseService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/capture/services/test-case.service.ts':
            instance = new TestCaseService();
            break;
        case 'ClassUTEntity_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/db/entities/class-ut.entity.ts':
            instance = new ClassUTEntity(undefined, undefined);
            break;
        case 'DeclarationEntity_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/db/entities/declaration.entity.ts':
            instance = new DeclarationEntity();
            break;
        case 'EnumUTEntity_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/db/entities/enum-ut.entity.ts':
            instance = new EnumUTEntity(undefined, undefined);
            break;
        case 'FilePathEntity_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/db/entities/file-path.entity.ts':
            instance = new FilePathEntity(undefined, undefined);
            break;
        case 'FileUTEntity_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/db/entities/file-ut.entity.ts':
            instance = new FileUTEntity(undefined, undefined);
            break;
        case 'FunctionUTEntity_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/db/entities/function-ut.entity.ts':
            instance = new FunctionUTEntity(undefined, undefined);
            break;
        case 'KeyValueEntity_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/db/entities/key-value.entity.ts':
            instance = new KeyValueEntity(undefined, undefined, undefined);
            break;
        case 'MethodUTEntity_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/db/entities/method-ut.entity.ts':
            instance = new MethodUTEntity(undefined, undefined, undefined, undefined);
            break;
        case 'MockEntity_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/db/entities/mock.entity.ts':
            instance = new MockEntity(undefined, undefined, undefined);
            break;
        case 'MutationEntity_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/db/entities/mutation.entity.ts':
            instance = new MutationEntity(undefined, undefined);
            break;
        case 'ParameterEntity_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/db/entities/parameter.entity.ts':
            instance = new ParameterEntity(undefined);
            break;
        case 'PropertyEntity_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/db/entities/property.entity.ts':
            instance = new PropertyEntity(undefined, undefined);
            break;
        case 'StatementUTEntity_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/db/entities/statement-ut.entity.ts':
            instance = new StatementUTEntity(undefined, undefined, undefined);
            break;
        case 'StoryEntity_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/db/entities/story.entity.ts':
            instance = new StoryEntity();
            break;
        case 'SystemUTEntity_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/db/entities/system-ut.entity.ts':
            instance = new SystemUTEntity(undefined);
            break;
        case 'TestCaseEntity_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/db/entities/test-case.entity.ts':
            instance = new TestCaseEntity();
            break;
        case 'ValueEntity_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/db/entities/value.entity.ts':
            instance = new ValueEntity(undefined);
            break;
        case 'ClassUtEntityService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/db/services/class-ut-entity.service.ts':
            instance = new ClassUtEntityService();
            break;
        case 'DbLoggerService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/db/services/db-logger.service.ts':
            instance = new DbLoggerService();
            break;
        case 'EnumUtEntityService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/db/services/enum-ut-entity.service.ts':
            instance = new EnumUtEntityService();
            break;
        case 'FileUtEntityService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/db/services/file-ut-entity.service.ts':
            instance = new FileUtEntityService();
            break;
        case 'FunctionUtEntityService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/db/services/function-ut-entity.service.ts':
            instance = new FunctionUtEntityService();
            break;
        case 'KeyValueDataService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/db/services/key-value-data.service.ts':
            instance = new KeyValueDataService();
            break;
        case 'KeyValueEntityService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/db/services/key-value-entity.service.ts':
            instance = new KeyValueEntityService();
            break;
        case 'MethodUtEntityService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/db/services/method-ut-entity.service.ts':
            instance = new MethodUtEntityService();
            break;
        case 'MockEntityService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/db/services/mock-entity.service.ts':
            instance = new MockEntityService();
            break;
        case 'ParameterEntityService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/db/services/parameter-entity.service.ts':
            instance = new ParameterEntityService();
            break;
        case 'StatementUtEntityService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/db/services/statement-ut-entity.service.ts':
            instance = new StatementUtEntityService();
            break;
        case 'CallerInformations_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/flag/models/caller-informations.model.ts':
            instance = new CallerInformations(undefined, undefined, undefined);
            break;
        case 'ClassEnum_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/flag/models/class-enum.model.ts':
            instance = new ClassEnum(undefined, undefined, undefined, undefined, undefined, undefined);
            break;
        case 'Enumerable_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/flag/models/enumerable.model.ts':
            instance = new Enumerable(undefined, undefined, undefined);
            break;
        case 'KeyValue_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/flag/models/key-value.model.ts':
            instance = new KeyValue(undefined, undefined);
            break;
        case 'ClassEnumService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/flag/services/class-enum.service.ts':
            instance = new ClassEnumService();
            break;
        case 'EnumService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/flag/services/enum.service.ts':
            instance = new EnumService();
            break;
        case 'EnumerableService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/flag/services/enumerable.service.ts':
            instance = new EnumerableService();
            break;
        case 'Global_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/init/models/global.model.ts':
            instance = new Global();
            break;
        case 'Orm_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/init/models/orm.model.ts':
            instance = new Orm();
            break;
        case 'GitService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/init/services/git.service.ts':
            instance = new GitService();
            break;
        case 'InitSpecialCasesService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/init/services/init-special-cases.service.ts':
            instance = new InitSpecialCasesService();
            break;
        case 'InitService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/init/services/init.service.ts':
            instance = new InitService();
            break;
        case 'DynamicSystemState_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/system/models/dynamic-app-state.model.ts':
            instance = new DynamicSystemState();
            break;
        case 'FileUT_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/system/models/file-ut.model.ts':
            instance = new FileUT(undefined);
            break;
        case 'StatementUT_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/system/models/statement-ut.model.ts':
            instance = new StatementUT(undefined, undefined, undefined, undefined);
            break;
        case 'Story_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/system/models/story.model.ts':
            instance = new Story(undefined);
            break;
        case 'SystemState_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/system/models/system-state.model.ts':
            instance = new SystemState();
            break;
        case 'SystemUT_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/system/models/system-ut.model.ts':
            instance = new SystemUT(undefined);
            break;
        case 'FileUtService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/system/services/file-ut.service.ts':
            instance = new FileUtService();
            break;
        case 'SystemUtService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/system/services/system-ut.service.ts':
            instance = new SystemUtService();
            break;
        case 'TypeReferenceService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/system/services/type-reference.service.ts':
            instance = new TypeReferenceService();
            break;
        case 'DescribeClass_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/write/models/describe-class.model.ts':
            instance = new DescribeClass(undefined, undefined);
            break;
        case 'DescribeMethod_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/write/models/describe-method.model.ts':
            instance = new DescribeMethod(undefined, undefined);
            break;
        case 'ImportDefault_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/write/models/import-default.model.ts':
            instance = new ImportDefault(undefined, undefined, undefined);
            break;
        case 'ImportLine_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/write/models/import-line.model.ts':
            instance = new ImportLine(undefined, undefined);
            break;
        case 'It_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/write/models/it.model.ts':
            instance = new It(undefined, undefined);
            break;
        case 'MockFile_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/write/models/mock-file.model.ts':
            instance = new MockFile(undefined);
            break;
        case 'TestFile_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/write/models/test-file.model.ts':
            instance = new TestFile(undefined);
            break;
        case 'DescribeClassService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/write/services/describe-class.service.ts':
            instance = new DescribeClassService();
            break;
        case 'DescribeMethodService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/write/services/describe-method.service.ts':
            instance = new DescribeMethodService();
            break;
        case 'ImportLineService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/write/services/import-line.service.ts':
            instance = new ImportLineService();
            break;
        case 'MockFileService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/write/services/mock-file.service.ts':
            instance = new MockFileService();
            break;
        case 'TestFileService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/write/services/test-file.service.ts':
            instance = new TestFileService();
            break;
        case 'WriteService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/frontend/write/services/write.service.ts':
            instance = new WriteService();
            break;
        case 'FileUtController_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/backend/src/file-ut/file-ut.controller.ts':
            instance = new FileUtController(undefined);
            break;
        case 'FileUtModule_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/backend/src/file-ut/file-ut.module.ts':
            instance = new FileUtModule();
            break;
        case 'FileUtService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/backend/src/file-ut/file-ut.service.ts':
            instance = new FileUtService();
            break;
        case 'ReferencedClassOrEnumUTEntity_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/backend/src/file-ut/referenced-class-ut-entity.model.ts':
            instance = new ReferencedClassOrEnumUTEntity(undefined, undefined, undefined);
            break;
        case 'SystemUtController_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/backend/src/system-ut/system-ut.controller.ts':
            instance = new SystemUtController(undefined);
            break;
        case 'SystemUtModule_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/backend/src/system-ut/system-ut.module.ts':
            instance = new SystemUtModule();
            break;
        case 'SystemUtService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/backend/src/system-ut/system-ut.service.ts':
            instance = new SystemUtService();
            break;
        case 'TestCaseController_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/backend/src/test-case/test-case.controller.ts':
            instance = new TestCaseController(undefined);
            break;
        case 'TestCaseModule_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/backend/src/test-case/test-case.module.ts':
            instance = new TestCaseModule();
            break;
        case 'TestCaseService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/backend/src/test-case/test-case.service.ts':
            instance = new TestCaseService();
            break;
        case 'ClassUTEntity_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/backend/src/db/entities/class-ut.entity.ts':
            instance = new ClassUTEntity(undefined, undefined);
            break;
        case 'DeclarationEntity_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/backend/src/db/entities/declaration.entity.ts':
            instance = new DeclarationEntity();
            break;
        case 'EnumUTEntity_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/backend/src/db/entities/enum-ut.entity.ts':
            instance = new EnumUTEntity(undefined, undefined);
            break;
        case 'FilePathEntity_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/backend/src/db/entities/file-path.entity.ts':
            instance = new FilePathEntity(undefined, undefined);
            break;
        case 'FileUTEntity_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/backend/src/db/entities/file-ut.entity.ts':
            instance = new FileUTEntity(undefined, undefined);
            break;
        case 'FunctionUTEntity_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/backend/src/db/entities/function-ut.entity.ts':
            instance = new FunctionUTEntity(undefined, undefined);
            break;
        case 'KeyValueEntity_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/backend/src/db/entities/key-value.entity.ts':
            instance = new KeyValueEntity(undefined, undefined);
            break;
        case 'MethodUTEntity_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/backend/src/db/entities/method-ut.entity.ts':
            instance = new MethodUTEntity(undefined, undefined);
            break;
        case 'MockEntity_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/backend/src/db/entities/mock.entity.ts':
            instance = new MockEntity(undefined, undefined, undefined);
            break;
        case 'MutationEntity_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/backend/src/db/entities/mutation.entity.ts':
            instance = new MutationEntity(undefined, undefined);
            break;
        case 'ParameterEntity_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/backend/src/db/entities/parameter.entity.ts':
            instance = new ParameterEntity(undefined);
            break;
        case 'PropertyEntity_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/backend/src/db/entities/property.entity.ts':
            instance = new PropertyEntity(undefined, undefined);
            break;
        case 'StatementUTEntity_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/backend/src/db/entities/statement-ut.entity.ts':
            instance = new StatementUTEntity(undefined, undefined, undefined);
            break;
        case 'StoryEntity_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/backend/src/db/entities/story.entity.ts':
            instance = new StoryEntity();
            break;
        case 'SystemUTEntity_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/backend/src/db/entities/system-ut.entity.ts':
            instance = new SystemUTEntity(undefined);
            break;
        case 'TestCaseEntity_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/backend/src/db/entities/test-case.entity.ts':
            instance = new TestCaseEntity();
            break;
        case 'ValueEntity_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/backend/src/db/entities/value.entity.ts':
            instance = new ValueEntity(undefined, undefined);
            break;
        case 'Orm_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/backend/src/db/models/orm.model.ts':
            instance = new Orm();
            break;
        case 'ClassUtEntityService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/backend/src/db/services/class-ut-entity.service.ts':
            instance = new ClassUtEntityService();
            break;
        case 'DbLoggerService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/backend/src/db/services/db-logger.service.ts':
            instance = new DbLoggerService();
            break;
        case 'EnumUtEntityService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/backend/src/db/services/enum-ut-entity.service.ts':
            instance = new EnumUtEntityService();
            break;
        case 'FileUtEntityService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/backend/src/db/services/file-ut-entity.service.ts':
            instance = new FileUtEntityService();
            break;
        case 'FunctionUtEntityService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/backend/src/db/services/function-ut-entity.service.ts':
            instance = new FunctionUtEntityService();
            break;
        case 'KeyValueEntityService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/backend/src/db/services/key-value-entity.service.ts':
            instance = new KeyValueEntityService();
            break;
        case 'MethodUtEntityService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/backend/src/db/services/method-ut-entity.service.ts':
            instance = new MethodUtEntityService();
            break;
        case 'MockEntityService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/backend/src/db/services/mock-entity.service.ts':
            instance = new MockEntityService();
            break;
        case 'ParameterEntityService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/backend/src/db/services/parameter-entity.service.ts':
            instance = new ParameterEntityService();
            break;
        case 'StatementUtEntityService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/backend/src/db/services/statement-ut-entity.service.ts':
            instance = new StatementUtEntityService();
            break;
        case 'SystemUtEntityService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/backend/src/db/services/system-ut-entity.service.ts':
            instance = new SystemUtEntityService();
            break;
        case 'AppController_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/sut/bookstore/backend/src/app.controller.ts':
            instance = new AppController(undefined);
            break;
        case 'AppModule_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/sut/bookstore/backend/src/app.module.ts':
            instance = new AppModule();
            break;
        case 'AppService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/sut/bookstore/backend/src/app.service.ts':
            instance = new AppService();
            break;
        case 'AppRoutingModule_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/sut/bookstore/src/app/app-routing.module.ts':
            instance = new AppRoutingModule();
            break;
        case 'AppComponent_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/sut/bookstore/src/app/app.component.ts':
            instance = new AppComponent(undefined);
            break;
        case 'AppModule_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/sut/bookstore/src/app/app.module.ts':
            instance = new AppModule();
            break;
        case 'FileToDeleteTemp_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/sut/bookstore/src/app/file-to-delete.temp.ts':
            instance = new FileToDeleteTemp();
            break;
        case 'Mapper_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/node_modules/@genese/mapper/src/models/mapper.ts':
            instance = new Mapper();
            break;
        case 'BooksController_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/sut/bookstore/backend/src/books/books.controller.ts':
            instance = new BooksController(undefined);
            break;
        case 'BooksModule_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/sut/bookstore/backend/src/books/books.module.ts':
            instance = new BooksModule();
            break;
        case 'BooksService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/sut/bookstore/backend/src/books/books.service.ts':
            instance = new BooksService();
            break;
        case 'CoreModule_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/sut/bookstore/src/app/core/core.module.ts':
            instance = new CoreModule();
            break;
        case 'FeaturesComponent_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/sut/bookstore/src/app/features/features.component.ts':
            instance = new FeaturesComponent(undefined);
            break;
        case 'FeaturesModule_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/sut/bookstore/src/app/features/features.module.ts':
            instance = new FeaturesModule();
            break;
        case 'CreateBookDTO_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/sut/bookstore/backend/src/books/dto/create-book.dto.ts':
            instance = new CreateBookDTO();
            break;
        case 'MaterialModule_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/sut/bookstore/src/app/core/modules/material.module.ts':
            instance = new MaterialModule();
            break;
        case 'TranslateModule_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/sut/bookstore/src/app/core/modules/translate.module.ts':
            instance = new TranslateModule(undefined);
            break;
        case 'AuthGuardService_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/sut/bookstore/src/app/core/services/auth-guard.service.ts':
            instance = new AuthGuardService(undefined);
            break;
        case 'CreateComponent_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/sut/bookstore/src/app/features/create/create.component.ts':
            instance = new CreateComponent(undefined);
            break;
        case 'DataListComponent_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/sut/bookstore/src/app/features/data-list/data-list.component.ts':
            instance = new DataListComponent(undefined);
            break;
        case 'DeleteComponent_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/sut/bookstore/src/app/features/delete/delete.component.ts':
            instance = new DeleteComponent(undefined);
            break;
        case 'GetAllComponent_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/sut/bookstore/src/app/features/get-all/get-all.component.ts':
            instance = new GetAllComponent(undefined);
            break;
        case 'GetArrayComponent_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/sut/bookstore/src/app/features/get-array/get-array.component.ts':
            instance = new GetArrayComponent(undefined);
            break;
        case 'GetOneComponent_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/sut/bookstore/src/app/features/get-one/get-one.component.ts':
            instance = new GetOneComponent(undefined);
            break;
        case 'ArrayOfArraysOfBooks_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/sut/bookstore/src/app/features/models/arrayofarraysofbooks.model.ts':
            instance = new ArrayOfArraysOfBooks();
            break;
        case 'ArrayOfArraysOfStrings_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/sut/bookstore/src/app/features/models/arrayofarraysofstrings.model.ts':
            instance = new ArrayOfArraysOfStrings();
            break;
        case 'ArrayOfStrings_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/sut/bookstore/src/app/features/models/arrayofstrings.model.ts':
            instance = new ArrayOfStrings();
            break;
        case 'Book_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/sut/bookstore/src/app/features/models/book.model.ts':
            instance = new Book();
            break;
        case 'UpdateComponent_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/sut/bookstore/src/app/features/update/update.component.ts':
            instance = new UpdateComponent(undefined);
            break;
        case 'WelcomeComponent_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/sut/bookstore/src/app/features/welcome/welcome.component.ts':
            instance = new WelcomeComponent(undefined);
            break;
        case 'PaginatorComponent_/users/utilisateur/documents/perso_gilles_fabre/projets/kuzzy/repo/sut/bookstore/src/app/core/components/paginator/paginator.component.ts':
            instance = new PaginatorComponent();
            break;
        default:
            console.log(chalk.yellow('WARNING: No instance found for instanceGenerator id = '), instanceGenerator?.id);
            instance = undefined;
        }
    return instance;
}
