import { TestMapper } from '../../../../test-engine/test-mapper.model';
import { Animal } from '../models/animal.model';

export interface NameSpec {
    name: string;
}

export const testMappers: TestMapper[] = [];
testMappers.push(new TestMapper(`{ name: 'Léa' } / PreySpec`, 'NameSpec', { name: 'Léa' }));
// testMappers.push(new TestMapper(`{ name: 'Léa' } / PreySpec`, 'NameSpec', { name: 'Léa' }, { isolate: true }));



export interface PreySpec {
    animal: Animal;
}

// testMappers.push(new TestMapper(`{ color: 'White' } / PreySpec`, 'PreySpec', { color: 'White' }));
