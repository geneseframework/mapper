import { GeneseMapper } from '..';
import { isSameObject } from '../services/tools.service';


describe('GENESE MAPPER geneseMapper', () => {


    // **************************************************************************
    // primitives
    // **************************************************************************


    describe('PRIMITIVES', () => {

        describe('numbers', () => {

            class TestNumber {
                a ?= 5;
            }
            const geneseMapper = new GeneseMapper(TestNumber);

            it('{a: 1} => {a: 1}', () => {
                expect(isSameObject(geneseMapper.map({a: 1}), {a: 1})).toBeTruthy();
            });
            it('{a: "1"} => {a: 1}', () => {
                expect(isSameObject(geneseMapper.map({a: '1'}), {a: 1})).toBeTruthy();
            });
            it('{a: "z"} => {a: 5}', () => {
                expect(isSameObject(geneseMapper.map({a: 'z'}), {a: 5})).toBeTruthy();
            });
            it('{a: true} => {a: 5}', () => {
                expect(isSameObject(geneseMapper.map({a: true}), {a: 5})).toBeTruthy();
            });
            it('1 => {a: 0}', () => {
                expect(isSameObject(geneseMapper.map(1), {a: 5})).toBeTruthy();
            });
            it('undefined => {a: 5}', () => {
                expect(isSameObject(geneseMapper.map(undefined), {a: 5})).toBeTruthy();
            });
            it('null => {a: 5}', () => {
                expect(isSameObject(geneseMapper.map(null), {a: 5})).toBeTruthy();
            });
            it('{a: null} => {a: null}', () => {
                expect(isSameObject(geneseMapper.map({a: null}), {a: null})).toBeTruthy();
            });
        });



        // **************************************************************************



        class TestString {
            a ?= '';
        }
        describe('strings', () => {

            const geneseMapper = new GeneseMapper(TestString);
            it('{a: "1"} => {a: "1"}', () => {
                expect(isSameObject(geneseMapper.map({a: '1'}), {a: '1'})).toBeTruthy();
            });
            it('{a: "1"} => {a: 1}', () => {
                expect(isSameObject(geneseMapper.map({a: 1}), {a: '1'})).toBeTruthy();
            });
            it('true => {a: 0}', () => {
                expect(isSameObject(geneseMapper.map(true), {a: ''})).toBeTruthy();
            });
            it('1 => {a: ""}', () => {
                expect(isSameObject(geneseMapper.map(1), {a: ''})).toBeTruthy();
            });
            it('undefined => {a: ""}', () => {
                expect(isSameObject(geneseMapper.map(undefined), {a: ''})).toBeTruthy();
            });
            it('null => {a: ""}', () => {
                expect(isSameObject(geneseMapper.map(null), {a: ''})).toBeTruthy();
            });
            it('{a: null} => {a: null}', () => {
                expect(isSameObject(geneseMapper.map({a: null}), {a: null})).toBeTruthy();
            });

        });


        // **************************************************************************


        class TestBoolean {
            a ?= true;
        }
        describe('booleans', () => {

            const geneseMapper = new GeneseMapper(TestBoolean);

            it('{a: "1"} => {a: true}', () => {
                expect(isSameObject(geneseMapper.map({a: '1'}), {a: true})).toBeTruthy();
            });
            it('{a: "1"} => {a: true}', () => {
                expect(isSameObject(geneseMapper.map({a: 1}), {a: true})).toBeTruthy();
            });
            it('true => {a: true}', () => {
                expect(isSameObject(geneseMapper.map(true), {a: true})).toBeTruthy();
            });
            it('1 => {a: true}', () => {
                expect(isSameObject(geneseMapper.map(1), {a: true})).toBeTruthy();
            });
            it('undefined => {a: true"}', () => {
                expect(isSameObject(geneseMapper.map(undefined), {a: true})).toBeTruthy();
            });
            it('null => {a: true}', () => {
                expect(isSameObject(geneseMapper.map(null), {a: true})).toBeTruthy();
            });
            it('{a: null} => {a: null}', () => {
                expect(isSameObject(geneseMapper.map({a: null}), {a: null})).toBeTruthy();
            });

        });
    });



    // **************************************************************************
    // undefined
    // **************************************************************************


    describe('UNDEFINED', () => {

        class TestUndefined {
            a ?= undefined;
        }
        const geneseMapper = new GeneseMapper(TestUndefined);

        it('{a: 1} => {a: 1}', () => {
            expect(isSameObject(geneseMapper.map({a: 1}), {a: 1})).toBeTruthy();
        });
        it('{a: {b: 2}} => {a: {b: 2}}', () => {
            expect(isSameObject(geneseMapper.map({a: {b: 2}}), {a: {b: 2}})).toBeTruthy();
        });
    });



    // **************************************************************************
    // arrays
    // **************************************************************************


    describe('OBJECTS WITH ARRAYS', () => {

        describe('object with array of numbers', () => {

            class TestArrayNumbers {
                a?: number[] = [5];
            }

            const geneseMapper = new GeneseMapper(TestArrayNumbers);

            it('{a: 1} => {a: [5]}', () => {
                expect(isSameObject(geneseMapper.map({a: 1}), {a: [5]})).toBeTruthy();
            });
            it('{a: [1]} => {a: [1]}', () => {
                expect(isSameObject(geneseMapper.map({a: [1]}), {a: [1]})).toBeTruthy();
            });
            it('{a: ["1"]} => {a: [1]}', () => {
                expect(isSameObject(geneseMapper.map({a: ['1']}), {a: [1]})).toBeTruthy();
            });
            it('{a: ["b"]} => {a: [5]}', () => {
                expect(isSameObject(geneseMapper.map({a: ['b']}), {a: [5]})).toBeTruthy();
            });
            it('{a: {b: 2}} => {a: [5]}', () => {
                expect(isSameObject(geneseMapper.map({a: {b: 2}}), {a: [5]})).toBeTruthy();
            });
            it('{a: [{b: 2}]} => {a: [5]}', () => {
                expect(isSameObject(geneseMapper.map({a: [{b: 2}]}), {a: [5]})).toBeTruthy();
            });
            it('{a: null} => {a: null}', () => {
                expect(isSameObject(geneseMapper.map({a: null}), {a: null})).toBeTruthy();
            });
            it('{a: undefined} => {a: [5]}', () => {
                expect(isSameObject(geneseMapper.map({a: undefined}), {a: [5]})).toBeTruthy();
            });
            it('{a: [null]} => {a: [null]}', () => {
                expect(isSameObject(geneseMapper.map({a: [null]}), {a: [null]})).toBeTruthy();
            });
            it('{a: [undefined]} => {a: [5]}', () => {
                expect(isSameObject(geneseMapper.map({a: [undefined]}), {a: [5]})).toBeTruthy();
            });
            it('["z"] => {a: [5]}', () => {
                expect(isSameObject(geneseMapper.map(['z']), {a: [5]})).toBeTruthy();
            });
            it('null => {a: [5]}', () => {
                expect(isSameObject(geneseMapper.map(null), {a: [5]})).toBeTruthy();
            });
            it('[null] => {a: [5]}', () => {
                expect(isSameObject(geneseMapper.map([null]), {a: [5]})).toBeTruthy();
            });

        });


        // **************************************************************************


        describe('object with array of strings', () => {

            class TestArrayStrings {
                a?: string[] = [''];
            }

            const geneseMapper = new GeneseMapper(TestArrayStrings);

            it('{a: 1} => {a: [""]}', () => {
                expect(isSameObject(geneseMapper.map({a: 1}), {a: ['']})).toBeTruthy();
            });
            it('{a: [1]} => {a: ["1"]}', () => {
                expect(isSameObject(geneseMapper.map({a: [1]}), {a: ['1']})).toBeTruthy();
            });
            it('{a: ["1"]} => {a: ["1"]}', () => {
                expect(isSameObject(geneseMapper.map({a: ['1']}), {a: ['1']})).toBeTruthy();
            });
            it('{a: [true]} => {a: ["1"]}', () => {
                expect(isSameObject(geneseMapper.map({a: [true]}), {a: ['1']})).toBeTruthy();
            });
            it('{a: {b: 2}} => {a: [""]}', () => {
                expect(isSameObject(geneseMapper.map({a: {b: 2}}), {a: ['']})).toBeTruthy();
            });
            it('{a: [{b: 2}]} => {a: [""]}', () => {
                expect(isSameObject(geneseMapper.map({a: [{b: 2}]}), {a: ['']})).toBeTruthy();
            });
            it('{a: null} => {a: null}', () => {
                expect(isSameObject(geneseMapper.map({a: null}), {a: null})).toBeTruthy();
            });
            it('{a: undefined} => {a: [""]}', () => {
                expect(isSameObject(geneseMapper.map({a: undefined}), {a: ['']})).toBeTruthy();
            });
            it('{a: [null]} => {a: [null]}', () => {
                expect(isSameObject(geneseMapper.map({a: [null]}), {a: [null]})).toBeTruthy();
            });
            it('{a: [undefined]} => {a: [""]}', () => {
                expect(isSameObject(geneseMapper.map({a: [undefined]}), {a: ['']})).toBeTruthy();
            });
        });


        // **************************************************************************


        describe('object with array of booleans', () => {

            class TestArrayBooleans {
                a?: boolean[] = [false];
            }

            const geneseMapper = new GeneseMapper(TestArrayBooleans);

            it('{a: 1} => {a: [false]}', () => {
                expect(isSameObject(geneseMapper.map({a: 1}), {a: [false]})).toBeTruthy();
            });
            it('{a: [1]} => {a: [false]}', () => {
                expect(isSameObject(geneseMapper.map({a: [1]}), {a: [false]})).toBeTruthy();
            });
            it('{a: ["1"]} => {a: [false]}', () => {
                expect(isSameObject(geneseMapper.map({a: ['1']}), {a: [false]})).toBeTruthy();
            });
            it('{a: [true]} => {a: [true]}', () => {
                expect(isSameObject(geneseMapper.map({a: [true]}), {a: [true]})).toBeTruthy();
            });
            it('{a: {b: 2}} => {a: [false]}', () => {
                expect(isSameObject(geneseMapper.map({a: {b: 2}}), {a: [false]})).toBeTruthy();
            });
            it('{a: [{b: 2}]} => {a: [false]}', () => {
                expect(isSameObject(geneseMapper.map({a: [{b: 2}]}), {a: [false]})).toBeTruthy();
            });
            it('{a: null} => {a: null}', () => {
                expect(isSameObject(geneseMapper.map({a: null}), {a: null})).toBeTruthy();
            });
            it('{a: undefined} => {a: [false]}', () => {
                expect(isSameObject(geneseMapper.map({a: undefined}), {a: [false]})).toBeTruthy();
            });
            it('{a: [null]} => {a: [null]}', () => {
                expect(isSameObject(geneseMapper.map({a: [null]}), {a: [null]})).toBeTruthy();
            });
            it('{a: [undefined]} => {a: [false]}', () => {
                expect(isSameObject(geneseMapper.map({a: [undefined]}), {a: [false]})).toBeTruthy();
            });
        });
    });



    // **************************************************************************
    // objects
    // **************************************************************************



    describe('OBJECTS WITH NESTED OBJECTS', () => {

        describe('simple nested object', () => {

            class TestObject {
                a?: { b: string } = {b: ''};
            }

            const geneseMapper = new GeneseMapper(TestObject);

            it('{a: {b: 2}} => {a: {b: 2}}', () => {
                expect(isSameObject(geneseMapper.map({a: {b: 2}}), {a: {b: 2}})).toBeTruthy();
            });
            it('{a: 3} => {a: {b: ""}}', () => {
                expect(isSameObject(geneseMapper.map({a: 3}), {a: {b: ''}})).toBeTruthy();
            });
            it('{a: {c: 3}} => {a: {b: ""}}', () => {
                expect(isSameObject(geneseMapper.map({a: {c: 3}}), {a: {b: ''}})).toBeTruthy();
            });
            it('{a: {b: null}} => {a: {b: null}}', () => {
                expect(isSameObject(geneseMapper.map({a: {b: null}}), {a: {b: null}})).toBeTruthy();
            });
            it('{a: {b: undefined}} => {a: {b: ""}}', () => {
                expect(isSameObject(geneseMapper.map({a: {b: undefined}}), {a: {b: ''}})).toBeTruthy();
            });
        });


        // **************************************************************************


        describe('object with undefined', () => {

            // A nested property must be initialized: if not, the model above is equivalent to
            // {
            //      a?: undefined
            // }
            class TestObjectWithUndefined {
                a?: { b: string } = {b: undefined};
            }

            const geneseMapper = new GeneseMapper(TestObjectWithUndefined);

            it('{a: {b: 2}} => {a: {b: 2}}', () => {
                expect(isSameObject(geneseMapper.map({a: {b: 2}}), {a: {b: 2}})).toBeTruthy();
            });
            it('{a: 3} => {a: {b: undefined}}', () => {
                expect(isSameObject(geneseMapper.map({a: 3}), {a: 3})).toBeTruthy();
            });
            it('{a: {c: 3}} => {a: {b: undefined}}', () => {
                expect(isSameObject(geneseMapper.map({a: {c: 3}}), {a: {c: 3}})).toBeTruthy();
            });
            it('{a: {b: null}} => {a: {b: null}}', () => {
                expect(isSameObject(geneseMapper.map({a: {b: null}}), {a: {b: null}})).toBeTruthy();
            });
            it('{a: {b: undefined}} => {a: {b: undefined}}', () => {
                expect(isSameObject(geneseMapper.map({a: {b: undefined}}), {a: {b: undefined}})).toBeTruthy();
            });
            it('{a: {b: {c: 3}}} => {a: {b: {c: 3}}}', () => {
                expect(isSameObject(geneseMapper.map({a: {b: {c: 3}}}), {a: {b: {c: 3}}})).toBeTruthy();
            });
        });


        // **************************************************************************


        describe('nested object with array', () => {

            class TestObjectWithArray {
                a?: { b: string[] } = {b: ['']};
            }

            const geneseMapper = new GeneseMapper(TestObjectWithArray);

            it('{a: {b: 2}} => {a: {b: [""]}}', () => {
                expect(isSameObject(geneseMapper.map({a: {b: 2}}), {a: {b: ['']}})).toBeTruthy();
            });
            it('{a: 3} => {a: {b: [""]}}', () => {
                expect(isSameObject(geneseMapper.map({a: 3}), {a: {b: ['']}})).toBeTruthy();
            });
            it('{a: {b: ["5"]}} => {a: {b: ["5"]}}', () => {
                expect(isSameObject(geneseMapper.map({a: {b: ['5']}}), {a: {b: ['5']}})).toBeTruthy();
            });
            it('{a: {b: [5]}} => {a: {b: [5]}}', () => {
                expect(isSameObject(geneseMapper.map({a: {b: [5]}}), {a: {b: ['5']}})).toBeTruthy();
            });
            it('{a: {b: [false]}} => {a: {b: [""]}}', () => {
                expect(isSameObject(geneseMapper.map({a: {b: [false]}}), {a: {b: ['']}})).toBeTruthy();
            });
            it('{a: {c: 3}} => {a: {b: [""]}}', () => {
                expect(isSameObject(geneseMapper.map({a: {c: 3}}), {a: {b: ['']}})).toBeTruthy();
            });
            it('{a: {b: null}} => {a: {b: null}}', () => {
                expect(isSameObject(geneseMapper.map({a: {b: null}}), {a: {b: null}})).toBeTruthy();
            });
            it('{a: {b: undefined}} => {a: {b: [""]}}', () => {
                expect(isSameObject(geneseMapper.map({a: {b: undefined}}), {a: {b: ['']}})).toBeTruthy();
            });
            it('{a: {b: {c: 3}}} => {a: {b: [""]}}', () => {
                expect(isSameObject(geneseMapper.map({a: {b: {c: 3}}}), {a: {b: ['']}})).toBeTruthy();
            });
        });


        // **************************************************************************


        describe('nested array of objects', () => {

            class TestArrayOfObjects {
                a?: { b: string }[] = [{b: ''}];
            }
            const geneseMapper = new GeneseMapper(TestArrayOfObjects);

            it('{a: {b: 2}} => {a: [{b: ""}]}', () => {
                expect(isSameObject(geneseMapper.map({a: {b: 2}}), {a: [{b: ''}]})).toBeTruthy();
            });
            it('{a: 3} => {a: [{b: ""}]}', () => {
                expect(isSameObject(geneseMapper.map({a: 3}), {a: [{b: ''}]})).toBeTruthy();
            });
            it('{a: {b: ["5"]}} => {a: [{b: ""}]}', () => {
                expect(isSameObject(geneseMapper.map({a: {b: ['5']}}), {a: [{b: ''}]})).toBeTruthy();
            });
            it('{a: {b: [5]}} => {a: [{b: ""}]}', () => {
                expect(isSameObject(geneseMapper.map({a: {b: [5]}}), {a: [{b: ''}]})).toBeTruthy();
            });
            it('{a: {b: [false]}} => {a: [{b: ""}]}', () => {
                expect(isSameObject(geneseMapper.map({a: {b: [false]}}), {a: [{b: ''}]})).toBeTruthy();
            });
            it('{a: {c: 3}} => {a: [{b: ""}]}', () => {
                expect(isSameObject(geneseMapper.map({a: {c: 3}}), {a: [{b: ''}]})).toBeTruthy();
            });
            it('{a: {b: null}} => {a: null}', () => {
                expect(isSameObject(geneseMapper.map({a: {b: null}}), {a: [{b: ''}]})).toBeTruthy();
            });
            it('{a: null} => {a: null}', () => {
                expect(isSameObject(geneseMapper.map({a: null}), {a: null})).toBeTruthy();
            });
            it('{a: [null]}} => {a: [{b: ""}]}', () => {
                expect(isSameObject(geneseMapper.map({a: [null]}), {a: [null]})).toBeTruthy();
            });
            it('{a: [{b: 4}]} => {a: [{b: 4}]}', () => {
                expect(isSameObject(geneseMapper.map({a: [{b: 4}]}), {a: [{b: 4}]})).toBeTruthy();
            });
            it('{a: [{b: null}]} => {a: [{b: null}]}', () => {
                expect(isSameObject(geneseMapper.map({a: [{b: null}]}), {a: [{b: null}]})).toBeTruthy();
            });
            it('{a: [{b: undefined}]} => {a: [{b: ""}]}', () => {
                expect(isSameObject(geneseMapper.map({a: [{b: undefined}]}), {a: [{b: ''}]})).toBeTruthy();
            });
            it('{a: [{b: true}]} => {a: {b: [""]}}', () => {
                expect(isSameObject(geneseMapper.map({a: [{b: true}]}), {a: [{b: ''}]})).toBeTruthy();
            });
        });


        // **************************************************************************


        describe('objects with objects as indexable types', () => {

            class TestClass {
                a?: {
                    [key: string]: {
                        b?: string
                    }
                } = {
                    gnIndexableType: {
                        b: ''
                    }
                };
            }

            const geneseMapper = new GeneseMapper<TestClass>(TestClass);

            it('{a: {fr: {b: "2"}}} => {a: {fr: {b: "2"}}}', () => {
                expect(isSameObject(geneseMapper.map({a: {fr: {b: '2'}}}), {a: {fr: {b: '2'}}})).toBeTruthy();
            });
            it('{a: {fr: {b: "2"}, en: {b: "2"}}} => {a: {fr: {b: "2"}, en: {b: "2"}}}', () => {
                expect(isSameObject(geneseMapper.map({a: {fr: {b: '2'}}, en: {b: '2'}}), {a: {fr: {b: '2'}}, en: {b: '2'}})).toBeTruthy();
            });
            it('{{a: {c: "2"}}} => {a: {}}', () => {
                expect(isSameObject(geneseMapper.map({a:  {c: '2'}}), {a: {c: {b: ''}}})).toBeTruthy();
            });
        });


        // **************************************************************************

        describe('objects with primitives as indexable types ', () => {

            class TestClass {
                a?: {
                    [key: string]: string
                } = {
                    gnIndexableType: ''
                };
            }

            const geneseMapper = new GeneseMapper<TestClass>(TestClass);

            it('{a: {b: "2"}} => {a: {b: "2"}]}', () => {
                expect(isSameObject(geneseMapper.map({a: {b: '2'}}), {a: {b: '2'}})).toBeTruthy();
            });
            it('{a: {b: 2}} => {a: {b: "2"}]}', () => {
                expect(isSameObject(geneseMapper.map({a:  {b: 2}}), {a: {b: '2'}})).toBeTruthy();
            });
            it('{a: {b: null}} => {a: {b: null}]}', () => {
                expect(isSameObject(geneseMapper.map({a:  {b: null}}), {a: {b: null}})).toBeTruthy();
            });
            it('{a: {b: undefined}} => {a: {b: ""}]}', () => {
                expect(isSameObject(geneseMapper.map({a:  {b: ''}}), {a: {b: ''}})).toBeTruthy();
            });
            it('{a: {}} => {a: {b: ""}]}', () => {
                expect(isSameObject(geneseMapper.map({a:  {b: ''}}), {a: {b: ''}})).toBeTruthy();
            });
            it('{a: {b: {c: 2}}} => {a: {b: ""}]}', () => {
                expect(isSameObject(geneseMapper.map({a:  {b: ''}}), {a: {b: ''}})).toBeTruthy();
            });
            it('{a: null} => {a: null]}', () => {
                expect(isSameObject(geneseMapper.map({a:  null}), {a: null})).toBeTruthy();
            });
            it('{a: undefined} => {a: {b: ""}]}', () => {
                expect(isSameObject(geneseMapper.map({a:  undefined}), {a: {}})).toBeTruthy();
            });
        });
    });


    // **************************************************************************
    // arrays
    // **************************************************************************


    describe('ARRAYS', () => {

        describe('array of numbers', () => {

            const geneseMapper = new GeneseMapper(Number);

            it('[1, 2] => [1, 2]', () => {
                expect(isSameObject(geneseMapper.arrayMap([1, 2]), [1, 2])).toBeTruthy();
            });
            it('[1, "2"] => [1, 2]', () => {
                expect(isSameObject(geneseMapper.arrayMap([1, '2']), [1, 2])).toBeTruthy();
            });
            it('[] => []', () => {
                expect(isSameObject(geneseMapper.arrayMap([]), [])).toBeTruthy();
            });
            it('[true, false] => []', () => {
                expect(isSameObject(geneseMapper.arrayMap([true, false]), [])).toBeTruthy();
            });
            it('[{a: 2}] => []', () => {
                expect(isSameObject(geneseMapper.arrayMap([{a: 2}]), [])).toBeTruthy();
            });
            it('[null] => [null]', () => {
                expect(isSameObject(geneseMapper.arrayMap([null]), [null])).toBeTruthy();
            });
            it('null => []', () => {
                expect(isSameObject(geneseMapper.arrayMap(null), null)).toBeTruthy();
            });
            it('undefined => []', () => {
                expect(isSameObject(geneseMapper.arrayMap(undefined), [])).toBeTruthy();
            });
            it('[undefined] => []', () => {
                expect(isSameObject(geneseMapper.arrayMap([undefined]), [])).toBeTruthy();
            });
        });

        describe('array of strings', () => {

            const geneseMapper = new GeneseMapper(String);

            it('[1, 2] => [1, 2]', () => {
                expect(isSameObject(geneseMapper.arrayMap([1, 2]), ['1', '2'])).toBeTruthy();
            });
            it('[1, "2"] => [1, 2]', () => {
                expect(isSameObject(geneseMapper.arrayMap([1, '2']), ['1', '2'])).toBeTruthy();
            });
            it('[] => []', () => {
                expect(isSameObject(geneseMapper.arrayMap([]), [])).toBeTruthy();
            });
            it('[true, false] => []', () => {
                expect(isSameObject(geneseMapper.arrayMap([true, false]), [])).toBeTruthy();
            });
            it('[{a: 2}] => []', () => {
                expect(isSameObject(geneseMapper.arrayMap([{a: 2}]), [])).toBeTruthy();
            });
            it('[null] => [null]', () => {
                expect(isSameObject(geneseMapper.arrayMap([null]), [null])).toBeTruthy();
            });
            it('null => []', () => {
                expect(isSameObject(geneseMapper.arrayMap(null), null)).toBeTruthy();
            });
            it('undefined => []', () => {
                expect(isSameObject(geneseMapper.arrayMap(undefined), [])).toBeTruthy();
            });
            it('[undefined] => []', () => {
                expect(isSameObject(geneseMapper.arrayMap([undefined]), [])).toBeTruthy();
            });
        });

        describe('array of booleans', () => {

            const geneseMapper = new GeneseMapper(Boolean);

            it('[1, 2] => [1, 2]', () => {
                expect(isSameObject(geneseMapper.arrayMap([1, 2]), [])).toBeTruthy();
            });
            it('[1, "2"] => [1, 2]', () => {
                expect(isSameObject(geneseMapper.arrayMap([1, '2']), [])).toBeTruthy();
            });
            it('[0] => []', () => {
                expect(isSameObject(geneseMapper.arrayMap([0]), [])).toBeTruthy();
            });
            it('[] => []', () => {
                expect(isSameObject(geneseMapper.arrayMap([]), [])).toBeTruthy();
            });
            it('[true, false] => [true, false]', () => {
                expect(isSameObject(geneseMapper.arrayMap([true, false]), [true, false])).toBeTruthy();
            });
            it('[{a: 2}] => []', () => {
                expect(isSameObject(geneseMapper.arrayMap([{a: 2}]), [])).toBeTruthy();
            });
            it('[null] => [null]', () => {
                expect(isSameObject(geneseMapper.arrayMap([null]), [null])).toBeTruthy();
            });
            it('null => []', () => {
                expect(isSameObject(geneseMapper.arrayMap(null), null)).toBeTruthy();
            });
            it('undefined => []', () => {
                expect(isSameObject(geneseMapper.arrayMap(undefined), [])).toBeTruthy();
            });
            it('[undefined] => []', () => {
                expect(isSameObject(geneseMapper.arrayMap([undefined]), [])).toBeTruthy();
            });
        });
    });
});
