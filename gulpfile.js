/* eslint-env node */

const gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync').create();

gulp.task('default', ['copy-html', 'copy-images', 'styles', 'scripts'],
	function () {
		gulp.watch('img/*', ['copy-images']);
		gulp.watch('css/**/*.css', ['styles']);
		gulp.watch('./index.html', ['copy-html']).on('change', browserSync.reload);
		gulp.watch('js/**/*.js', ['scripts']).on('change', browserSync.reload);

		browserSync.init({
			server: 'dist/'
		});
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
		.pipe(gulp.dest('dist/css/'))
		.pipe(browserSync.stream());
});

gulp.task('scripts', function () {
	gulp
		.src('js/**/*.js')
		.pipe(gulp.dest('dist/js/'));
});