import { ThrowTargetError } from './throw-target-error.model';

export class CreateOptions {
    differentiateStringsAndNumbers ?= true;
    isArray ?= false;
    throwTarget?: ThrowTargetError = new ThrowTargetError();
}
