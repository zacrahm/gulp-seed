var gulp 		= require('gulp')
	config 		= require('../config.js')
	error 		= require('../util/errorHandler.js')
	runSequence = require('run-sequence');


gulp.task('watch', ['compress'], function() {
   	// By default, errors during watch should not be fatal.
	error.fatalLevel = error.fatalLevel || 'off';
  	gulp.watch(config.source.js, ['compress']);
});