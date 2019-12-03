module.exports = function(config) {
    config.set({
        frameworks: ["jasmine", "karma-typescript"],
        files: [
            "src/**/*.ts" // *.tsx for React Jsx
        ],
        preprocessors: {
            "**/*.ts": "karma-typescript" // *.tsx for React Jsx
        },
        coverageIstanbulReporter: {
            dir: require('path').join(__dirname, '../coverage/genese-mapper'),
            reports: ['html', 'lcovonly', 'text-summary', 'clover'],
            fixWebpackSourcePaths: true,
            thresholds: {
                statements: 60,
                lines: 60,
                branches: 50,
                functions: 50
            }
        },
        reporters: ["mocha", "notify"],
        colors: true,
        logLevel: config.DEBUG,
        autoWatch: true,
        browsers: ['ChromeHeadlessCustom'],
        customLaunchers: {
            ChromeHeadlessCustom: {
                base: 'Chrome',
                flags: ['--headless', '--remote-debugging-port=9222', '--no-sandbox']
            }
        },
        singleRun: false,
        restartOnFileChange: true,
    });
};
