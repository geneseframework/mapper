import { CreateOptions } from '../../models/create-options.model';
import { isParenthesized } from '../../types/target/string/parenthesis.type';
import { isUnion } from '../../types/target/string/union.type';
import { MainService } from '../main.service';
import { getElements, trimTarget } from '../../utils/target.util';
import { CheckTargetsService } from '../init/check-targets.service';

export class MapComplexService {

    static async create<T>(target: string, data: any, options: CreateOptions): Promise<any> {
        const elements: string[] = getElements(target);
        const first: string = elements[0].trim();
        const others: string = trimTarget(target.slice(first.length));
        if (isParenthesized(target)) {

        } else if (isUnion(target)) {
            const mapped: any = await MainService.mapToString(first, data, options);
            return mapped ?? await MainService.mapToString(others, data, options);
        } else {
            return CheckTargetsService.throwTarget(target, data, options);
        }
    }
}
