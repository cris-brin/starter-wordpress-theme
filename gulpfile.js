const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
const autoprefixer = require('gulp-autoprefixer');


/**
 * Compiler SCSS to CSS 
 */
gulp.task('sass-compile', function () {
    return gulp.src('./assets/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./assets/css/'));
});


/**
 * Autoprefixer
 */
gulp.task('style-ready', function () {


    gulp.src('./assets/css/style.css')
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest('css-ready'));

});

gulp.task('watch', function () {
    gulp.watch('./assets/sass/**/*.scss', gulp.series('sass-compile'));
    gulp.watch('./assets/sass/**/*.scss', gulp.series('style-ready'));
});