import { TestMapper } from '../../../../test-engine/test-mapper.model';


export type EmployerSpec = NgoSpec | NgoSpec[] | CompanySpec;


export class NgoSpec {

    name: string;
    volunteers: number;

}
export class CompanySpec {

    name: string;
    employees: number;

}

export const testMappers: TestMapper[] = [];
const testMapper1 = new TestMapper(`{ name: 'Greenpeace', volunteers: 3000 } / Employer`,
    'EmployerSpec',
    { name: 'Greenpeace', volunteers: 3000 },
    { mapperOptions: { isType: true }, log: true}
    );
testMappers.push(testMapper1);
