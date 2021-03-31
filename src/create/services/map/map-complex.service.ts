import { isParenthesized } from '../../types/target/string/parenthesis.type';
import { hasUnion } from '../../types/target/string/union.type';
import { MainService } from '../main.service';
import { getElements, trimSeparators } from '../../utils/target.util';
import {
    isStringAsNumericOrStringifiedNullOrBoolean,
    NumericOrStringifiedNullOrBoolean
} from '../../types/null-or-literal.type';
import { isString } from '../../utils/native/strings.util';
import { throwWarning } from '../../utils/errors.util';
import { MapperBehavior } from '../../../shared/models/config-behavior.model';
import { isGeneric } from '../../types/target/string/generics.type';
import { MapGenericService } from './map-generic.service';
import { ComplexType } from '../../types/target/string/complex-type.type';
import { hasIntersection } from '../../types/target/string/intersection.type';

/**
 * Service used in case of non-trivial stringified types
 */
export class MapComplexService {

    /**
     *
     * @param target    // The target with a complex format (generics, unions, intersections, etc.)
     * @param data      // The data to map
     * @param options   // The create() options
     */
    static create(target: ComplexType, data: any, options: MapperBehavior): any {
        const elements: string[] = getElements(target);
        const first: string = elements[0].trim();
        const others: string = trimSeparators(target.slice(first.length));
        if (isParenthesized(target)) {
            // TODO
        } else if (hasUnion(target)) {
            return this.mapUnionType(data, options, first, others);
        } else if (hasIntersection(target)) {
            return this.mapIntersectionType(data, options, first, others);
        } else if (isGeneric(target)) {
            return MapGenericService.create(target, data, options);
        } else {
            throwWarning(`unknown target "${target}". @genese/mapper interpreted it as "any" and data will be set "as is" in the mapped response.`)
        }
    }

    /**
     * Returns mapped value in case of Union types
     * @param data      // The data to map
     * @param options   // The create() options
     * @param first     // The first element of the union
     * @param others    // The other elements of the union
     * @private
     */
    private static mapUnionType(data: any, options: MapperBehavior, first: string, others: string): any {
        if (isStringAsNumericOrStringifiedNullOrBoolean(first)) {
            return this.mapNumericOrStringifiedNullOrBoolean(data, options, first, others);
        }
        const mapped: any = MainService.mapStringTarget(first, data, options);
        return mapped || MainService.mapStringTarget(others, data, options);
    }

    /**
     * Returns mapped value in case of Union types which have the first element of the union which is numeric string, 'null' or 'boolean' maps
     * @param data      // The data to map
     * @param options   // The create() options
     * @param first     // The first element of the union
     * @param others    // The other elements of the union
     * @private
     */
    private static mapNumericOrStringifiedNullOrBoolean(data: any, options: MapperBehavior, first: NumericOrStringifiedNullOrBoolean, others: string): any {
        if (first === data?.toString()) {
            return !options.castStringsAndNumbers && isString(data) ? undefined : data;
        } else if (isStringAsNumericOrStringifiedNullOrBoolean(others)) {
            return !options.castStringsAndNumbers && isString(data) ? undefined : data;
        } else {
            return MainService.mapStringTarget(others, data, options);
        }
    }

    /**
     * Returns mapped value in case of Intersection types
     * @param data      // The data to map
     * @param options   // The create() options
     * @param first     // The first element of the union
     * @param others    // The other elements of the union
     * @private
     */
    private static mapIntersectionType(data: any, options: MapperBehavior, first: string, others: string): any {
        const left: any = MainService.mapStringTarget(first, data, options);
        const right: any = MainService.mapStringTarget(others, data, options);
        return left && right ? data : undefined;
    }

}
