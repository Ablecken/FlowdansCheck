
const gulp = require('gulp');

// scripts
const scripts = require('./scripts');
gulp.task('scripts',
    scripts({
		src: './src/content/js/app.js',
		dest: './content/js',
		watch: './src/content/js/**/*.js',
		file: 'app.js'
	})
);


// watch
gulp.task('watch',
    gulp.parallel(
        'scripts'
    )
);