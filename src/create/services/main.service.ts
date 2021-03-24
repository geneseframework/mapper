import { Target } from '../types/target/target.type';
import { ArrayOfPrimitiveElements, Primitive } from '../types/primitives.type';
import { OptionsService } from './options.service';
import { isPrimitiveTypeName } from '../utils/native/types.util';
import { MapPrimitiveService } from './map/map-primitive.service';
import { MapTupleService } from './map/map-tuple.service';
import { TargetService } from './target.service';
import { isBracketed } from '../types/target/string/bracketed.type';
import { MapArrayService } from './map/map-array.service';
import { isArrayType } from '../types/target/string/array-type.type';
import { MapComplexService } from './map/map-complex.service';
import { MapDeclarationService } from './map/map-declaration.service';
import { isQuoted } from '../../shared/types/quoted.type';
import { MapQuotedService } from './map/map-quoted.service';
import { CheckTargetsService } from './check-targets.service';
import { isStringAsNullOrLiteralOrNumeric } from '../types/null-or-literal.type';
import { MapNullOrLiteralService } from './map/map-null-or-literal.service';
import { isDateTypeName } from '../utils/native/dates.util';
import { MapDateService } from './map/map-date.service';
import { isObjectType } from '../utils/native/objects.util';
import { MapObjectTypeService } from './map/map-object-type.service';
import { GLOBAL } from '../const/global.const';
import { throwWarning } from '../utils/errors.util';
import { hasDeclaration } from '../utils/global.util';
import { GlobalInitService } from './global-init.service';
import { MapObjectService } from './map/map-object.service';
import { isCurveBracketed } from '../types/target/string/curve-bracketed.type';
import { MapperBehavior } from '../../shared/models/config-behavior.model';
import { isWildCard } from '../types/target/string/wildcard.type';
import { isNullOrUndefined } from '../types/null-or-undefined.type';
import { isComplexType } from '../types/target/string/complex-type.type';

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
        if (!OptionsService.wasInitialized(options)) {
            options = OptionsService.initialize(options);
        }
        return this.mapStringTarget<T>(TargetService.stringify(target), data, options);
    }


    /**
     * Returns the data formatted with the type defined by a stringified type
     * @param target
     * @param data
     * @param options
     */
    static mapStringTarget<T>(target: string, data: any, options?: MapperBehavior): T | T[] | Primitive | ArrayOfPrimitiveElements | Date | Date[] | object | object[] {
        CheckTargetsService.start(target);
        if (isNullOrUndefined(data) || isWildCard(target)) {
            return data;
        } else if (isDateTypeName(target)) {
            return MapDateService.create(data);
        } else if (isStringAsNullOrLiteralOrNumeric(target)) {
            return MapNullOrLiteralService.create(target);
        } else if (isBracketed(target)) {
            return MapTupleService.create(target, data, options)
        } else if (isArrayType(target)) {
            return MapArrayService.create(target, data, options);
        } else if (isPrimitiveTypeName(target)) {
            return MapPrimitiveService.create(target, data, options);
        } else if (isQuoted(target)) {
            return MapQuotedService.create(target, data, options);
        } else if (isObjectType(target)) {
            return MapObjectTypeService.create(data);
        } else if (isCurveBracketed(target)) {
            return MapObjectService.create(target, data, options)
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
