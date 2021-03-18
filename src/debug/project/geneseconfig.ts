import { GeneseConfig } from '../../shared/models/genese-config.model';

export const geneseConfig: GeneseConfig = {
    mapper: {
        behavior: {
            differentiateStringsAndNumbers: true,
        },
        include: [
            '../out-of-project/files/out-of-project.model.ts',
            '../out-of-project/dir/*.ts'
        ]
    }
}
