var gulp 	= require('gulp')
	config 	= require('../config.js')
	error	= require('../util/errorHandler.js')
	uglify 	= require('gulp-uglify')
	concat	= require('gulp-concat');
 
gulp.task('compress', ['clean'], function() {
  return gulp.src('src/**/*.js')
   	.pipe(concat(config.dist.app))
    .pipe(uglify())
    .pipe(gulp.dest(config.dist.src))
    .on('error', error.onError)
    ;
});