'use strict';

const gulp = require('gulp'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps'),
  browserSync = require('browser-sync').create(),
  reload = browserSync.reload,
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  minify = require('gulp-minify'),
  fileinclude = require('gulp-file-include'),
  gcmq = require('gulp-group-css-media-queries'),
  cleanCSS = require('gulp-clean-css');

  const src = {
    scss: 'src/scss/main.scss',
    scss_watch: 'src/scss/**/*.scss',
    css: 'layout/site/css/',
    js_src: './src/js/*.js',
    js_prod: './layout/site/js',
    lib_src: 'src/lib/*.js',
    lib_prod: 'layout/engine/libs/jQuery/',
    html_src: 'src/html/*.html',
    html_src_watch: 'src/html/**',
    html_prod: 'layout/*.html'
  };


// Compile sass compressed

gulp.task('sass-min', function () {
  return gulp.src(src.scss)
    .pipe(sourcemaps.init())
    .pipe(sass.sync({
      includePaths: require('node-normalize-scss').includePaths, outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gcmq())
    .pipe(autoprefixer({
      browsers: require('./package.json').browserslist,
      cascade: false
    }))
    .pipe(cleanCSS({
      level: 2
    })
    )
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(src.css))
    .pipe(reload({ stream: true }));
});

// Compile sass expanded

gulp.task('sass-full', function () {
  return gulp.src(src.scss)
    .pipe(sass.sync({
      includePaths: require('node-normalize-scss').includePaths, outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gcmq())
    .pipe(autoprefixer({
      browsers: require('./package.json').browserslist,
      cascade: false
    }))
    .pipe(gulp.dest(src.css));
});

gulp.task('sass', ['sass-full', 'sass-min']);

// File include

gulp.task('fileinclude', function () {
  gulp.src(src.html_src)
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('layout/'));
});

// Concat and minify js

gulp.task('bundle-js', function () {
  return gulp.src(src.lib_src)
    .pipe(concat('bundle.js'))
    .pipe(minify({
      ext: {
        min: '.min.js'
      }
    }))
    .pipe(gulp.dest(src.lib_prod))
    .pipe(reload({ stream: true }));
});

// Concat and minify front.js

gulp.task('front-js', function () {
  return gulp.src(src.js_src)
    .pipe(concat('front.js'))
    .pipe(minify({
      ext: {
        min: '.min.js'
      }
    }))
    .pipe(gulp.dest(src.js_prod))
    .pipe(reload({ stream: true }));
});

// Static Server + watching scss/html files

gulp.task('serve', function () {

  browserSync.init({
    server: "layout/"
  });

  gulp.watch(src.scss_watch, ['sass']);
  gulp.watch(src.html_src_watch, ['fileinclude']);
  gulp.watch(src.lib_src, ['bundle-js']);
  gulp.watch(src.js_src, ['front-js']);
  gulp.watch(src.html_prod).on('change', reload);
});

// Start local gulp
gulp.task('default', ['serve']);
