var gulp = require('gulp');
var filelog = require('gulp-filelog');
var FileCache = require('..');

var fileCache = new FileCache();

gulp.src("*.js")
  .pipe(fileCache.filter())
  .pipe(fileCache.cache())
  .pipe(filelog());
