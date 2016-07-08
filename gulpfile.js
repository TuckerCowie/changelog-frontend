'use strict';

var rm = require('gulp-rimraf');
var gulp = require('gulp');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var pug = require('gulp-pug');
var imagemin = require('gulp-imagemin');
var fontmin = require('gulp-fontmin');
var ttf2woff2 = require('gulp-ttf2woff2');
var wiredep = require('wiredep').stream;

var dist = 'dist';

var sources = {
	html: dist + '/**/*.html',
	views: ['src/views/**/*.pug', '!src/views/{partials,templates}/*.pug'],
	pug: ['src/views/**/*.pug'],
	sass: 'src/sass/**/*.sass',
	images: 'assets/img/**/*.{svg,png,jpg}',
	fonts: 'assets/fonts/**/*.ttf',
};

gulp.task('default', ['views', 'bower', 'sass', 'images', 'fonts']);

gulp.task('watch', ['clean', 'default'], function liveReload() {
	livereload.listen();
	gulp.watch(sources.pug, ['views']);
	gulp.watch(sources.sass, ['sass']);
	gulp.src(dist + '/index.html');
});

gulp.task('clean', function cleanDist() {
	return gulp.src(dist + '/*.*').pipe(rm());
});

gulp.task('views', function buildHTML() {
	return gulp.src(sources.views)
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
		.pipe(autoprefixer({browsers: 'last 3 versions'}))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest(dist))
	.pipe(livereload());
});

gulp.task('clean:images', function cleanDistImages() {
	return gulp.src(dist + '/img').pipe(rm());
});

gulp.task('images', ['clean:images'], function compressImages() {
	gulp.src(sources.images)
	.pipe(imagemin())
	.pipe(gulp.dest(dist + '/img'));
});

gulp.task('clean:fonts', function cleanDistFonts() {
	return gulp.src(dist + '/fonts').pipe(rm());
});

gulp.task('fonts', ['clean:fonts'], function compressFonts() {
	gulp.src(sources.fonts)
	.pipe(fontmin({hinting: false}))
	.pipe(ttf2woff2({clone: true}))
	.pipe(gulp.dest(dist + '/fonts'));
});

gulp.task('bower', ['views'], function addBowerDependencies() {
	return gulp.src(sources.html)
    .pipe(wiredep())
    .pipe(gulp.dest(dist));
});
