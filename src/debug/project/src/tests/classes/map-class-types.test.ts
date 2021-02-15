import { StringOrStrings } from '../../types/string-or-strings.type';
import * as chalk from 'chalk';
import { TestMapper } from '../test-mapper.model';
import { TESTS } from '../tests.const';

export class PersonWithNickNames {
    nickNames: StringOrStrings;
}

    export const testMapper = new TestMapper('data: string / propertyType: string | string[]', PersonWithNickNames, {nickNames: 'Auguste'}, { log: true });


