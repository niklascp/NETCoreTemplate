/// <binding BeforeBuild='styles' />
var fs = require('fs');
var gulp = require('gulp');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var rename = require("gulp-rename");

var path = require('path');

var script_root = './wwwroot/vendor/'

gulp.task('bower-ui-select', function() {
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
        .src('./bower_components/bootstrap/dist/js/*.js', '!**/npm.js')
        .pipe(gulp.dest(script_root + 'bootstrap/js/'));

    gulp
        .src(['./bower_components/bootstrap/less/**/*', '!**/variables.less'])
        .pipe(gulp.dest(script_root + 'bootstrap/less/'));

    if (!fs.existsSync(script_root+ 'bootstrap/less/variables.less'))
        gulp
            .src(['./bower_components/bootstrap/less/variables.less'])
            .pipe(gulp.dest(script_root + 'bootstrap/less/'));

    gulp.src('./bower_components/bootstrap/dist/fonts/*')
        .pipe(gulp.dest(script_root + 'bootstrap/fonts/'));
    
    return gulp.src(path.join(script_root, 'bootstrap/less/bootstrap.less'))
        .pipe(less())
        .pipe(gulp.dest(script_root + 'bootstrap/css/'))
        .pipe(minifyCSS())
        .pipe(rename('bootstrap.min.css'))
        .pipe(gulp.dest(script_root + 'bootstrap/css/'))
 });

gulp.task('styles', function () {

    return gulp.src(path.join(script_root, 'stylesheet.less'))
        .pipe(less())
        .pipe(gulp.dest(script_root))
        .pipe(minifyCSS())
        .pipe(rename('stylesheet.min.css'))
        .pipe(gulp.dest(script_root))

});
