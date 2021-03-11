import { Target } from '../types/target/target.type';
import { CreateOptions } from '../models/create-options.model';
import { ArrayOfPrimitiveElements, Primitive } from '../types/primitives.type';
import { OptionsService } from './options.service';
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
import { CheckTargetsService } from '../init/check-targets.service';
import { isStringAsNullOrLiteral } from '../types/null-or-literal.type';
import { MapNullOrLiteralService } from './map/map-null-or-literal.service';
import { isDateTypeName } from '../utils/native/dates.util';
import { MapDateService } from './map/map-date.service';
import { isObjectLiteralType } from '../utils/native/objects.util';
import { MapLiteralObjectService } from './map/map-literal-object.service';
import { GLOBAL } from '../const/global.const';
import { hasSeparators } from '../types/target/string/has-separators.type';
import { throwWarning } from '../utils/errors.util';
import { hasGeneric } from '../types/target/string/generics.type';
import { MapGenericService } from './map/map-generic.service';
import { INIT } from '../init/init.const';

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
        GLOBAL.start = Date.now();
        GLOBAL.declarationInfos = INIT.declarationInfos;
        GLOBAL.generateInstance = INIT.generateInstance;
        // GLOBAL.logDuration(`START OF MAPPING PROCESS FOR ${target}`, 'yellowBright');
        // await InitService.start();
        if (!OptionsService.wasInitialized(options)) {
            options = OptionsService.initialize(options);
        }
        return await this.mapToString<T>(target, data, options);
    }


    static async mapToString<T>(target: Target<T>, data: any, options?: CreateOptions): Promise<T | T[] | Primitive | ArrayOfPrimitiveElements | Date | Date[] | object | object[]> {
        return await this.mapString(TargetService.toString(target), data, options);
    }


    // TODO : enums
    private static async mapString<T>(target: string, data: any, options?: CreateOptions): Promise<T | T[] | Primitive | ArrayOfPrimitiveElements | Date | Date[] | object | object[]> {
        // GLOBAL.logDuration(`MAPS ${target}`, 'magentaBright');
        // console.log(chalk.greenBright('MAP STRRRRR'), target, data);
        await CheckTargetsService.start(target);
        if (isNullOrUndefined(data) || isAny(target)) {
            return data;
        } else if (isDateTypeName(target)) {
            return MapDateService.create(data);
        } else if (isStringAsNullOrLiteral(target)) {
            return MapNullOrLiteralService.create(target);
        } else if (isBracketed(target)) {
            return await MapTupleService.create(target, data, options)
        } else if (isArrayType(target)) {
            return await MapArrayService.create(target, data, options);
        } else if (hasGeneric(target)) {
            return await MapGenericService.create(target, data, options);
        } else if (isPrimitiveTypeName(target)) {
            return MapPrimitiveService.create(target, data, options);
        } else if (isQuoted(target)) {
            return await MapQuotedService.create(target, data, options);
        } else if (isObjectLiteralType(target)) {
            return MapLiteralObjectService.create(data);
        // } else if (isCurveBracketed(target)) {
        //     return await MapObjectService.createOld(target, data, options)
        } else if (hasDeclaration(target)) {
            return await MapDeclarationService.create(target, data, options);
        } else if (hasSeparators(target)) {
            return await MapComplexService.create(target, data, options);
        // } else if (await isDeclaredOutOfProjectAddItToGlobal(target)) {
        //     return await MapOutOfProjectService.create(target, data, options);
        } else {
            // TODO : finish to implement
            throwWarning(`type not found : "${target}".`);
            return await MapComplexService.create(target, data, options);
            // return throwTarget(target, data, options);
        }
    }

}
