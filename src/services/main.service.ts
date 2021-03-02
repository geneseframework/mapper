import { Target } from '../types/target/target.type';
import { CreateOptions } from '../interfaces/create-options.interface';
import { ArrayOfPrimitiveElements, Primitive } from '../types/primitives.type';
import { TupleOld } from '../types/target/target-tuple-old.type';
import { OptionsService } from './options.service';
import { TargetServiceOld } from './targets/target.service.old';
import { InitService } from './init/init.service';
import { TargetInfo } from '../types/target/target-info.type';
import { TypeDeclaration } from '../types/type-declaration.type';
import { getDeclarationKind, getTypeDeclaration } from '../utils/ast/ast-declaration.util';
import { TypeDeclarationKind } from '../enums/type-declaration.kind';
import { MapInstanceService } from './map/map-instance.service';
import { MapEnumService } from './map/map-enum.service';
import { MapInterfaceService } from './map/map-interface.service';
import { MapTypeService } from './map/map-type.service';
import { throwWarning } from '../utils/errors.util';
import * as chalk from 'chalk';
import { isTargetArray } from '../utils/targets.util';
import { isPrimitiveTypeName } from '../utils/native/types.util';
import { MapPrimitiveService } from './map/map-primitive.service';
import { MapTupleService } from './map/map-tuple.service';
import { isTuple, tupleLength } from '../utils/native/tuples.util';
import { TargetService } from './targets/target.service';
import { isBracketed } from '../types/target/string/bracketed.type';
import { isNullOrUndefined } from '../utils/native/any.util';

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
    static async map<T>(target: Target<T>, data: any, options?: CreateOptions): Promise<T | T[] | Primitive | ArrayOfPrimitiveElements | TupleOld | Date | Date[] | object | object[]> {
        await InitService.start();
        if (!OptionsService.wasInitialized(options)) {
            options = OptionsService.initialize(options);
        }
        return await this.mapString(TargetService.toString(target), data, options);
    }


    static async mapString<T>(target: string, data: any, options?: CreateOptions): Promise<T | T[] | Primitive | ArrayOfPrimitiveElements | TupleOld | Date | Date[] | object | object[]> {
        // console.log(chalk.yellowBright('STRING TARGTTTTTT'), target, target, isTuple(target));
        if (isNullOrUndefined(data)) {
            return data;
        } else if (isBracketed(target)) {
            // console.log(chalk.yellowBright('IS TUPLE OF LENGTHHHH'), tupleLength(target));
            return await MapTupleService.create(target, data, options)
        } else if (isTargetArray(target)) {
            // console.log(chalk.cyanBright('IS ARRAYYYYY '));
        } else if (isPrimitiveTypeName(target)) {
            // console.log(chalk.greenBright('IS PRIMMMM ', target, data));
            return MapPrimitiveService.create([target, data], options);

        }
        // console.log(chalk.redBright('END OF MAINNNN'), stringTarget);
        return undefined;
    }

    // static async map<T>(target: Target<T>, data: unknown, options?: CreateOptions): Promise<T | T[] | Primitive | ArrayOfPrimitiveElements | TupleOld | Date | Date[] | object | object[]> {
    //     await InitService.start();
    //     if (!OptionsService.wasInitialized(options)) {
    //         options = OptionsService.initialize(options);
    //     }
    //     if (!TargetServiceOld.isCorrect(target)) {
    //         throwWarning(`Warning: wrong element in target`, target);
    //     }
    //     if (IncompatibilityService.areIncompatible(target, data, options)) {
    //         return undefined;
    //     } else if (MapTrivialCasesService.isTrivialCase(target, data)) {
    //         return MapTrivialCasesService.mapTrivialCase(target, data, options);
    //     } else if (TargetServiceOld.isTuple(target)) {
    //         return MapTupleServiceOld.create(data as any[], target as TupleOld, options);
    //     } else if (TargetServiceOld.isTypeCombination(target)) {
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
    private static async mapDeclaration<T>(target: Target<T>, data: any, options: CreateOptions): Promise<T | T[] | Primitive | Date | TupleOld> {
        const info: TargetInfo = TargetServiceOld.getInfo(target);
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
