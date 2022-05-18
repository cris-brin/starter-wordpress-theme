const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
const autoprefixer = require('gulp-autoprefixer');


/**
 * Compiler SCSS to CSS 
 */
gulp.task('sass-compile', function () {
    gulp.src('./assets/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./assets/css/'));

});

gulp.task('watch', function () {
    gulp.watch('./assets/sass/**/*.scss', gulp.series('sass-compile'));
});