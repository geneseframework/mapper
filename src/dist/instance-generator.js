const generateInstance = async function(instanceGenerator) {
    try {
        let instance;
        switch (instanceGenerator.id) {
    case 'OopInLocalTsconfig_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/out-of-project/files/oop-in-local-tsconfig.model.ts':
        const OopInLocalTsconfig = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/out-of-project/files/oop-in-local-tsconfig.model.ts').OopInLocalTsconfig;
        instance = new OopInLocalTsconfig();
        break;
    case 'Oop_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/out-of-project/files/oop.model.ts':
        const Oop = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/out-of-project/files/oop.model.ts').Oop;
        instance = new Oop();
        break;
    case 'OutOfProject_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/out-of-project/files/out-of-project.model.ts':
        const OutOfProject = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/out-of-project/files/out-of-project.model.ts').OutOfProject;
        instance = new OutOfProject();
        break;
    case 'DirOop_/users/utilisateur/documents/projets/genese/genesemapper/src/debug/out-of-project/dir/dir-oop.model.ts':
        const DirOop = await require('/Users/utilisateur/Documents/projets/genese/genesemapper/src/debug/out-of-project/dir/dir-oop.model.ts').DirOop;
        instance = new DirOop();
        break;
    default:
        console.log('WARNING: No instance found for instanceGenerator id = ', instanceGenerator?.id);
        instance = undefined;
}
        return instance;
    } catch(err) {
        console.log('Impossible to map this instance. Did you exported it ?', err);
    }
}
exports.generateInstance = generateInstance;
