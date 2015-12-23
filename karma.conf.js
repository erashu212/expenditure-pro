module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '',

        // frameworks to use
        frameworks: ['mocha', 'chai'],

        files: [
        'node_modules/angular/angular.min.js',
        'node_modules/angular-ui-router/build/angular-ui-router.min.js',
        'node_modules/angular-ui-bootstrap/ui-bootstrap.min.js',
        'node_modules/angular-ui-bootstrap/ui-bootstrap-tpls.min.js',
        'bower_components/d3/d3.js',
        'bower_components/nvd3/build/nv.d3.js',
        'bower_components/angular-nvd3/dist/angular-nvd3.js',
        'node_modules/angular-mocks/angular-mocks.js',
        'app/build/release.js',
        'tests/unitTest/build/release.spec.js'
        ],

        // list of files to exclude
        exclude: [],

        preprocessors:{
            'tests/unitTest/**/*.ts': 'typescript'
        },

        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['Chrome'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true,
        plugins: [ 'karma-*'],
        typescriptPreprocessor: {
            typings: [
            'typings/**/*.d.ts'
            ],
            transformPath: function(path) {
               return path.replace(/\.ts$/, '.js');
           }
       }
   });
};