import { Target } from '../types/target/target.type';
import { CreateOptions } from '../models/create-options.model';
import { ArrayOfPrimitiveElements, Primitive } from '../types/primitives.type';
import { OptionsService } from './options.service';
import { InitService } from './init/init.service';
import { hasDeclaration } from '../utils/ast/ast-declaration.util';
import { isPrimitiveTypeName } from '../utils/native/types.util';
import { MapPrimitiveService } from './map/map-primitive.service';
import { MapTupleService } from './map/map-tuple.service';
import { TargetService } from './targets/target.service';
import { isBracketed } from '../types/target/string/bracketed.type';
import { isAny, isNullOrUndefined } from '../utils/native/any.util';
import { MapArrayService } from './map/map-array.service';
import { isArrayType } from '../types/target/string/array-type.type';
import { MapComplexService } from './map/map-complex.service';
import { MapDeclarationService } from './map/map-declaration.service';
import { isQuoted } from '../types/target/string/quoted.type';
import { MapQuotedService } from './map/map-quoted.service';
import { CheckTargetsService } from './init/check-targets.service';
import { isStringAsNullOrLiteral } from '../types/literal.type';
import { MapNullOrLiteralService } from './map/map-null-or-literal.service';
import { isDateType, isDateTypeName } from '../utils/native/dates.util';
import { MapDateService } from './map/map-date.service';
import { isObjectLiteralType } from '../utils/native/objects.util';
import { MapObjectService } from './map/map-object.service';
import { isCurveBracketed } from '../types/target/string/curve-bracketed.type';
import { MapLiteralObjectService } from './map/map-literal-object.service';
import * as chalk from 'chalk';

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
    // TODO : isArray Option
    static async map<T>(target: Target<T>, data: any, options?: CreateOptions): Promise<T | T[] | Primitive | ArrayOfPrimitiveElements | Date | Date[] | object | object[]> {
        await InitService.start();
        if (!OptionsService.wasInitialized(options)) {
            options = OptionsService.initialize(options);
        }
        return await this.mapToString(target, data, options);
    }


    static async mapToString<T>(target: Target<T>, data: any, options?: CreateOptions): Promise<T | T[] | Primitive | ArrayOfPrimitiveElements | Date | Date[] | object | object[]> {
        return await this.mapString(TargetService.toString(target), data, options);
    }


    private static async mapString<T>(target: string, data: any, options?: CreateOptions): Promise<T | T[] | Primitive | ArrayOfPrimitiveElements | Date | Date[] | object | object[]> {
        // console.log(chalk.greenBright('STRING TARGTTTTTT'), target, data, (isNullOrUndefined(data) || isAny(target)), isDateTypeName(target), isStringAsNullOrLiteral(target),  isPrimitiveTypeName(target), isQuoted(target));
        await CheckTargetsService.start(target);
        if (isNullOrUndefined(data) || isAny(target)) {
            // console.log(chalk.magentaBright('HEEEEERE -2'), target);
            return data;
        } else if (isDateTypeName(target)) {
            // console.log(chalk.magentaBright('HEEEEERE -1'), target);
        // } else if (isDateType(target)) {
            return MapDateService.create(data);
        } else if (isStringAsNullOrLiteral(target)) {
            // console.log(chalk.magentaBright('HEEEEERE -0.5'), target);
            return MapNullOrLiteralService.create(target);
        } else if (isBracketed(target)) {
            // console.log(chalk.magentaBright('HEEEEERE 0'), target);
            return await MapTupleService.create(target, data, options)
        } else if (isArrayType(target)) {
            // console.log(chalk.magentaBright('HEEEEERE 1'), target);
            return await MapArrayService.create(target, data, options);
        } else if (isPrimitiveTypeName(target)) {
            // console.log(chalk.magentaBright('HEEEEERE 2'), target);
            return MapPrimitiveService.create([target, data], options);
        } else if (isQuoted(target)) {
            // console.log(chalk.magentaBright('HEEEEERE 3'), target);
            return await MapQuotedService.create(target, data, options);
        } else if (isObjectLiteralType(target)) {
            // console.log(chalk.magentaBright('HEEEEERE 4'), target);
            return MapLiteralObjectService.create(data);
        // } else if (isCurveBracketed(target)) {
        //     return await MapObjectService.create(target, data, options)
        } else if (hasDeclaration(target)) {
            // console.log(chalk.magentaBright('HEEEEERE 5'), target);
            return await MapDeclarationService.create(target, data, options);
        } else {
            // console.log(chalk.magentaBright('HEEEEERE 6'), target);
            return await MapComplexService.create(target, data, options);
        }
    }

}
