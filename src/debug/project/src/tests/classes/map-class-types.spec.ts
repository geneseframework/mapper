import { StringOrStrings } from '../../types/string-or-strings.type';
import { TestMapper } from '../test-mapper.model';

export class PersonWithNickNamesStringOrStrings {
    nickNames: StringOrStrings;
}

export const testMappers: TestMapper[] = [];
testMappers.push(new TestMapper('data: string / propertyType: string | string[]', PersonWithNickNamesStringOrStrings, {nickNames: 'Auguste'}, { log: true }));


export type StringsOrString = string[] | string;

export class PersonWithNickNamesStringsOrString {
    nickNames: StringsOrString;
}

testMappers.push(new TestMapper('data: string / propertyType: string[] | string', PersonWithNickNamesStringsOrString, {nickNames: 'Auguste'}, { log: true }));


