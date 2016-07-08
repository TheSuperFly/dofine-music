var options = {
  sassFiles : "./scss/**/*.scss",
  proxyURL  : "dofine.dev/",
  cssPath   : "./css/",
  cssFiles  : "./css/**/*.css",
  jsFiles   : "./js/**/*.js",
  jsPath    : "./js",
  jsMinPath : "./js",
  usingSPA  : true
};

/**
 * Gulp File for SASS (and JS)
 * v1.1.1
 * Made by Zachary E. Dahan & Jean Law Yim Wan
 *
 * >> Just configure variables above
 * >> And run "gulp" in yo shell.
 * */

var gulp         = require('gulp');
var sass         = require('gulp-sass');
var csso         = require('gulp-csso');
var uglify       = require('gulp-uglify');
var concat       = require('gulp-concat');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync  = require('browser-sync');
var spa          = require("browser-sync-spa");
var notify       = require("gulp-notify");

gulp.task('sass', function() {
  gulp.src(options.sassFiles)
    .pipe(sourcemaps.init())
      .pipe(sass().on('error', function(err) {
        console.log(err);
        notify().write(
          "Error on "
          + err.relativePath
          + " line "
          + err.line
          + " : "
          + err.messageOriginal
        );
        this.emit('end');
      }))
      .pipe(autoprefixer())
      .pipe(csso())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(options.cssPath))
    .pipe(browserSync.stream());
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('js-min', function() {
  return gulp.src(options.jsFiles)
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest(options.jsMinPath))
});

gulp.task('default', ['sass'], function() {
  gulp.watch(options.sassFiles, ['sass']);
  gulp.watch(options.jsFiles, ['bs-reload']);
  gulp.watch("./**/*.html", ['bs-reload']);
  gulp.watch("./**/*.php", ['bs-reload']);

  if (options.usingSPA) {
    browserSync.use(spa({
      selector: "[ng-app]"
    }));
  }

  browserSync.init({
    proxy: options.proxyURL
  });
});
