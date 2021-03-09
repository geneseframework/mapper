import { Union } from './union.type';
import { Intersection } from './intersection.type';
import { Commas } from './commas.type';
import { SemiColumn } from './semi-column.type';
import { Interrogation } from './interrogation.type';
import { Extends, hasExtends } from './extends.type';
import { Separator } from './separator.type';

export type HasSeparators = Union | Intersection | Commas | Interrogation | SemiColumn | Extends;


export function hasSeparators(text: string): text is HasSeparators {
    return /.+[,|&?:].+/g.test(text) || hasExtends(text);
}


export function splitSeparator(text: HasSeparators, separator: Separator): [first: string, others: string] {
    const split: string[] = text.split(separator);
    let first: string = split[0];
    const others: string = text.slice(first.length + separator.length);
    return [first, others];
}
