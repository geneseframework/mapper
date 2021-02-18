import { TestMapper } from '../../../../test-engine/test-mapper.model';
import { Chalk, ColorSupport } from 'chalk';

export const testMappers: TestMapper[] = [];

export class CatSpec {
    name: string;
}
export class PersonCatSpec {
    cat: CatSpec;
    firstName: string;
}

testMappers.push(new TestMapper(`{ cat: { name: 'Cibi' }, firstName: 'Léa' } / PersonCatSpec`, PersonCatSpec, { cat: { name: 'Cibi' }, firstName: 'Léa' }, { isolate: false }));


export class OutOfProjectSpec {
    color: Chalk;
}


testMappers.push(new TestMapper(`{ color: 'White' } / Chalk / undefined`, 'Chalk', { color: 'White' }, { expectedValue: undefined }));
