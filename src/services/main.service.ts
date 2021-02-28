import { Target } from '../types/target.type';
import { CreateOptions } from '../interfaces/create-options.interface';
import { ArrayOfPrimitiveElements, PrimitiveElement } from '../types/primitives.type';
import { Tuple } from '../types/tuple.type';
import { OptionsService } from './options.service';
import { IncompatibilityService } from './incompatibility.service';
import { MapTrivialCasesService } from './map-trivial-cases.service';
import { TargetService } from './target.service';
import { MapTupleService } from './map-tuple.service';
import { InitService } from './init.service';
import { TargetInfo } from '../types/target-info.type';
import { TypeDeclaration } from '../types/type-declaration.type';
import { getDeclarationKind, getTypeDeclaration } from '../utils/ast-declaration.util';
import { TypeDeclarationKind } from '../enums/type-declaration.kind';
import { MapInstanceService } from './map-instance.service';
import { MapEnumService } from './map-enum.service';
import { MapInterfaceService } from './map-interface.service';
import { MapTypeService } from './map-type.service';
import { throwWarning } from '../utils/errors.util';
import * as chalk from 'chalk';
import { MapTypeCombinationService } from './map-type-combination.service';

export class MainService {

    /**
     * Returns the data formatted with the target's model
     * - Initializes the instance generator and the global configuration.
     * - Set options for the current mapping.
     * - Returns undefined when data is incompatible with target
     * - Returns mapped data instead
     * @param target
     * @param data
     * @param options
     */
    static async map<T>(target: Target<T>, data: unknown, options?: CreateOptions): Promise<T | T[] | PrimitiveElement | ArrayOfPrimitiveElements | Tuple | Date | Date[] | object | object[]> {
        await InitService.start();
        if (!OptionsService.wasInitialized(options)) {
            options = OptionsService.initialize(options);
        }
        const stringTarget: string = TargetService.toString(target);
        console.log(chalk.magentaBright('STRING TARGTTTTTT'), stringTarget);
        if (!TargetService.isCorrect(target)) {
            throwWarning(`Warning: wrong element in target`, target);
        }
        if (IncompatibilityService.areIncompatible(target, data, options)) {
            return undefined;
        } else if (MapTrivialCasesService.isTrivialCase(target, data)) {
            return MapTrivialCasesService.mapTrivialCase(target, data, options);
        } else if (TargetService.isTuple(target)) {
            return MapTupleService.create(data as any[], target as Tuple, options);
        } else if (TargetService.isTypeCombination(target)) {
            await MapTypeCombinationService.create(target, data, options);
        } else {
            // throwWarning(`Warning: type of target not found :`, target)
            return this.mapDeclaration(target, data, options);
        }
        // return undefined;
    }

    // static async map<T>(target: Target<T>, data: unknown, options?: CreateOptions): Promise<T | T[] | PrimitiveElement | ArrayOfPrimitiveElements | Tuple | Date | Date[] | object | object[]> {
    //     await InitService.start();
    //     if (!OptionsService.wasInitialized(options)) {
    //         options = OptionsService.initialize(options);
    //     }
    //     if (!TargetService.isCorrect(target)) {
    //         throwWarning(`Warning: wrong element in target`, target);
    //     }
    //     if (IncompatibilityService.areIncompatible(target, data, options)) {
    //         return undefined;
    //     } else if (MapTrivialCasesService.isTrivialCase(target, data)) {
    //         return MapTrivialCasesService.mapTrivialCase(target, data, options);
    //     } else if (TargetService.isTuple(target)) {
    //         return MapTupleService.create(data as any[], target as Tuple, options);
    //     } else if (TargetService.isTypeCombination(target)) {
    //         await MapTypeCombinationService.create(target, data, options);
    //     } else {
    //         // throwWarning(`Warning: type of target not found :`, target)
    //         return this.mapDeclaration(target, data, options);
    //     }
    // }


    /**
     * Returns mapped data when target is a Declaration node.
     * @param target
     * @param data
     * @param options
     * @private
     */
    private static async mapDeclaration<T>(target: Target<T>, data: any, options: CreateOptions): Promise<T | T[] | PrimitiveElement | Date | Tuple> {
        const info: TargetInfo = TargetService.getInfo(target);
        const typeDeclaration: TypeDeclaration = getTypeDeclaration(info.typeName);
        switch (getDeclarationKind(typeDeclaration)) {
            case TypeDeclarationKind.CLASS_DECLARATION:
                return MapInstanceService.create<T>(data, info.typeName, options);
            case TypeDeclarationKind.ENUM_DECLARATION:
                return MapEnumService.create(data, info.typeName, info.isArray);
            case TypeDeclarationKind.INTERFACE_DECLARATION:
                return MapInterfaceService.create(data, info.typeName, info.isArray, options);
            case TypeDeclarationKind.TYPE_ALIAS_DECLARATION:
                return MapTypeService.create(data, info.typeName, info.isArray, options);
            default:
                throwWarning(`Warning : type declaration "${info.typeName}" not found.`);
                return undefined;
        }
    }
}
