import { GeneseConfig } from '../../shared/models/genese-config.model';

export const geneseConfig: GeneseConfig = {
    mapper: {
        behavior: {
            differentiateStringsAndNumbers: true,
        },
        include: [
            '../out-of-project.model.ts'
        ]
    }
}
