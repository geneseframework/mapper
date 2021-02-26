import { Config } from '../models/config.model';

export const CONFIG: Config = new Config();

CONFIG.createOptions = {
    differentiateStringsAndNumbers: undefined
}
