'use strict';
var GulpConfig = (function () {
    function gulpConfig() {
        //Got tired of scrolling through all the comments so removed them
        //Don't hurt me AC :-)
        this.source = './app/';
        this.testSource = './tests/unitTest/';

        this.tsOutputPath = this.source + '/build';
        this.tsTestOutputPath = this.testSource + '/build';
        this.allJavaScript = [this.source + '/build/**/*.js'];
        this.allTestJavaScript = [this.testSource + '/build/**/*.js'];
        this.allTypeScript = this.source + 'js/**/*.ts';
        this.allTestTypeScript = this.testSource + '/**/*.spec.ts';

        this.typings = 'typings/';
        this.libraryTypeScriptDefinitions = this.typings + '**/*.ts';
    }
    return gulpConfig;
})();
module.exports = GulpConfig;