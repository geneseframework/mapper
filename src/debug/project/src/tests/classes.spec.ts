import { TestMapper } from '../../../../test-engine/test-mapper.model';
import { Chalk, ColorSupport } from 'chalk';

export class OutOfProjectSpec {
    color: Chalk;
}

const colorSupport: ColorSupport = {
    level: 1,
    has16m: true,
    has256: true,
    hasBasic: false
}


export const testMappers: TestMapper[] = [];
testMappers.push(new TestMapper(`{ color: 'White' } / Chalk / undefined`, 'Chalk', { color: 'White' }, { expectedValue: undefined }));
testMappers.push(new TestMapper(`valid ColorSupport / Chalk `, 'ColorSupport', colorSupport, { isolate: false }));
