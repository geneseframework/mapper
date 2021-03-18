import { GeneseConfig } from '../../create/models/genese-config.model';

export const geneseConfig: GeneseConfig = {
    mapper: {
        behavior: {
            differentiateStringsAndNumbers: true,
        },
        include: [
            '../out-of-project/files/out-of-project.model.ts',
            '../out-of-project/dir/*.ts',
            '/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/out-of-project/files/oop.model.ts'
        ],
        tsConfigs: [
            '../out-of-project/tsconfig.oop.json',
            './tsconfig.json'
        ]
    }
}
