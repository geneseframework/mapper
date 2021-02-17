import { StringOrStrings } from '../types/string-or-strings.type';
import { TestMapper } from '../../../../test-engine/test-mapper.model';

export class NickNamesSpec {
    nickNames: StringOrStrings;
}

export const testMappers: TestMapper[] = [];
testMappers.push(new TestMapper(`{ nickNames: 'Auguste' } / string | string[]`, NickNamesSpec, { nickNames: 'Auguste' }));
testMappers.push(new TestMapper(`{ unknownProperty: 'Auguste' } / string | string[] / {}`, NickNamesSpec, { unknownProperty: 'Auguste' }, { expectedValue: {} }));
testMappers.push(new TestMapper(`{ nickNames: ['Auguste', 'The old ]} / string | string[]`, NickNamesSpec, { nickNames: ['Auguste', 'The old'] }));


export type StringsOrStringSpec = string[] | string;

export class PersonWithNickNamesStringsOrString {
    nickNames: StringsOrStringSpec;
}

testMappers.push(new TestMapper(`{ nickNames: 'Auguste' } / string[] | string`, PersonWithNickNamesStringsOrString, { nickNames: 'Auguste' }));
testMappers.push(new TestMapper(`{ unknownProperty: 'Auguste' } / string | string[] / {}`, PersonWithNickNamesStringsOrString, { unknownProperty: 'Auguste' }, { expectedValue: {} }));


