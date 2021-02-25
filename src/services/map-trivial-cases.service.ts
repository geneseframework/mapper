import { Target } from '../types/target.type';
import { TargetInfo } from '../types/target-info.type';
import { isNullOrUndefined } from '../utils/any.util';
import { isPrimitiveOrPrimitivesArray } from '../utils/primitives.util';
import { isDateOrDatesArrayType } from '../utils/dates.util';
import { ArrayOfPrimitiveElements, PrimitiveElement, PrimitiveType } from '../types/primitives.type';
import { Tuple } from '../types/tuple.type';
import { MapTupleService } from './map-tuple.service';
import { MapObjectService } from './map-object.service';
import { MapPrimitiveService } from './map-primitive.service';
import { MapDateService } from './map-date.service';
import { TargetService } from './target.service';
import * as chalk from 'chalk';

export class MapTrivialCasesService {


    static isTrivialCase<T>(target: Target<T>, data: any): boolean {
        const info: TargetInfo = TargetService.getInfo(target);
        console.log(chalk.magentaBright('TargetService.isObjectOrObjectsArray(target))))'), target, target === [Object], TargetService.isObjectOrObjectsArray(target));
        return isNullOrUndefined(data)
            || TargetService.isObjectOrObjectsArray(target)
            || isPrimitiveOrPrimitivesArray(info.typeName)
            || isDateOrDatesArrayType(info.typeName);
    }


    static mapTrivialCase(target: Target<any>, data: any): PrimitiveElement | ArrayOfPrimitiveElements | Promise<Tuple> | Date | Date[] | object | object[] {
        if (isNullOrUndefined(data)) {
            return data;
        } else if (TargetService.isTuple(target)) {
            return MapTupleService.create(data, target as Tuple);
        }
        const info: TargetInfo = TargetService.getInfo(target);
        if (TargetService.isObjectOrObjectsArray(target)) {
            return MapObjectService.create(data, info);
        } else if (isPrimitiveOrPrimitivesArray(info.typeName)) {
            return MapPrimitiveService.create(data, info.typeName as PrimitiveType, info.isArray);
        } else if (isDateOrDatesArrayType(info.typeName)) {
            return MapDateService.createDates(data, info.isArray);
        }
    }

}
