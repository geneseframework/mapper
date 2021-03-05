import { NullOrLiteral } from '../../types/literal.type';

export class MapNullOrLiteralService {


    static async create(target: string): Promise<NullOrLiteral> {
        if (target === 'null') {
            return null;
        } else if (target === 'true') {
            return true;
        } else if (target === 'false') {
            return false;
        } else if (!isNaN(Number(target))) {
            return Number(target);
        } else {
            return target;
        }
    }
}

