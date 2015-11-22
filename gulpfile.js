var gulp = require('gulp');
var jade = require('gulp-jade');
var concat = require('gulp-concat'); // join a group of files (gulp.dest) into a single file
var sass = require('gulp-sass');
var browserify = require('gulp-browserify');
var pods = require('jspods');

var paths = { in : {
        jade: './views/*.jade',
        scss: './styles/*.scss',
        js: './js/*.js',
	images: './images/*',
    },
    out: {
        html: './public',
        css: './public/css',
        js: './public/js',
	images: './public/images',
    }
};

gulp.task('default', ['templates', 'styles', 'js', 'test']);

gulp.task('templates', function () {
    return gulp.src(paths.in.jade)
        .pipe(jade({
            locals: {
                podcast: pods.read('episodes.json'),
            }
        }))
        .pipe(gulp.dest(paths.out.html));
});

gulp.task('styles', function () {
    return gulp.src(paths.in.scss)
        .pipe(sass({
            includePaths: require('node-normalize-scss').includePaths
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

gulp.task('test', function () {

});

gulp.task('watch', ['templates', 'styles', 'js'], function () {
    gulp.watch(paths.in.jade, ['templates']);
    gulp.watch(paths.in.scss, ['styles']);
    gulp.watch(paths.in.js, ['js']);
});
