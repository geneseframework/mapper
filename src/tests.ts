
import { isSameObject } from './services/tools.service';
import { GeneseMapper } from './mapper/genese.mapper';
export class TestUndefined {
    a ?= undefined;
}
const geneseMapper = new GeneseMapper<TestUndefined>(TestUndefined);
// const zzz = isSameObject({a: 0}, 'aaa');

console.log('geneseMapper.map(true)', geneseMapper.map({a: 1}));
