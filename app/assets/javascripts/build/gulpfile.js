var gulp = require('gulp');
var dir_path = __dirname + '/';

//JSHint
var jshint = require('gulp-jshint');
var reporter = require('jshint-stylish');

gulp.task('lint', function(){
    return gulp.src(dir_path + '/app/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(reporter))
        .pipe(jshint.reporter('fail'));
});

//Browserify
var browserify = require('gulp-browserify');

gulp.task('browserify', function(){
    return gulp.src(dir_path + '/app/app.js')
            .pipe(browserify({
                    debug: true,
                    transform: ['brfs']
                }))
            .pipe(gulp.dest(dir_path + '../'));
});

//Set up build and watch
gulp.task('build', ['lint', 'browserify']);

gulp.task('watch',function(){
    gulp.watch(dir_path + '/app/**/*.js', ['build']);
});