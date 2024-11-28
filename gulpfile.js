const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const inlineSource = require('gulp-inline-source');
const inline = require('gulp-inline');
const rename = require('gulp-rename');
const replace = require('gulp-replace');

const paths = {
    html: 'src/*.html',
    scss: 'src/scss/*.scss',
    css: ['src/css/*.css', '!src/css/*.min.css'], // Exclude already minified CSS files
    js: ['src/js/*.js', '!src/js/*.min.js'] // Exclude already minified JS files
};

// Compile SCSS to CSS
gulp.task('sass', () => {
    return gulp.src(paths.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css'));
});

// Minify CSS
gulp.task('minify-css', () => {
    return gulp.src(paths.css)
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('src/css'));
});

// Minify JS
gulp.task('minify-js', () => {
    return gulp.src(paths.js)
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('src/js'));
});

// Adjust paths in CSS
gulp.task('adjust-paths', () => {
    return gulp.src('src/css/*.min.css')
        .pipe(replace('../assets/', 'assets/')) // Adjust the path as needed
        .pipe(gulp.dest('src/css'));
});

// Inline CSS and JS into HTML, then minify HTML
gulp.task('inline', () => {
    return gulp.src(paths.html)
        .pipe(inlineSource({ compress: false }))
        .pipe(inline({
            base: 'src/',
            disabledTypes: ['svg', 'img'], // Only inline css & js files
        }))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('.'));
});

// Default task
gulp.task('default', gulp.series('sass', 'minify-css', 'adjust-paths', 'minify-js', 'inline'));