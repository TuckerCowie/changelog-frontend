'use strict';

var del = require('del');
var gulp = require('gulp');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var pug = require('gulp-pug');

var sources = {
	views: ['src/views/**/*.pug', '!src/views/{partials,templates}/*.pug'],
	pug: ['src/views/**/*.pug'],
	sass: 'src/sass/**/*.sass',
};

var dist = 'dist';

gulp.task('default', ['sass', 'views']);

gulp.task('clean', function cleanDist() {
	del(dist);
});

gulp.task('watch', ['clean', 'default'], function liveReload() {
	livereload.listen();
	gulp.watch(sources.pug, ['views']);
	gulp.watch(sources.sass, ['sass']);
	gulp.src(dist + '/index.html');
});

gulp.task('views', function buildHTML() {
	gulp.src(sources.views)
	.pipe(pug({
		pretty: true,
	}))
	.pipe(gulp.dest(dist))
	.pipe(livereload());
});

gulp.task('sass', function buildCSS() {
	gulp.src(sources.sass)
	.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest(dist))
	.pipe(livereload());
});
