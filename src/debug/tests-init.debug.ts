import { INIT } from '../init/const/init.const';
import { Project } from 'ts-morph';
import { ConfigService } from '../init/services/config.service';
import { MapperConfig } from '../shared/models/config.model';


/**
 * Creates the Project and the Instance Generator file when it's the first time that @genese/mapper is called.
 * @private
 */
export function initPaths(): void {
    INIT.projectPath = `${process.cwd()}/src/debug/project`;
    INIT.nodeModulePath = process.cwd();
}


export async function initProject(): Promise<void> {
    INIT.project = new Project({skipFileDependencyResolution: true});
    const mapperConfig: MapperConfig = await ConfigService.setConfig();
    ConfigService.addConfigFilesToProject(mapperConfig);
    INIT.project.addSourceFilesAtPaths(`${INIT.projectPath}/src/debug/**/*{.d.ts,.ts}`);
    const distPath = process.cwd() + '/src/dist';
    INIT.project.addSourceFilesAtPaths(`${distPath}/*{.d.ts,.ts}`);
    INIT.nodeModulePath = process.cwd();
}

