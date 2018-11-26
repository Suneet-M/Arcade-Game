/* eslint-env node */

// reference gulp plugins
const gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync').create(),
	concat = require('gulp-concat'),
	babel = require('gulp-babel');

gulp.task('default', ['copy-html', 'copy-images', 'styles', 'scripts'],
	function () {
		gulp.watch('img/*', ['copy-images']);
		gulp.watch('css/**/*.css', ['styles']);
		gulp.watch('./index.html', ['copy-html'])
			.on('change', browserSync.reload); // to reload site when HTML is edited
		gulp.watch('js/**/*.js', ['scripts'])
			.on('change', browserSync.reload); // to reload site when JS is edited

		browserSync.init({
			server: 'docs/'
		}); // launch site with browsersync connected
	}
);

// HTML
gulp.task('copy-html', function() {
	gulp
		.src('./index.html')
		.pipe(gulp.dest('docs/'));
});

// Images
gulp.task('copy-images', function() {
	gulp
		.src('img/*')
		.pipe(gulp.dest('docs/img/'));
});

// CSS
gulp.task('styles', function () {
	gulp
		.src('css/**/*.css')
		.pipe(autoprefixer({browsers: ['last 2 versions']})) // add vendor prefixes
		.pipe(concat('all.css')) // unify all css files
		.pipe(gulp.dest('docs/css/'))
		.pipe(browserSync.stream()); // stream changes to browsersync site
});

// JS
gulp.task('scripts', function () {
	gulp
		.src([
			'js/**/resources.js',
			'js/**/engine.js',
			'js/**/app.js',
		]) // to preserve the sequence of code injected in index.html
		.pipe(babel({
			presets: ['@babel/env']
		})) // convert es6 to es5 for wide browser support
		.pipe(concat('all.js')) // unify all js files
		.pipe(gulp.dest('docs/js/'));
});