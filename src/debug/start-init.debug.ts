import { INIT } from '../init/const/init.const';
import { GLOBAL } from '../create/const/global.const';
import * as chalk from 'chalk';
import { ConfigService } from '../init/services/config.service';
import { DeclarationInfoService } from '../init/services/declaration-info.service';
import { InstanceGeneratorService } from '../init/services/instance-generator.service';
import { initPaths, initProject } from './init.debug';
import { MapperConfig } from '../shared/models/config.model';
import { InitService } from '../init/services/init.service';


INIT.debug = true;
GLOBAL.debug = true;

export async function init(): Promise<void> {
    console.log(chalk.blueBright('zzzzz'));
    initPaths();
    initProject();
    const mapperConfig: MapperConfig = await ConfigService.init();
    // INIT.debug ? this.initProject() : this.initRealProject();
    InitService.addConfigIncludedFiles(mapperConfig);
    await DeclarationInfoService.init();
    await InstanceGeneratorService.init();
}

init();
