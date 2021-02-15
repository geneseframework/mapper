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
export class PersonSpec {
    employer: EmployerSpec
}

export const testMappers: TestMapper[] = [];
const testMapper1 = new TestMapper(`{ name: 'Greenpeace', volunteers: 3000 } / Employer`,
    'EmployerSpec',
    { name: 'Greenpeace', volunteers: 3000 },
    { mapperOptions: { isType: true }, log: true}
);
testMappers.push(testMapper1);


const testMapper2 = new TestMapper(`{ name: 'Total', employees: 30000 } / Employer`,
    'EmployerSpec',
    { name: 'Total', employees: 30000 },
    { mapperOptions: { isType: true }, log: true}
);
testMappers.push(testMapper2);


const testMapper3 = new TestMapper(`{ name: 'Total', employees: 30000 } / Employer`,
    'EmployerSpec',
    [{ name: 'Total', employees: 30000 }],
    { mapperOptions: { isType: true }, log: true, shouldFail: true }
);
testMappers.push(testMapper3);


const testMapper4 = new TestMapper(`{ name: 'Total', volunteers: 3000 } / Employer`,
    'EmployerSpec',
    [{ name: 'Total', volunteers: 3000 }],
    { mapperOptions: { isType: true }, log: true }
);
testMappers.push(testMapper4);


const testMapper5 = new TestMapper(`{ employer: { name: 'Total', employees: 30000 } } / PersonSpec`,
    'EmployerSpec',
    { employer: { name: 'Total', employees: 30000 } },
    { log: true }
);
testMappers.push(testMapper5);
