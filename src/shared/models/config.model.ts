import { ConfigBehavior } from './config-behavior.model';

export class Config {
    behavior?: ConfigBehavior = new ConfigBehavior();
    include?: string[] = [];
    tsConfigPaths?: string[] = [];
    // throwTarget?: ThrowTargetError = new ThrowTargetError();
}
