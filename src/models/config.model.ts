import { CreateOptions } from './create-options.model';
import { ThrowOption } from '../enums/throw-option.enum';

export class Config {
    create?: CreateOptions = {
        differentiateStringsAndNumbers: true,
        throw: ThrowOption.WARNING
    };
}
