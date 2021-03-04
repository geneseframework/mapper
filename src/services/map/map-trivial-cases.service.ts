import { Target } from '../../types/target/target.type';
import { TargetInfo } from '../../types/target/target-info.type';
import { isNullOrUndefined } from '../../utils/native/any.util';
import { isDateOrDatesArrayType } from '../../utils/native/dates.util';
import { ArrayOfPrimitiveElements, Primitive, PrimitiveType } from '../../types/primitives.type';
import { TupleOld } from '../../types/target/target-tuple-old.type';
import { MapTupleServiceOld } from './map-tuple.service.old';
import { MapObjectService } from './map-object.service';
import { MapPrimitiveServiceOld } from './map-primitive.service.old';
import { MapDateService } from './map-date.service';
import { TargetServiceOld } from '../targets/target.service.old';
import * as chalk from 'chalk';
import { CreateOptions } from '../../models/create-options.model';
import { isPrimitiveOrPrimitivesArray } from '../../utils/native/primitives.util';

export class MapTrivialCasesService {


    static isTrivialCase<T>(target: Target<T>, data: any): boolean {
        const info: TargetInfo = TargetServiceOld.getInfo(target);
        if (TargetServiceOld.isTuple(target)) {
            return false;
        }
        return isNullOrUndefined(data)
            || TargetServiceOld.isObjectOrObjectsArray(target)
            || isPrimitiveOrPrimitivesArray(info.typeName)
            || isDateOrDatesArrayType(info.typeName);
    }


    static mapTrivialCase(target: Target<any>, data: any, options: CreateOptions): Primitive | ArrayOfPrimitiveElements | Promise<TupleOld> | Date | Date[] | object | object[] {
        if (isNullOrUndefined(data)) {
            return data;
        } else if (TargetServiceOld.isTuple(target)) {
            console.log(chalk.redBright('SHOULD NEVER ENTER HERRRE'), target, data);
            return MapTupleServiceOld.create(data, target as TupleOld, options);
        }
        const info: TargetInfo = TargetServiceOld.getInfo(target);
        if (TargetServiceOld.isObjectOrObjectsArray(target)) {
            return MapObjectService.create(data, info);
        } else if (isPrimitiveOrPrimitivesArray(info.typeName)) {
            return MapPrimitiveServiceOld.create(data, info.typeName as PrimitiveType, info.isArray, options);
        } else if (isDateOrDatesArrayType(info.typeName)) {
            return MapDateService.createDates(data, info.isArray);
        }
    }

}
