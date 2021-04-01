import { MapperBehavior } from './config-behavior.model';

/**
 * Part of the GeneseConfig relative to the @genese/mapper options
 */
export class MapperConfig {
    behavior?: MapperBehavior = new MapperBehavior();
    include?: string[] = [];
    tsConfigs?: string[] = [];
}
