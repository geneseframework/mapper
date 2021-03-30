import { isParenthesized } from '../../types/target/string/parenthesis.type';
import { hasUnion, Union } from '../../types/target/string/union.type';
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
import * as chalk from 'chalk';
import { hasIntersection, Intersection } from '../../types/target/string/intersection.type';

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

        } else if (hasUnion(target)) {
            return this.mapUnionType(target, data, options, first, others);
        } else if (hasIntersection(target)) {
            return this.mapIntersectionType(target, data, options, first, others);
        } else if (isGeneric(target)) {
            return MapGenericService.create(target, data, options);
        } else {
            throwWarning(`unknown target "${target}". @genese/mapper interpreted it as "any" and data will be set "as is" in the mapped response.`)
        }
    }


    private static mapUnionType(target: Union, data: any, options: MapperBehavior, first: string, others: string): any {
        if (isStringAsNumericOrStringifiedNullOrBoolean(first)) {
            return this.mapNumericOrStringifiedNullOrBoolean(data, options, first, others);
        }
        const mapped: any = MainService.mapStringTarget(first, data, options);
        // TODO: implement behavior if mapped is defined but could be defined too in the other parts of the union type
        return mapped || MainService.mapStringTarget(others, data, options);
    }


    private static mapNumericOrStringifiedNullOrBoolean(data: any, options: MapperBehavior, first: NumericOrStringifiedNullOrBoolean, others: string): any {
        if (first === data?.toString()) {
            return !options.castStringsAndNumbers && isString(data) ? undefined : data;
        } else if (isStringAsNumericOrStringifiedNullOrBoolean(others)) {
            return !options.castStringsAndNumbers && isString(data) ? undefined : data;
        } else {
            return MainService.mapStringTarget(others, data, options);
        }
    }


    private static mapIntersectionType(target: Intersection, data: any, options: MapperBehavior, first: string, others: string): any {
        const left: any = MainService.mapStringTarget(first, data, options);
        const right: any = MainService.mapStringTarget(others, data, options);
// TODO: implement behavior if mapped is defined but could be defined too in the other parts of the union type
        return left && right ? data : undefined;
    }

}
