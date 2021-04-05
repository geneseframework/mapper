import { isParenthesized } from '../../types/containers/parenthesis.type';
import { MainService } from '../main.service';
import { getElements, trimSeparators } from '../../utils/target.util';
import {
    isStringAsNumericOrStringifiedNullOrBoolean,
    NumericOrStringifiedNullOrBoolean
} from '../../types/trivial-types/null-or-literal.type';
import { MapGenericService } from './map-generic.service';
import { ComplexType } from '../../types/non-trivial-types/complex-type.type';
import { hasUnion } from '../../types/non-trivial-types/union.type';
import { hasIntersection } from '../../types/non-trivial-types/intersection.type';
import { isGeneric } from '../../types/non-trivial-types/generics.type';
import { isString, MapperConfigBehavior, throwWarning } from '@genese/core';
import { MapResponse } from '../../models/map-response.model';
import { INVALID_RESPONSE } from '../../const/invalid-response.const';
import * as chalk from 'chalk';

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
    static create(target: ComplexType, data: any, options: MapperConfigBehavior): MapResponse {
        const elements: string[] = getElements(target);
        const first: string = elements[0].trim();
        const others: string = trimSeparators(target.slice(first.length));
        console.log(chalk.yellowBright('MAP CPXXXXXX'), target, data);
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
    private static mapUnionType(data: any, options: MapperConfigBehavior, first: string, others: string): MapResponse {
        console.log(chalk.blueBright('MAP UNIONNNN'), data, first, others);
        if (isStringAsNumericOrStringifiedNullOrBoolean(first)) {
            return this.mapNumericOrStringifiedNullOrBoolean(data, options, first, others);
        }
        const mapped: MapResponse = MainService.mapStringTarget(first, data, options);
        console.log(chalk.blueBright('MAP UNIONNNN MAPPPED'), mapped);
        return mapped?.isValid ? mapped : MainService.mapStringTarget(others, data, options);
    }

    /**
     * Returns mapped value in case of Union types which have the first element of the union which is numeric string, 'null' or 'boolean' maps
     * @param data      // The data to map
     * @param options   // The create() options
     * @param first     // The first element of the union
     * @param others    // The other elements of the union
     * @private
     */
    private static mapNumericOrStringifiedNullOrBoolean(data: any, options: MapperConfigBehavior, first: NumericOrStringifiedNullOrBoolean, others: string): MapResponse {
        if (first === data?.toString()) {
            return !options.castStringsAndNumbers && isString(data) ? INVALID_RESPONSE : new MapResponse(data);
        } else if (isStringAsNumericOrStringifiedNullOrBoolean(others)) {
            return !options.castStringsAndNumbers && isString(data) ? INVALID_RESPONSE : new MapResponse(data);
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
    private static mapIntersectionType(data: any, options: MapperConfigBehavior, first: string, others: string): MapResponse {
        const left: any = MainService.mapStringTarget(first, data, options);
        const right: any = MainService.mapStringTarget(others, data, options);
        return left && right ? new MapResponse(data) : INVALID_RESPONSE;
    }

}
