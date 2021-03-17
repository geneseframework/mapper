import { MapperBehavior } from './config-behavior.model';

export class MapperConfig {
    behavior?: MapperBehavior = new MapperBehavior();
    include?: string[] = [];
    tsConfigPaths?: string[] = [];
    // throwTarget?: ThrowTargetError = new ThrowTargetError();
}
