/* eslint-env node */

const gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task('default', ['copy-html', 'copy-images', 'styles', 'scripts'],
	function () {
		gulp.watch('./index.html', ['copy-html']);
		gulp.watch('img/*', ['copy-images']);
		gulp.watch('css/**/*.css', ['styles']);
		gulp.watch('js/**/*.js', ['scripts']);
	}
);

gulp.task('copy-html', function() {
	gulp
		.src('./index.html')
		.pipe(gulp.dest('dist/'));
});

gulp.task('copy-images', function() {
	gulp
		.src('img/*')
		.pipe(gulp.dest('dist/img/'));
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