import { StringOrStrings } from '../../types/string-or-strings.type';
import { TestMapper } from '../test-mapper.model';

export class PersonWithNickNamesStringOrStrings {
    nickNames: StringOrStrings;
}

export const testMappers: TestMapper[] = [];
testMappers.push(new TestMapper(`data: { nickNames: 'Auguste' } / propertyType: string | string[]`, PersonWithNickNamesStringOrStrings, { nickNames: 'Auguste' }));
testMappers.push(new TestMapper(`data: { unknownProperty: 'Auguste' } / propertyType: string | string[] / should fail`, PersonWithNickNamesStringOrStrings, { unknownProperty: 'Auguste' }, { shouldFail: true }));
testMappers.push(new TestMapper(`data: { nickNames: ['Auguste', 'The old ]} / propertyType: string | string[]`, PersonWithNickNamesStringOrStrings, { nickNames: ['Auguste', 'The old'] }, { log: true }));


export type StringsOrString = string[] | string;

export class PersonWithNickNamesStringsOrString {
    nickNames: StringsOrString;
}

testMappers.push(new TestMapper(`data: { nickNames: 'Auguste' } / propertyType: string[] | string`, PersonWithNickNamesStringsOrString, { nickNames: 'Auguste' }));
testMappers.push(new TestMapper(`data: { unknownProperty: 'Auguste' } / propertyType: string | string[] / should fail`, PersonWithNickNamesStringsOrString, { unknownProperty: 'Auguste' }, { shouldFail: true }));


