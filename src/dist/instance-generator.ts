const generateInstance = async function(instanceGenerator) {
    try {
        let instance;
        switch (instanceGenerator.id) {
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