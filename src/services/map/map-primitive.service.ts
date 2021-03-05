import { Primitive, PrimitiveType } from '../../types/primitives.type';
import { CreateOptions } from '../../models/create-options.model';
import { PrimitiveAny } from '../../types/target/string/primitive-any.type';
import { castStringAndNumbers } from '../../utils/native/primitives.util';
import * as chalk from 'chalk';

export class MapPrimitiveService {


    static create([target, data]: PrimitiveAny, options: CreateOptions): Primitive {
            return this.createElement(data, target, options);
    }


    private static createElement(data: any, typeName: PrimitiveType, options: CreateOptions): Primitive {
        if (data === null) {
            return null;
        }
        console.log(chalk.blueBright('CREATE ELTTTTT'), data, typeName, options, this.haveSameType(data, typeName, options));
        return this.haveSameType(data, typeName, options) ? castStringAndNumbers(typeName, data) : undefined;
    }


    private static haveSameType(data: any, typeName: PrimitiveType, options: CreateOptions): boolean {
        return typeof data === typeName?.toLowerCase()
            || (typeof data === 'string' && typeName?.toLowerCase() === 'number' && options.differentiateStringsAndNumbers === false)
            || (typeof data === 'number' && typeName?.toLowerCase() === 'string' && options.differentiateStringsAndNumbers === false);
    }

}
