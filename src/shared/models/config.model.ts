import { ThrowTargetError } from './throw-target.model';

export class Config {
    differentiateStringsAndNumbers ?= true;
    isArray ?= false;
    throwTarget?: ThrowTargetError = new ThrowTargetError();
}
