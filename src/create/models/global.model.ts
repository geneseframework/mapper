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

    config: MapperConfig = undefined;               // The config of the user geneseconfig.ts file (found in the config.js file created during the init process)
    declarationInfos: DeclarationInfo[] = [];       // The declarationInfos used to create mapped objects (found in the declaration-infos.js file created during the init process)
    generateInstance: <T>(instanceGenerator: InstanceGenerator<T>) => T;    // The global method used to create instances of classes (the parameter instanceGenerator is found in the declaration-infos.js file)
    start: number = undefined;                      // Used in debug case to calculate duration of different processes
    wasInitialized: boolean = undefined;            // Checks if the create() method was already called (and so, if the global values were implemented)

    /**
     * Returns the ClassInfo corresponding to a given stringified target
     * @param target
     */
    getClassInfo(target: string): ClassInfo {
        return this.declarationInfos.find(d => isClassInfo(d) && d.name === target) as ClassInfo;
    }

    /**
     * Returns the DeclarationInfo corresponding to a given stringified target
     * @param target
     */
    getDeclarationInfo(target: string): DeclarationInfo {
        return this.declarationInfos.find(d => d.name === target);
    }

    /**
     * Returns the EnumInfo corresponding to a given stringified target
     * @param target
     */
    getEnumInfo(target: string): EnumInfo {
        return this.declarationInfos.find(d => isEnumInfo(d) && d.name === target) as EnumInfo;
    }

    /**
     * Returns the InterfaceInfo corresponding to a given stringified target
     * @param target
     */
    getInterfaceInfo(target: string): InterfaceInfo {
        return this.declarationInfos.find(d => isInterfaceInfo(d) && d.name === target) as InterfaceInfo;
    }

    /**
     * Returns the TypeInfo corresponding to a given stringified target
     * @param target
     */
    getTypeInfo(target: string): TypeInfo {
        return this.declarationInfos.find(d => isTypeInfo(d) && d.name === target) as TypeInfo;
    }

    /**
     * Get names of classes included in the declarationInfos array
     */
    get classNames(): string[] {
        return this.declarationInfos.filter(d => isClassInfo(d)).map(d => d.name);
    }

    /**
     * Get names of enums included in the declarationInfos array
     */
    get enumNames(): string[] {
        return this.declarationInfos.filter(d => d.kind === 'Enum').map(d => d.name);
    }

    /**
     * Get names of interfaces included in the declarationInfos array
     */
    get interfaceNames(): string[] {
        return this.declarationInfos.filter(d => d.kind === 'Interface').map(d => d.name);
    }

    /**
     * Get names of types included in the declarationInfos array
     */
    get typeNames(): string[] {
        return this.declarationInfos.filter(d => d.kind === 'TypeAlias').map(d => d.name);
    }

    /**
     * Debug method used to log duration of processes
     * @param message
     * @param color
     */
    logDuration(message: string, color: 'blueBright' | 'yellowBright' | 'magentaBright' | 'cyanBright' | 'greenBright' = 'blueBright'): void {
        // console.log(chalk[color](`${message} : TIME `), Date.now() - this.start);
    }

}



