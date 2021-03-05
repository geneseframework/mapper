import { TestMapper } from '../../../../test-engine/test-mapper.model';

export const testMappers: TestMapper[] = [];



// ----------------------------------------------   'Date' or Date   ------------------------------------------------------


testMappers.push(new TestMapper(`2021-02-19T17:36:53.999Z / 'Date' / new Date('2021-02-19T17:36:53.999Z')`, 'Date', '2021-02-19T17:36:53.999Z', {expectedValue: new Date('2021-02-19T17:36:53.999Z')}));
testMappers.push(new TestMapper(`['2021-02-19T17:36:53.999Z', '2021-02-19T17:36:53.999Z'] / Date[] / [new Date('2021-02-19T17:36:53.999Z'), new Date('2021-02-19T17:36:53.999Z')]`, 'Date[]', ['2021-02-19T17:36:53.999Z', '2021-02-19T17:36:53.999Z'], {expectedValue: [new Date('2021-02-19T17:36:53.999Z'), new Date('2021-02-19T17:36:53.999Z')]}));

testMappers.push(new TestMapper(`2021-02-19T17:36:53.999Z / Date / new Date('2021-02-19T17:36:53.999Z')`, Date, '2021-02-19T17:36:53.999Z', {expectedValue: new Date('2021-02-19T17:36:53.999Z')}));
testMappers.push(new TestMapper(`{} / Date / undefined`, Date, {}, {expectedValue: undefined}));
testMappers.push(new TestMapper(`'a' / Date / new Date('a')`, Date, 'a', {expectedValue: new Date('a')}));
testMappers.push(new TestMapper(`{} / Date / undefined`, Date, {}, {expectedValue: undefined}));

// --------------------------------------------   ['Date'] or [Date]   ----------------------------------------------------

testMappers.push(new TestMapper(`[2021-02-19T17:36:53.999Z] / ['Date'] / [new Date('2021-02-19T17:36:53.999Z')]`, ['Date'], ['2021-02-19T17:36:53.999Z'], {expectedValue: [new Date('2021-02-19T17:36:53.999Z')]}));
testMappers.push(new TestMapper(`['a'] / ['Date'] / [new Date('a')]`, `['Date']`, ['a'], {expectedValue: [undefined]}));
testMappers.push(new TestMapper(`['a'] / ['Date'] / []`, ['Date'], [true], {expectedValue: [undefined]}));

testMappers.push(new TestMapper(`['a'] / [Date] / [new Date('a')]`, `[Date]`, ['a'], {expectedValue: [new Date('a')]}));

testMappers.push(new TestMapper(`[2021-02-19T17:36:53.999Z] / [DateConstructor] / [new Date('2021-02-19T17:36:53.999Z')]`, [Date], ['2021-02-19T17:36:53.999Z'], {expectedValue: [new Date('2021-02-19T17:36:53.999Z')]}));
testMappers.push(new TestMapper(`{} / [DateConstructor] / undefined`, [Date], {}, {expectedValue: undefined}));
testMappers.push(new TestMapper(`[{}] / [DateConstructor] / []`, [Date], [{}], {expectedValue: [undefined]}));


// -------------------------------------   Object with property of type Date-----------------------------------------------


export class DateSpec {
    date: Date;
}

testMappers.push(new TestMapper(`{date: new Date()} / DateSpec / ~2021-02-19T18:07:29.446Z`, DateSpec, {date: new Date()}));
testMappers.push(new TestMapper(`{date: 'a'} / DateSpec / {date : 'Invalid Date'}`, DateSpec, {date: 'a'}, {expectedValue: {date : 'Invalid Date'}}));
testMappers.push(new TestMapper(`{date: null} / DateSpec`, DateSpec, {date: null}));
testMappers.push(new TestMapper(`{date: undefined} / DateSpec`, DateSpec, {date: undefined}));
testMappers.push(new TestMapper(`null / DateSpec / null`, DateSpec, null));
testMappers.push(new TestMapper(`{date: 1613756213999} / DateSpec / {date: 2021-02-19T17:36:53.999Z }`, DateSpec, {date: 1613756213999}, {expectedValue: {date: new Date(1613756213999)}}));
