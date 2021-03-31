import { MapperConfig } from '../../shared/models/config.model';
import { InstanceGenerator } from '../../shared/models/instance-generator.model';
import { ClassInfo } from '../../shared/models/declarations/class-info.model';
import { DeclarationInfo } from '../../shared/models/declarations/declaration-info.model';
import { isClassInfo, isEnumInfo, isInterfaceInfo, isTypeInfo } from '../../shared/utils/declaration-info.util';
import { EnumInfo } from '../../shared/models/declarations/enum-info.model';
import { InterfaceInfo } from '../../shared/models/declarations/interface-info.model';
import { TypeInfo } from '../../shared/models/declarations/type-info.model';


/**
 * The global elements used during the create() process
 */
export class Global {

    config: MapperConfig = undefined;               // The config coming from the user geneseconfig.ts file and found from the config.js file created during the init process
    debug = false;
    declarationInfos: DeclarationInfo[] = [];
    generateInstance: <T>(instanceGenerator: InstanceGenerator<T>) => T;
    start: number = undefined;
    wasInitialized: boolean = undefined;


    getClassInfo(target: string): ClassInfo {
        return this.declarationInfos.find(d => isClassInfo(d) && d.name === target) as ClassInfo;
    }


    getDeclarationInfo(target: string): DeclarationInfo {
        return this.declarationInfos.find(d => d.name === target);
    }


    getEnumInfo(target: string): EnumInfo {
        return this.declarationInfos.find(d => isEnumInfo(d) && d.name === target) as EnumInfo;
    }


    getInterfaceInfo(target: string): InterfaceInfo {
        return this.declarationInfos.find(d => isInterfaceInfo(d) && d.name === target) as InterfaceInfo;
    }


    getTypeInfo(target: string): TypeInfo {
        return this.declarationInfos.find(d => isTypeInfo(d) && d.name === target) as TypeInfo;
    }


    get classNames(): string[] {
        return this.declarationInfos.filter(d => isClassInfo(d)).map(d => d.name);
    }


    get enumNames(): string[] {
        return this.declarationInfos.filter(d => d.kind === 'Enum').map(d => d.name);
    }


    get interfaceNames(): string[] {
        return this.declarationInfos.filter(d => d.kind === 'Interface').map(d => d.name);
    }


    get typeNames(): string[] {
        return this.declarationInfos.filter(d => d.kind === 'TypeAlias').map(d => d.name);
    }

    logDuration(message: string, color: 'blueBright' | 'yellowBright' | 'magentaBright' | 'cyanBright' | 'greenBright' = 'blueBright'): void {
        // console.log(chalk[color](`${message} : TIME `), Date.now() - this.start);
    }

}



