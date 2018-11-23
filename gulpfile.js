/* eslint-env node */

const gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task('default', function () {
	gulp.watch('css/**/*.css', ['styles']);
	gulp.watch('js/**/*.js', ['scripts']);
});

gulp.task('styles', function () {
	gulp
		.src('css/**/*.css')
		.pipe(autoprefixer({browsers: ['last 2 versions']}))
		.pipe(gulp.dest('dist/css/'));
});

gulp.task('scripts', function () {
	gulp
		.src('js/**/*.js')
		.pipe(gulp.dest('dist/js/'));
});