'use strict';

var gulp = require('gulp'),
    debug = require('gulp-debug'),
    inject = require('gulp-inject'),
    tsc = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    del = require('del'),
    Config = require('./gulpfile.config'),
    tsProject = tsc.createProject('tsconfig.json'),
    browserSync = require('browser-sync'),
    superstatic = require( 'superstatic' );

var config = new Config();

/**
 * Compile TypeScript and include references to library and app .d.ts files.
 */
gulp.task('compile-ts', function () {
    var sourceTsFiles = [config.allTypeScript,                //path to typescript files
                         config.libraryTypeScriptDefinitions]; //reference to library .d.ts files
                        

    var tsResult = gulp.src(sourceTsFiles)
                        .pipe(tsc(tsProject));

        tsResult.dts.pipe(gulp.dest(config.tsOutputPath));
        return tsResult.js
                        .pipe(concat('release.js'))
                        .pipe(sourcemaps.write()) 
                        .pipe(gulp.dest(config.tsOutputPath));
});

gulp.task('test-compile-ts', function () {
    var sourceTsFiles = [config.allTestTypeScript,                //path to typescript files
                         config.libraryTypeScriptDefinitions]; //reference to library .d.ts files
                        

    var tsResult = gulp.src(sourceTsFiles)
                        .pipe(tsc(tsProject));

        tsResult.dts.pipe(gulp.dest(config.tsOutputPath));
        return tsResult.js
                        .pipe(concat('release.spec.js'))
                        .pipe(sourcemaps.write()) 
                        .pipe(gulp.dest(config.tsTestOutputPath));
});

/**
 * Remove all generated JavaScript files from TypeScript compilation.
 */
gulp.task('clean', function (cb) {
  var typeScriptGenFiles = [
                              //config.tsOutputPath +'/**/*.js', 
                              //config.tsOutputPath +'/release.js', 
                              config.tsTestOutputPath +'/**/*.js', 
                              config.tsTestOutputPath +'/release.js', 
                              '!' + config.tsOutputPath + '/lib'
                           ];

  // delete the files
  del(typeScriptGenFiles, cb);
});

/*gulp.task('watch', function() {
    gulp.watch([config.allTypeScript], ['compile-ts']);
});*/

gulp.task('serve', ['clean','test-compile-ts'], function() {
  process.stdout.write('Starting browserSync and superstatic...\n');
  browserSync({
    port: 3000,
    files: ['index.html', 'app/build/*.js'],
    injectChanges: true,
    logFileChanges: false,
    logLevel: 'silent',
    logPrefix: 'angularin20typescript',
    notify: true,
    reloadDelay: 0,
    server: {
      baseDir: './src',
      middleware: superstatic({ debug: false})
    }
  });
});

gulp.task('default', ['clean', 'test-compile-ts']);