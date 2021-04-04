import { ArrayOfPrimitiveElements, isPrimitiveType, Primitive } from '../types/trivial-types/primitives.type';
import { OptionsService } from './options.service';
import { MapPrimitiveService } from './map/map-primitive.service';
import { MapTupleService } from './map/map-tuple.service';
import { TargetService } from './target.service';
import { isBracketed } from '../types/containers/bracketed.type';
import { MapArrayService } from './map/map-array.service';
import { MapComplexService } from './map/map-complex.service';
import { MapDeclarationService } from './map/map-declaration.service';
import { isQuoted } from '../../shared/types/quoted.type';
import { MapQuotedService } from './map/map-quoted.service';
import { CheckTargetsService } from './check-targets.service';
import { isStringAsNumericOrStringifiedNullOrBoolean } from '../types/trivial-types/null-or-literal.type';
import { MapNullOrLiteralService } from './map/map-null-or-literal.service';
import { MapDateService } from './map/map-date.service';
import { GLOBAL } from '../const/global.const';
import { hasDeclaration } from '../utils/global.util';
import { GlobalInitService } from './global-init.service';
import { MapperBehavior } from '../../shared/models/config-behavior.model';
import { isNullOrUndefined } from '../types/trivial-types/null-or-undefined.type';
import { MapObjectTypeService } from './map/map-object-type.service';
import { Target } from '../types/others/target.type';
import { isWildCard } from '../types/non-trivial-types/wildcard.type';
import { isArrayType } from '../types/non-trivial-types/array-type.type';
import { isComplexType } from '../types/non-trivial-types/complex-type.type';
import { isDateTypeName, isObjectType, throwWarning } from '@genese/core';

export class MainService {

    /**
     * - If not already done, initializes the global configuration.
     * - Returns the data formatted with the type required by the user
     * @param target    // The type required by the user.
     * @param data      // Data to map
     * @param options   // Behavior options for this call to the create() method
     */
    static map<T>(target: Target<T>, data: any, options?: MapperBehavior): T | T[] | Primitive | ArrayOfPrimitiveElements | Date | Date[] | object | object[] {
        GLOBAL.start = Date.now();
        GlobalInitService.start();
        options = OptionsService.initialize(options);
        return this.mapStringTarget(TargetService.stringify(target), data, options);
    }


    /**
     * Returns the data formatted with the type defined by a stringified type
     * @param target
     * @param data
     * @param options
     */
    static mapStringTarget(target: string, data: any, options?: MapperBehavior): any {
        CheckTargetsService.start(target);
        if (isNullOrUndefined(data) || isWildCard(target)) {
            return data;
        } else if (isDateTypeName(target)) {
            return MapDateService.create(data);
        } else if (isStringAsNumericOrStringifiedNullOrBoolean(target)) {
            return MapNullOrLiteralService.create(target);
        } else if (isBracketed(target)) {
            return MapTupleService.create(target, data, options)
        } else if (isArrayType(target)) {
            return MapArrayService.create(target, data, options);
        } else if (isPrimitiveType(target)) {
            return MapPrimitiveService.create(target, data, options);
        } else if (isQuoted(target)) {
            return MapQuotedService.create(target, data, options);
        } else if (isObjectType(target)) {
            return MapObjectTypeService.create(data);
        } else if (hasDeclaration(target)) {
            return MapDeclarationService.create(target, data, options);
        } else if (isComplexType(target)) {
            return MapComplexService.create(target, data, options);
            // } else if ( isDeclaredOutOfProjectAddItToGlobal(target)) { // TODO
            //     return MapOutOfProjectService.create(target, data, options);
        } else {
            throwWarning(`type not found : "${target}". @genese/mapper interpreted it as "any" by default.`);
            return data;
        }
    }

}
