'use strict';

const gulp = require('gulp'),
    del = require('del'),
    tsc = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps'),
    tslint = require('gulp-tslint'),
    runSequence = require('run-sequence'),
    nodemon = require('gulp-nodemon'),
    gulpTypings = require('gulp-typings');

var tsProject = tsc.createProject('tsconfig.json');

gulp.task('clean', function(callback){
    return del(['./dist'], callback);
});

gulp.task('tslint', function(){
    return gulp.src('src/**/*.ts')
        .pipe(tslint({ formatter: 'prose' }))
        .pipe(tslint.report({
            emitError: false
        }));
});

gulp.task('build:server', function () {
    var tsResult = gulp.src('src/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(tsProject());
    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/'));
});

gulp.task('copyServerAssets', function (callback) {
    gulp.src(['./index.html', 'src/**/*', '!src/**/*.ts'])
        .pipe(gulp.dest('./dist'));
    callback();
});

gulp.task('build', function (callback) {
    runSequence('tslint', 'clean', 'copyServerAssets', 'build:server', callback);
});

gulp.task('start-server', function () {
    nodemon({
        script: './dist/server.js',
        watch: ['src'],
        ext: 'ts json html',
        tasks: ['build'],
        stdout: true
    }).on('restart', function () { });
});

gulp.task('serve', function () {
    runSequence('build', 'start-server');
});

/** -------------------------------------------------------------------------------------- */
// General tasks
/** -------------------------------------------------------------------------------------- */

gulp.task('installTypings', function () {
    var stream = gulp.src(['./typings.json'])
        .pipe(gulpTypings(null)); //will install all typingsfiles in pipeline.
    return stream; // by returning stream gulp can listen to events from the stream and knows when it is finished.
});