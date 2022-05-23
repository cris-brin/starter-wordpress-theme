const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano')
const gulp_watch = require('gulp-watch');
const autoprefixer = require('gulp-autoprefixer');
const { src, series, parallel, dest, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));

const jsPath = 'assets/js/**/*.js';
const cssPath = 'assets/css/**/*.css';

/**
 * Compiler SCSS to CSS & autoprefixer
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

gulp.task('gulp-watch', function () {
    gulp.watch('./assets/sass/**/*.scss', gulp.series('sass-compile'));
});


/**
 * Production function - minify, sass-compile, autoprefixer
 */
function copyHtml() {
    return src('*.php').pipe(gulp.dest('production'));
}

function imgTask() {
    return src('images/*').pipe(imagemin()).pipe(gulp.dest('production/images'));
}

function jsTask() {
    return src(jsPath)
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('production/assets/js'));
}

function cssTask() {
    return src(cssPath)
        .pipe(sourcemaps.init())
        .pipe(concat('style.css'))
        .pipe(postcss([cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('production/assets/css'));
}

exports.cssTask = cssTask;
exports.jsTask = jsTask;
exports.imgTask = imgTask;
exports.copyHtml = copyHtml;
exports.default = parallel(copyHtml, imgTask, jsTask, cssTask);

/**
 * End Production function - minify, sass-compile, autoprefixer
 */