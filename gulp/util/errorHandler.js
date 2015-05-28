/**
*	Error Handling Module:
*	Provides utilities to control error handling in gulp tasks. 
*	By default, gulp will throw unhandled errors and kill the process,
*	meaning that watches will die when errors are reported. By using 
*	one of the provided error handlers, you can suppress warnings.
*
*  
*   Command Line Option:
*	--fatal=[warning|error|off]
*	--notifyerror=[true|false]
*	
*	Controls the level at which errors are treated as fatal.
*	By default, this is set to 'error', but it is useful to override
*	this in watch tasks to 'off' to keep gulp running continuously.
*	
*	Usage: 
*	var error = require('../util/handleErrors.js');
*
*	// Task that emits an error that's treated as an error.
*	gulp.task('example', function() {
*   	return gulp.src('example.js')
*      		.pipe(somePlugin()).
*      		.on('error', error.onError);		// <- important line
*	});
*
*	// Task that emits an error that's treated as a warning.
*	gulp.task('example', function() {
*   	return gulp.src('example.js')
*      		.pipe(somePlugin()).
*      		.on('error', error.onWarning); 		// <- important line
*	});
*
*	// Watch task that logs errors but doesn't kill the process
*	gulp.task('watch', function() {
*		error.fatalLevel = error.fatalLevel || 'off'; // <- change default
* 		gulp.watch(testfiles, ['error']);
*	});
*
**/

// Load Defaults
var defaultNotifyError = 'true';
var defaultFatalLevel = 'error'


// Load Dependencies
var notifier	= require("node-notifier")
	gutil		= require("gulp-util")
	yargs		= require('yargs');


gutil.log('Starting Error Reporting Module',  gutil.colors.magenta(__filename));

// Load Command line options:
var fatalLevel = yargs.argv.fatal || defaultFatalLevel;
var notifyError = yargs.argv.notifyerror || defaultNotifyError;

gutil.log('Setting fatal error level to', '\'' + gutil.colors.cyan(fatalLevel) + '\'.', 'Use --fatal=[warning|error|off] to change.');
gutil.log('Setting notify on error to', gutil.colors.cyan(notifyError) + '.', 'Use --notifyerror=[true|false] to change.');


// Define external Module
var ERROR_LEVELS = ['error', 'warning'];

module.exports = {
	onWarning: function(error) { handleError.call(this, 'warning', error);},
	onError: function(error) { handleError.call(this, 'error', error);},
	fatalLevel: fatalLevel
};

// Return true if the given level is equal to or more severe than
// the configured fatality error level.
// If the fatalLevel is 'off', then this will always return false.
// Defaults the fatalLevel to 'error'.
function isFatal(level) {
   return ERROR_LEVELS.indexOf(level) <= ERROR_LEVELS.indexOf(fatalLevel);
}

// Handle an error based on its severity level.
// Log all levels, and exit the process for fatal levels.
function handleError(level, error) {
	var color = (level == 'error') ? gutil.colors.red : gutil.colors.yellow;
  	gutil.log(color(error.message));
  	if (notifyError == 'true') {
   			notifier.notify({title: 'Gulp: ' + level, message: error.message});
	}
   	if (isFatal(level)) { 
      	process.exit(1);
   	}
}