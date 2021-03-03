import { Union } from './union.type';
import { Intersection } from './intersection.type';
import { Commas } from './commas.type';
import { SemiColumn } from './semi-column.type';
import { Interrogation } from './interrogation.type';
import * as chalk from 'chalk';

export type HasSeparators = Union | Intersection | Commas | Interrogation | SemiColumn;

export function hasSeparators(text: string): text is HasSeparators {
    return /.+[,|&?:].+/g.test(text);
}


export function splitSeparator(text: HasSeparators): [first: string, others: string] {
    const split: string[] = text.split(/[,|&?:]/g);
    console.log(chalk.blueBright('SEPARATORRRRRR'), text, split, text.match(/[,|&?:]/g));
    const first: string = split[0];
    const others: string = text.slice(first.length + 1);
    return [first, others];
}
