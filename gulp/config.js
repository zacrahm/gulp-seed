var environment = 'DEV';
var app = "test";
var vendor = "vendor";

module.exports = {
	source : {
		js : 'src/**/*.js'
	}, 
	dist: {
		src: 	'dist',
		app: app + '.js',
		vendor: vendor + '.js'
	}
};

