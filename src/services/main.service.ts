import { Target } from '../types/target/target.type';
import { CreateOptions } from '../interfaces/create-options.interface';
import { ArrayOfPrimitiveElements, Primitive } from '../types/primitives.type';
import { TupleOld } from '../types/target/target-tuple-old.type';
import { OptionsService } from './options.service';
import { InitService } from './init/init.service';
import { hasDeclaration } from '../utils/ast/ast-declaration.util';
import * as chalk from 'chalk';
import { isPrimitiveTypeName } from '../utils/native/types.util';
import { MapPrimitiveService } from './map/map-primitive.service';
import { MapTupleService } from './map/map-tuple.service';
import { TargetService } from './targets/target.service';
import { isBracketed } from '../types/target/string/bracketed.type';
import { isNullOrUndefined } from '../utils/native/any.util';
import { MapArrayService } from './map/map-array.service';
import { isArrayType } from '../types/target/string/array-type.type';
import { MapComplexService } from './map/map-complex.service';
import { MapDeclarationService } from './map/map-declaration.service';

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
    static async map<T>(target: Target<T>, data: any, options?: CreateOptions): Promise<T | T[] | Primitive | ArrayOfPrimitiveElements | TupleOld | Date | Date[] | object | object[]> {
        await InitService.start();
        if (!OptionsService.wasInitialized(options)) {
            options = OptionsService.initialize(options);
        }
        return await this.mapString(TargetService.toString(target), data, options);
    }


    static async mapString<T>(target: string, data: any, options?: CreateOptions): Promise<T | T[] | Primitive | ArrayOfPrimitiveElements | TupleOld | Date | Date[] | object | object[]> {
        // console.log(chalk.yellowBright('STRING TARGTTTTTT'), target, data);
        if (isNullOrUndefined(data)) {
            return data;
        } else if (isBracketed(target)) {
            return await MapTupleService.create(target, data, options)
        } else if (isArrayType(target)) {
            return await MapArrayService.create(target, data, options);
        } else if (isPrimitiveTypeName(target)) {
            return MapPrimitiveService.create([target, data], options);
        } else if (hasDeclaration(target)) {
            return await MapDeclarationService.create(target, data, options);
        } else {
            return await MapComplexService.create(target, data, options);
            // // TODO: change in throwError
            // throwWarning(`Warning: type of target not found :`, target)
            // return undefined;
        }
    }


}
