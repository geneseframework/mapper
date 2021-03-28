import { CurvedBracketed } from '../../create/types/target/string/curve-bracketed.type';
import { InterfaceInfo } from '../../shared/models/declarations/interface-info.model';
import * as chalk from 'chalk';


export function getInterfaceInfoNameFromCurveBracketed(curveBracketed: CurvedBracketed, interfaceInfos: InterfaceInfo[]): string {
    console.log(chalk.blueBright('GET II CVBBBBBB'), curveBracketed);
    console.log(chalk.yellowBright('GET II IISSSS'), interfaceInfos[0]);
    console.log(chalk.yellowBright('GET II IISSSS'), interfaceInfos[1]);
    return curveBracketed;
}
