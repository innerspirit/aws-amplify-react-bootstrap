const babel = require('gulp-babel');
const gulp = require('gulp');
const plumber = require('gulp-plumber');

gulp.task('build', () => (
	gulp.src('src/**')
		.pipe(plumber())
		.pipe(babel())
		.pipe(gulp.dest('dist'))
));
gulp.task('default', ['build']);
gulp.task('watch', () => (gulp.watch('src/**', ['build'])));