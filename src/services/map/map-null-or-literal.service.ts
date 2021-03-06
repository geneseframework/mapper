import { NullOrLiteral } from '../../types/null-or-literal.type';

export class MapNullOrLiteralService {


    static create(target: string): NullOrLiteral {
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

