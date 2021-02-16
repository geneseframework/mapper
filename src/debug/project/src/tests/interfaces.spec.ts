import { TestMapper } from '../../../../test-engine/test-mapper.model';

export interface AnimalSpec {
    name: string;
    nickName?: string;
}

export const testMappers: TestMapper[] = [];
testMappers.push(new TestMapper(`{ name: 'Biela' } / PreySpec`, 'AnimalSpec', { name: 'Biela' }));
testMappers.push(new TestMapper(`{ name: 'Biela', nickName: 'Kitty' } / PreySpec`, 'AnimalSpec', { name: 'Biela', nickName: 'Kitty' }));
testMappers.push(new TestMapper(`{ unknownProperty: 'Biela' } / PreySpec / shouldFail`, 'AnimalSpec', { unknownProperty: 'Biela' }, { shouldFail: true }));



export class AnimalOwner {
    animal: AnimalSpec;
}

testMappers.push(new TestMapper(`{ animal: { name: 'Biela' } } / AnimalOwner`, 'AnimalOwner', { animal: { name: 'Biela' } }));
