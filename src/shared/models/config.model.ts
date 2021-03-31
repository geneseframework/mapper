import { MapperBehavior } from './config-behavior.model';

/**
 * Part of the GeneseConfig corresponding to the @genese/mapper options
 */
export class MapperConfig {
    behavior?: MapperBehavior = new MapperBehavior();
    include?: string[] = [];
    tsConfigs?: string[] = [];
}
