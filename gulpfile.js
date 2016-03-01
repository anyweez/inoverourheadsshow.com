/* jslint node: true */
var gulp = require('gulp');
var jade = require('gulp-jade');
var concat = require('gulp-concat'); // join a group of files (gulp.dest) into a single file
var sass = require('gulp-sass');
var browserify = require('gulp-browserify');
var pods = require('pods');

var paths = { 
    in : {
        jade: './views/*.jade',
        scss_entry: './styles/main.scss',
        scss: './styles/*.scss',
        js: './js/*.js',
        images: './images/*',
        favicon: './images/favicon.ico',
    },
    out: {
        html: './public',
        css: './public/css',
        js: './public/js',
        images: './public/images',
    }
};

gulp.task('default', ['templates', 'favicon', 'styles', 'js', 'images']);

gulp.task('templates', function (done) {
    return pods.read('episodes.json', function(podcast) {
        gulp.src(paths.in.jade)
            .pipe(jade({
                locals: {
                    podcast: podcast,
                }
            }))
            .pipe(gulp.dest(paths.out.html));
        done();
    });
});

gulp.task('styles', function () {
    return gulp.src(paths.in.scss_entry)
        .pipe(sass({
            includePaths: [
                require('node-normalize-scss').includePaths, 
            ].concat(require('node-neat').includePaths),
        }).on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(gulp.dest(paths.out.css));
});

gulp.task('js', function () {
    return gulp.src(paths.in.js)
        .pipe(browserify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(paths.out.js));
});

gulp.task('images', function() {
    return gulp.src(paths.in.images)
        .pipe(gulp.dest(paths.out.images));
});

gulp.task('favicon', function() {
    return gulp.src(paths.in.favicon)
        .pipe(gulp.dest('./public'));
});

/*
gulp.task('test', function () {

});
*/
gulp.task('watch', ['templates', 'styles', 'js'], function () {
    gulp.watch(paths.in.jade, ['templates']);
    gulp.watch(paths.in.scss, ['styles']);
    gulp.watch(paths.in.js, ['js']);
});
