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

testMappers.push(new TestMapper(`{ cat: { name: 'Cibi' }, firstName: 'Léa' } / PersonCatSpec`, PersonCatSpec, { cat: { name: 'Cibi' }, firstName: 'Léa' }));
testMappers.push(new TestMapper(`{ cat: { name: 'Cibi' }, firstName: 'Léa' } / PersonCatSpec / { cat: { name: 'Cibi' }, firstName: 'Léa' }`, PersonCatSpec, { cat: { name: 'Cibi', otherProperty: 'a' }, firstName: 'Léa' }, { expectedValue: { cat: { name: 'Cibi' }, firstName: 'Léa' } }));
testMappers.push(new TestMapper(`{ cat: null, firstName: 'Léa' } / PersonCatSpec`, PersonCatSpec, { cat: null, firstName: 'Léa' }));
testMappers.push(new TestMapper(`{ cat: undefined, firstName: 'Léa' } / PersonCatSpec`, PersonCatSpec, { cat: undefined, firstName: 'Léa' }));


export class OutOfProjectSpec {
    color: Chalk;
}


testMappers.push(new TestMapper(`{ color: 'White' } / Chalk / undefined`, 'Chalk', { color: 'White' }, { expectedValue: undefined }));
