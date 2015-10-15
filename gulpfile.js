'use strict';
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var mochaPhantomJS = require('gulp-mocha-phantomjs');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var header = require('gulp-header');

var config = {
  src: 'src',
  dist: 'dist',
  build: '',
  test: 'test',
};
var pkg = require('./package.json');

gulp.task('browserify', function() {
  return browserify('./' + config.src + '/index.js')
    .bundle()
    .on('error', function(err) {
      console.log(err.toString());
      this.emit('end');
    })
    .pipe(source(pkg.name + '.js'))
    .pipe(gulp.dest(config.dist))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('browserify-tests', function() {
  return browserify('./' + config.test + '/tests.js')
    .bundle()
    .on('error', function(err) {
      console.log(err.toString());
      this.emit('end');
    })
    .pipe(source(pkg.name + '-tests.js'))
    .pipe(gulp.dest(config.dist))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: ['./' + config.test + '/browser/', './'],
    },
  });
});

gulp.task('serve-test', ['browserify', 'browserify-tests'], function() {
  gulp.start('browser-sync');
  gulp.watch(config.test + '/*.js', ['browserify', 'browserify-tests']);
  gulp.watch(config.src + '/**/*.js', ['browserify', 'browserify-tests']);
});

gulp.task('build', ['browserify'], function() {
  var headerText =
    '/*\n' +
    ' * QueryLoader2 - A simple script to create a preloader for images\n' +
    ' *\n' +
    ' * For instructions read the original post:\n' +
    ' * http://www.gayadesign.com/diy/queryloader2-preload-your-images-with-ease/\n' +
    ' *\n' +
    ' * Copyright (c) 2011 - Gaya Kessler\n' +
    ' *\n' +
    ' * Licensed under the MIT license:\n' +
    ' *   http://www.opensource.org/licenses/mit-license.php\n' +
    ' *\n' +
    ' * Version: <%= version %>\n' +
    ' * Last update: <%= date %>\n' +
    ' */\n';

  gulp.src(config.dist + '/' + pkg.name + '.js')
    .pipe(uglify())
    .pipe(rename(pkg.name + '.min.js'))
    .pipe(header(headerText, {
      version: pkg.version,
      date: new Date().toJSON().slice(0, 10),
    }))
    .pipe(gulp.dest(config.build));
});