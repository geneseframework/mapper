import { Node } from 'ts-morph';
import * as chalk from 'chalk';


export function getApparentType(node: Node): string {
    // console.log(chalk.blueBright('APPARENT TYPEEEEE nodeeeee'), node.getSourceFile()?.getFilePath(), node.getKindName());
    // console.log(chalk.cyanBright('APPARENT TYPEEEEE apt ty'), node.getType().getApparentType().getText());
    // const zzz = node.getType().getApparentType().getSymbol().getDeclarations().map(d => d.getSourceFile().getFilePath())?.[0];
    // console.log(chalk.blueBright('APPARENT TYPEEEEE'), zzz);
    // console.log(chalk.blueBright('APPARENT TYPEEEEE'), zzz.getText());
    return node.getType().getApparentType().getText();
    // return zzz;
}
