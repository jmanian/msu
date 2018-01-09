var gulp = require('gulp');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var minifycss = require('gulp-minify-css');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var inlineCss = require('gulp-inline-css');
var replace = require('gulp-replace');
var fs = require('fs');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
       baseDir: "./"
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('images', function(){
  gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images/'));
});

gulp.task('styles', function(){
  gulp.src(['src/styles/**/[^_]*.scss'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass())
    .pipe(gulp.dest('dist/styles'))
});
    // .pipe(minifycss())
    // .pipe(gulp.dest('dist/styles'))

gulp.task('minify-styles', function(){
  gulp.src(['src/styles/**/[^_]*.scss'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass())
    .pipe(gulp.dest('dist/styles'))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/styles'))
});

gulp.task('inline-css', ['styles'], function() {
  gulp.src('./*.html')
    .pipe(replace(/<style data-inject="critical">.[\s\S]*<\/style>/, function() {
      var styles = fs.readFileSync('dist/styles/critical.css');
      return '<style data-inject="critical">'+styles+'</style>';
    }))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('scripts', function(){
  gulp.src('src/scripts/**/*.js')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('minify-scripts', function() {
  gulp.src('src/scripts/**/*.js')
    .pipe(plumber({
      errorHandler: function(error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
});

gulp.task('default', ['scripts', 'images', 'styles', 'inline-css', 'browser-sync'], function(){
  gulp.watch("src/styles/**/*.scss", ['styles']);
  gulp.watch("dist/styles/**/*.css", ['inline-css']);
  gulp.watch("src/scripts/**/*.js", ['scripts']);
  gulp.watch("*.html", ['bs-reload']);
});

gulp.task('minify', ['mininfy-styles', 'minify-scripts', 'inline-css']);
