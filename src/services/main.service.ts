import { Target } from '../types/target.type';
import { CreateOptions } from '../interfaces/create-options.interface';
import { ArrayOfPrimitiveElements, PrimitiveElement } from '../types/primitives.type';
import { Tuple } from '../types/tuple.type';
import { OptionsService } from './options.service';
import { IncompatibilityService } from './incompatibility.service';
import { MapTrivialCasesService } from './map-trivial-cases.service';
import { TargetService } from './target.service';
import { MapTupleService } from './map-tuple.service';
import { GLOBAL } from '../const/global.const';
import { InitService } from './init.service';
import { FlagService } from './flag.service';
import { TargetInfo } from '../types/target-info.type';
import { TypeDeclaration } from '../types/type-declaration.type';
import { getDeclarationKind, getTypeDeclaration } from '../utils/ast-declaration.util';
import { TypeDeclarationKind } from '../enums/type-declaration.kind';
import { MapInstanceService } from './map-instance.service';
import { MapEnumService } from './map-enum.service';
import { MapInterfaceService } from './map-interface.service';
import { MapTypeService } from './map-type.service';
import { throwWarning } from '../utils/errors.util';

export class MainService {

    static async map<T>(target: Target<T>, data: unknown, options?: CreateOptions): Promise<T | T[] | PrimitiveElement | ArrayOfPrimitiveElements | Tuple | Date | Date[] | object | object[]> {
        if (!OptionsService.wasInitialized(options)) {
            options = OptionsService.initialize(options);
        }
        if (IncompatibilityService.areIncompatible(target, data, options)) {
            return undefined;
        } else if (MapTrivialCasesService.isTrivialCase(target, data)) {
            return MapTrivialCasesService.mapTrivialCase(target, data, options);
        } else if (TargetService.isTuple(target)) {
            return MapTupleService.create(data as any[], target as Tuple, options);
        } else {
            return this.mapDeclaration(target, data, options);
        }
    }


    private static async mapDeclaration<T>(target: Target<T>, data: any, options: CreateOptions): Promise<T | T[] | Date | Tuple> {
        const info: TargetInfo = TargetService.getInfo(target);
        const typeDeclaration: TypeDeclaration = getTypeDeclaration(info.typeName);
        switch (getDeclarationKind(typeDeclaration)) {
            case TypeDeclarationKind.CLASS_DECLARATION:
                return MapInstanceService.createInstances<T>(data, info.typeName, options);
            case TypeDeclarationKind.ENUM_DECLARATION:
                return MapEnumService.createEnums(data, info.typeName, info.isArray);
            case TypeDeclarationKind.INTERFACE_DECLARATION:
                return MapInterfaceService.createInterfaces(data, info.typeName, info.isArray, options);
            case TypeDeclarationKind.TYPE_ALIAS_DECLARATION:
                return MapTypeService.createTypes(data, info.typeName, info.isArray, options);
            default:
                throwWarning(`Warning : type declaration "${info.typeName}" not found.`);
                return undefined;
        }
    }
}
