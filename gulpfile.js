/* eslint-env node */

const gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', function () {
	gulp
		.src('css/**/*.css')
		.pipe(autoprefixer({browsers: ['last 2 versions']}))
		.pipe(gulp.dest('dist/css/'));
});