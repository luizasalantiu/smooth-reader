// Include gulp
var gulp = require('gulp');

// Include plugins
var jshint = require('gulp-jshint'),
    compass = require('gulp-compass'),
    sass = require('gulp-sass'),
    minify = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber');

// Set paths
var paths = {
    output: {
        scripts: 'assets/scripts',
        styles: 'assets/styles'
    },
    scripts: [
        'content/*.js',
        'src/scripts/effects/*.js',
        'src/scripts/util.js',
        'src/scripts/timelineControls.js',
        'src/scripts/story.js',
        'src/scripts/storyViewModel.js',
        'src/scripts/storyAnimation.js',
        'src/scripts/main.js'
    ],
    sass: [
        'src/sass/reset.scss',
        'src/sass/main.scss'
    ],
    sassWatch: [
        'src/sass/**/*.scss'
    ]
};

// Lint task
gulp.task('lint', function() {
    return gulp.src(paths.scripts)
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile SASS, concatenate & minify
gulp.task('css', function() {
    return gulp.src(paths.sass)
        .pipe(plumber())
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest(paths.output.styles))
        .pipe(minify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.output.styles));
});

// Concatenate & minify js
gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(plumber())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(paths.output.scripts))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest(paths.output.scripts));
});

// Watch files for changes
gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['lint', 'scripts']);
    gulp.watch(paths.sassWatch, ['css']);
});

// Default task
gulp.task('default', ['lint', 'css', 'scripts', 'watch']);