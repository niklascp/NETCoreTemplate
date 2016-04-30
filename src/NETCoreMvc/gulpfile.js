/// <binding BeforeBuild='css' />
var fs = require('fs');
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var rename = require("gulp-rename");

var path = require('path');

var config = {
    bowerRoot: './bower_components/',
    vendorRoot: './wwwroot/vendor/',
    resourcesRoot: './wwwroot/resources/'
};

var script_root = './wwwroot/vendor/';

gulp.task('bower-ui-select', function () {
    gulp
      .src('./bower_components/ui-select/dist/*.js')
      .pipe(gulp.dest(script_root + 'ui-select/js/'))
    gulp
      .src('./bower_components/ui-select/dist/*.css')
      .pipe(gulp.dest(script_root + 'ui-select/css/'))
    gulp
      .src(['./bower_components/ui-select/README.md', './bower_components/ui-select/LICENSE'])
      .pipe(gulp.dest(script_root + 'ui-select/'))
});

gulp.task('selectize', function () {
    gulp
      .src('./bower_components/selectize/dist/js/*.js')
      .pipe(gulp.dest(script_root + 'selectize/js/'));
    gulp.src('./bower_components/selectize/dist/css/selectize.bootstrap3.css')
        .pipe(gulp.dest(script_root + 'selectize/css/'))
        .pipe(minifyCSS())
        .pipe(rename('selectize.bootstrap3.min.css'))
        .pipe(gulp.dest(script_root + 'selectize/css/'))
    gulp
      .src(['./bower_components/selectize/README.md', './bower_components/selectize/LICENSE'])
      .pipe(gulp.dest(script_root + 'selectize/'));
});

gulp.task('jquery', function () {

    gulp
        .src('./bower_components/jquery/dist/*.js')
        .pipe(gulp.dest(script_root + 'jquery/js/'));
});

gulp.task('bootstrap', function () {
    gulp
        .src([config.bowerRoot + '/bootstrap-sass/assets/javascripts/*.js', '!**/bootstrap-sprockets.js'])
        .pipe(gulp.dest(script_root + 'bootstrap/js/'));

    gulp.src(config.bowerRoot + '/bootstrap-sass/assets/fonts/bootstrap/*')
        .pipe(gulp.dest(script_root + 'bootstrap/fonts/'));
});

gulp.task('css', function () {
    return sass(config.resourcesRoot + 'scss/style.scss', {
        style: 'compressed',
        loadPath: [
            //config.resourcesRoot + 'scss',
            config.bowerRoot + '/bootstrap-sass/assets/stylesheets'
        ]
    })
    .on('error', sass.logError)
    .pipe(gulp.dest(config.resourcesRoot + 'css'))
});