var gulp = require('gulp'),
	watch = require('gulp-watch'),
	webpack = require('gulp-webpack');;

gulp.task('webpack', function() {
	webpack();
});

gulp.task('watch', function() {
	gulp.watch('./js/*.js', ['webpack'])
});