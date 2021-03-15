import { InstanceGenerator } from './instance-generator.model';
import { ClassInfo } from './declarations/class-info.model';
import { isClassInfo, isEnumInfo, isInterfaceInfo, isTypeInfo } from '../utils/declaration-info.util';
import { EnumInfo } from './declarations/enum-info.model';
import { InterfaceInfo } from './declarations/interface-info.model';
import { TypeInfo } from './declarations/type-info.model';
import { DeclarationInfo } from './declarations/declaration-info.model';
import { geneseConfig } from '/Users/utilisateur/Documents/projets/genese/genesemapper/geneseconfig';



export class Global {

    checkedTargets: string[] = [];
    debug = false;
    declarationInfos: DeclarationInfo[] = [];
    generateInstance: <T>(instanceGenerator: InstanceGenerator<T>) => Promise<T>;
    geneseConfig: any = geneseConfig; // TODO: add type GeneseConfig
    start: number = undefined;
    wasInitialized: boolean = undefined;


    check(target: string): void {
        this.checkedTargets.push(target);
    }


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


    wasChecked(target: string): boolean {
        return this.checkedTargets.includes(target);
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


    log(message: string, value: any, predicate: boolean): void {
        if (predicate) {
            // console.log(chalk.yellowBright(message), value);
        }
    }

    logDuration(message: string, color: 'blueBright' | 'yellowBright' | 'magentaBright' | 'cyanBright' | 'greenBright' = 'blueBright'): void {
        // console.log(chalk[color](`${message} : TIME `), Date.now() - this.start);
    }

}



