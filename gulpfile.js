var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    mochaPhantomJS = require('gulp-mocha-phantomjs');

var config = {
    src: 'src',
    dist: 'dist',
    build: 'build',
    test: 'test'
};
var pkg = require('./package.json');

gulp.task('browserify', function() {
    'use strict';
    return browserify('./' + config.src + '/main.js')
        .bundle()
        .on('error', function (err) {
            console.log(err.toString());
            this.emit('end');
        })
        .pipe(source(pkg.name + '.js'))
        .pipe(gulp.dest(config.dist));
});

gulp.task('browserify-tests', function() {
    'use strict';
    return browserify('./' + config.test + '/tests.js')
        .bundle()
        .on('error', function (err) {
            console.log(err.toString());
            this.emit('end');
        })
        .pipe(source(pkg.name + '-tests.js'))
        .pipe(gulp.dest(config.dist));
});

gulp.task('test', function () {
    'use strict';
    return gulp
        .src('test/browser/index.html')
        .pipe(mochaPhantomJS());
});

//gulp.task('test', function() {
//    'use strict';
//    gulp.watch(config.src + "/**/*.js", ["browserify"]);
//});