// Gulp
var gulp = require('gulp');

// Browser sync
var sync = require('browser-sync').create();
var syncURL = 'localhost:80/portfolio/dist/index_.html';

// Rename
var rename = require('gulp-rename');

// Concat
//var concat = require('gulp-concat');

// JS
var uglify = require('gulp-uglify');

// CSS
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean-css');

gulp.task('scripts', function () {
  gulp.src('src/js/*.js')
//          .pipe(concat('scripts.min.js'))
          .pipe(uglify())
          .on('error', function (err) {
            console.log('\n\n===== ERROR =====\n\n' + err.message + '\n===== /ERROR =====\n\n');
          })
          .pipe(rename('scripts.min.js'))
          .pipe(gulp.dest('dist/js'))
          .pipe(sync.reload({stream: true}));
});

gulp.task('styles', function () {
  gulp.src('src/scss/main.scss')
          .pipe(sass())
          .on('error', function (err) {
            console.log('\n\n===== ERROR =====\n\n' + err.message + '\n===== /ERROR =====\n\n');
          })
          .pipe(autoprefixer({browsers: ['> 1%', 'last 2 versions', 'firefox esr', 'opera 12.1']}))
          .pipe(clean())
          .pipe(rename('styles.min.css'))
          .pipe(gulp.dest('dist/css'))
          .pipe(sync.reload({stream: true}));
});

gulp.task('sync', function () {
  sync.init({
    proxy: syncURL
  });
});

gulp.task('default', ['sync'], function () {
  gulp.watch('src/js/*.js', ['scripts']);
  gulp.watch('src/scss/**/*.scss', ['styles']);
  gulp.watch('dist/**/*.html').on('change', sync.reload);
});