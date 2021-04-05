import { GeneseConfig } from '@genese/core';

export const geneseConfig: GeneseConfig = {
    mapper: {
        behavior: {
            castStringsAndNumbers: false,
        },
        include: [
            '../out-of-project/files/out-of-project.model.ts',
            '../out-of-project/dir/*.ts',
            '/Users/utilisateur/Documents/projets/genese/mapper/src/debug/out-of-project/files/oop.model.ts'
        ],
        tsConfigs: [
            '../out-of-project/tsconfig.oop.json',
            './tsconfig.json'
        ]
    }
}
