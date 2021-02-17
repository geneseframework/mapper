import { TestMapper } from '../../../../test-engine/test-mapper.model';
import { Chalk } from 'chalk';

export class OutOfProjectSpec {
    color: Chalk;
}


export const testMappers: TestMapper[] = [];
testMappers.push(new TestMapper(`{ color: 'White' } / ColorClassSpec`, 'Chalk', { color: 'White' }, { isolate: false }));
