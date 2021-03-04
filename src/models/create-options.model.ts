import { ThrowOption } from '../enums/throw-option.enum';

export class CreateOptions {
    differentiateStringsAndNumbers ?= true;
    isArray ?= false;
    throw?: ThrowOption = ThrowOption.WARNING;
}
