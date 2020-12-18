let gulp = require('gulp')
let cssmin = require('gulp-cssmin')
let htmlmin = require('gulp-htmlmin')
let babel = require('gulp-babel')
let uglify = require('gulp-uglify')

function css() {
    return gulp
        .src('./css/**.css')
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/css'))
}

function html() {
    return gulp
        .src('./html/**')
        .pipe(htmlmin({
            collapseWhitespace: true, // 表示去除空格
            removeEmptyAttributes: true, // 移出空的属性
            minifyCSS: true, // 压缩 style 标签
            minifyJS: true, // 压缩 script 标签
        }))
        .pipe(gulp.dest('./dist/html'))
}

function js() {
    return gulp
        .src('./js/**')
        .pipe(babel({
            presets: ["env"]
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
}
exports.css = css
exports.html = html
exports.js = js