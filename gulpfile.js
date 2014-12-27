var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var cache = require('gulp-cached');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var ngHtml2Js = require('gulp-ng-html2js');
var minifyHtml = require('gulp-minify-html');
var angularFilesort = require('gulp-angular-filesort');
var bowerFiles = require('main-bower-files');
var sh = require('shelljs');

var bowerConf = {
        paths: './',
        includeDev: true
    };

var htmlminOpts = {
        removeComments: true,
        collapseWhitespace: true,
        removeEmptyAttributes: false,
        collapseBooleanAttributes: true,
        removeRedundantAttributes: true
    };

var smConf = {includeContent: false, sourceRoot: '../src'};

var paths = {
  sass: ['./scss/**/*.scss'],
  js: ['./src/**/*.js'],
  vendor: ['./vendor/**/*.js'],
  templates: ['./src/**/*.tpl.html']
};

gulp.task('default', ['sass', 'js', 'vendor', 'templates', 'fonts']);


/*
 | --- SASS -----------------------------------------------
 */

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(cache('css'))
    .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sass())
        //.pipe(sourcemaps.write('./maps'))
        //.pipe(gulp.dest('./www/css/'))
        .pipe(minifyCss({
          keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

/*
 | --- JS -------------------------------------------------
 */

gulp.task('vendor', function(done) {
    gulp.src(bowerFiles(bowerConf))
        .pipe(cache('vendor'))
        .pipe(sourcemaps.init({loadMaps: true}))
        //.pipe(angularFilesort())
        .pipe(concat('vendor.js'))
        //.pipe(ngAnnotate())
        //.pipe(sourcemaps.write('./maps'))
        //.pipe(gulp.dest('./www/js/'))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('./www/js/'))
        .on('end', done);
});

gulp.task('js', function(done) {
    gulp.src(['./src/**/*.js'])
        .pipe(cache('app'))
        .pipe(angularFilesort())
        .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(concat('all.js'))
            .pipe(ngAnnotate())
        //.pipe(sourcemaps.write('./maps'))
        //.pipe(gulp.dest('./www/js/'))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('./www/js/'))
        .on('end', done);
});

/*
 | --- Templates ------------------------------------------
 */

gulp.task('templates', function(done) {
    gulp.src('./src/**/*.tpl.html')
        .pipe(cache('templates'))
        .pipe(minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(ngHtml2Js({
            moduleName: 'templates'
        }))
        .pipe(concat('templates.js'))
        .pipe(ngAnnotate())
        //.pipe(gulp.dest('./www/js/'))
        .pipe(rename({ extname: '.min.js' }))
        .pipe(uglify())
        .pipe(gulp.dest('./www/js/'))
        .on('end', done);
});

/*
 | --- Fonts ------------------------------------------
 */

gulp.task('fonts', function() {
    return gulp.src([
        './vendor/ionic/**/*.ttf', './vendor/ionic/**/*.woff', './vendor/ionic/**/*.svg',
        './vendor/fontawesome/**/*.ttf', './vendor/fontawesome/**/*.woff', './vendor/fontawesome/**/*.svg'
    ])
        .pipe(gulp.dest('./www/assets'));
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.vendor, ['vendor']);
    gulp.watch(paths.templates, ['templates']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
