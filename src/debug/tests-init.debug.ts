import { INIT } from '../init/const/init.const';
import { Project } from 'ts-morph';


/**
 * Creates the Project and the Instance Generator file when it's the first time that @genese/mapper is called.
 * @private
 */
export function initPaths(): void {
    INIT.projectPath = `${process.cwd()}/src/debug/project`;
    INIT.nodeModulePath = process.cwd();
}


export function initProject(): void {
    INIT.project = new Project({
        tsConfigFilePath: INIT.configFilePath,
        skipFileDependencyResolution: true
    });
    INIT.project.addSourceFilesAtPaths(`${INIT.projectPath}/src/debug/**/*{.d.ts,.ts}`);
    const distPath = process.cwd() + '/src/dist';
    INIT.project.addSourceFilesAtPaths(`${distPath}/*{.d.ts,.ts}`);
    INIT.nodeModulePath = process.cwd();
}

