import { TestMapper } from '../../../../test-engine/test-mapper.model';
import { StringOrStrings } from '../types/string-or-strings.type';

export type EmployerSpec = NgoSpec | NgoSpec[] | CompanySpec;
export class NgoSpec {
    name: string;
    volunteers: number;
}
export class CompanySpec {
    name: string;
    employees: number;
}
export class PersonSpec {
    employer: EmployerSpec
}

export const testMappers: TestMapper[] = [];
testMappers.push(new TestMapper(`{ name: 'Greenpeace', volunteers: 3000 } / Employer`, 'EmployerSpec',{ name: 'Greenpeace', volunteers: 3000 }));
testMappers.push(new TestMapper(`{ name: 'Total', employees: 30000 } / Employer`, 'EmployerSpec',{ name: 'Total', employees: 30000 }));
testMappers.push(new TestMapper(`{ name: 'Total', employees: 30000 } / EmployerSpec`, 'EmployerSpec',[{ name: 'Total', employees: 30000 }], { expectedValue: undefined }));
testMappers.push(new TestMapper(`[{ name: 'Total', volunteers: 3000 }] / EmployerSpec[]`, 'EmployerSpec[]',[{ name: 'Total', volunteers: 3000 }]));
testMappers.push(new TestMapper(`{ employer: { name: 'Total', employees: 30000 } } / PersonSpec`, PersonSpec,{ employer: { name: 'Total', employees: 30000 } }));


export class NickNamesSpec {
    nickNames: StringOrStrings;
}

testMappers.push(new TestMapper(`{ nickNames: 'Auguste' } / string | string[]`, NickNamesSpec, { nickNames: 'Auguste' }));
testMappers.push(new TestMapper(`{ unknownProperty: 'Auguste' } / string | string[] / {}`, NickNamesSpec, { unknownProperty: 'Auguste' }, { expectedValue: {} }));
testMappers.push(new TestMapper(`{ nickNames: ['Auguste', 'The old ]} / string | string[]`, NickNamesSpec, { nickNames: ['Auguste', 'The old'] }));


export type StringsOrStringSpec = string[] | string;
export class PersonWithNickNamesStringsOrString {
    nickNames: StringsOrStringSpec;
}

testMappers.push(new TestMapper(`{ nickNames: 'Auguste' } / string[] | string`, PersonWithNickNamesStringsOrString, { nickNames: 'Auguste' }));
testMappers.push(new TestMapper(`{ unknownProperty: 'Auguste' } / string | string[] / {}`, PersonWithNickNamesStringsOrString, { unknownProperty: 'Auguste' }, { expectedValue: {} }));

export type LevelSpec = 1 | 2 | 3;
export class LevelClassSpec {
    level: LevelSpec
}

testMappers.push(new TestMapper(`{ level: 1 } / LevelClassSpec`, LevelClassSpec, { level: 1 }));


export type ColorsTypeSpec = 'Blue' | 'White';
testMappers.push(new TestMapper(`'Blue' / ColorsTypeSpec`, 'ColorsTypeSpec', 'Blue'));
testMappers.push(new TestMapper(`'Green' / ColorsTypeSpec`, 'ColorsTypeSpec', 'Green', { expectedValue: undefined }));
