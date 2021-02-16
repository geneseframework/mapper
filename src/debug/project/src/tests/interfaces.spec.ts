import { TestMapper } from '../../../../test-engine/test-mapper.model';
import { Animal } from '../models/animal.model';

export interface AnimalSpec {
    name: string;
}

export const testMappers: TestMapper[] = [];
testMappers.push(new TestMapper(`{ name: 'Léa' } / PreySpec`, 'AnimalSpec', { name: 'Léa' }));



export class AnimalOwner {
    animal: AnimalSpec;
}

testMappers.push(new TestMapper(`{ animal: { name: 'Biela' } } / AnimalOwner`, 'AnimalOwner', { animal: { name: 'Biela' } }, { isolate: true}));
