import { INIT } from '../init/const/init.const';
import { GLOBAL } from '../create/const/global.const';
import * as chalk from 'chalk';
import { ConfigService } from '../init/services/config.service';
import { DeclarationInfoService } from '../init/services/declaration-info.service';
import { InstanceGeneratorService } from '../init/services/instance-generator.service';
import { initPaths, initProject } from './tests-init.debug';
import { MapperConfig } from '../shared/models/config.model';


INIT.debug = true;
GLOBAL.debug = true;

export async function init(): Promise<void> {
    initPaths();
    await initProject();
    const mapperConfig: MapperConfig = await ConfigService.init();
    ConfigService.addConfigFilesToProject(mapperConfig);
    await DeclarationInfoService.init();
    await InstanceGeneratorService.init();
}

init();
