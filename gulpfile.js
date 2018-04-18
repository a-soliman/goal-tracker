// 'use strict';

const gulp 			= require('gulp');
const gulpCopy		= require('gulp-copy');
const plumber		= require('gulp-plumber');
const sass 			= require('gulp-sass');
const uglify 		= require('gulp-uglify');
const babel			= require('gulp-babel');
const watch 		= require('gulp-watch');
const concat		= require('gulp-concat');
const minifyCss		= require('gulp-minify-css');
const autoprefixer	= require('gulp-autoprefixer');
const livereload	= require('gulp-livereload');
const soursemaps	= require('gulp-sourcemaps');

// FILE PATH
const _scripts_path = 'src/js/**/*.js';
const _HTML_path 	= 'src/*.html';
const _sass_path	= 'src/scss/**/*.scss'
const _dist_path	= 'dist/'			

gulp.task('copy', () => {
	console.log('Starting COPY task')
	return gulp.src(_HTML_path)
		.pipe(gulpCopy(_dist_path, {prefix: 1}))
		.pipe(livereload())
});


gulp.task('sass', () => {
	console.log('Starting SASS task')
	return gulp.src ('src/scss/styles.scss')
		.pipe(plumber( function (err) {
			console.log('SASS task error');
			console.log(err);
			this.emit('end')
		}))
		.pipe(soursemaps.init())
		.pipe(autoprefixer())
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(soursemaps.write())
		.pipe(gulp.dest(_dist_path + 'css/'))
		.pipe(livereload())
});

gulp.task('sass:watch', () => {
	gulp.watch('src/sass/**/*.scss', ['sass']);
});

gulp.task('scripts', () => {
	console.log('Starting SCRIPTS task')
	return gulp.src(_scripts_path)
		.pipe(plumber( function(err) {
			console.log('SCRIPTS task error');
			console.log(err);
			this.emit('end')
		}))
		.pipe(soursemaps.init())
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(uglify().on('error', (e) => {
			console.log(e)
		}))
		.pipe(soursemaps.write())
		.pipe(gulp.dest('dist/js'))
		.pipe(livereload())
})

gulp.task('default', ['copy', 'scripts', 'sass'],() => {
	console.log('Starting DEFAULT task')
})

gulp.task('server', ['default'],() => {
	console.log('Starting WATCH task')
	require('./server.js')
	livereload.listen(35729);
	gulp.watch(_HTML_path, ['copy'])
	gulp.watch(_scripts_path, ['scripts'])
	gulp.watch(_sass_path, ['sass'])
});













