var gulp = require('gulp'),
    isDev = process.env["SYMFONY_ENV"] === "dev",
    browserSync;

function getBrowserSync() {
    if (!browserSync) {
        browserSync = require("browser-sync").create()
    }
    return browserSync
}

// SASS
gulp.task('sass', function () {
    var sass = require('gulp-sass');

    if(isDev) {
        return gulp.src('./client/scss/**/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('./web/css'));
    }
    else {
        return gulp.src('./client/scss/**/*.scss')
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(gulp.dest('./web/css'));
    }

});

// TS
gulp.task('ts', function () {
    var ts = require('gulp-typescript');
    var concat = require('gulp-concat');
    var sourcemaps = require('gulp-sourcemaps');

    if(isDev) {
        var tslint = require('gulp-tslint');

        return gulp.src('./client/ts/**/*.ts')
            .pipe(tslint())
            .pipe(tslint.report("verbose"))
            .pipe(sourcemaps.init())
            .pipe(ts({
                noImplicitAny: true,
                out: 'main.js'
            }))
            .pipe(concat('main.js'))
            .pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest('./web/js'));
    }
    else {
        var uglify = require('gulp-uglify');

        return gulp.src('./client/ts/**/*.ts')
            .pipe(sourcemaps.init())
            .pipe(ts({
                noImplicitAny: true,
                out: 'main.js'
            }))
            .pipe(uglify({
                compress: {
                    drop_console: true
                }
            }))
            .pipe(concat('main.js'))
            .pipe(sourcemaps.write('./maps'))
            .pipe(gulp.dest('./web/js'));
    }
});

// Live watcher
gulp.task("livereload:sass", ["sass"], function() {
    return gulp
        .src("web/css/**/*.css")
        .pipe(getBrowserSync().stream());
});
gulp.task("livereload:ts", ["ts"], function() {
    return gulp
        .src("web/js/**/*.js")
        .pipe(getBrowserSync().stream());
});

// LIVERELOAD
gulp.task("browser-sync", function(cb) {
    getBrowserSync().init({
        port: 11080,
        /*https: {
            key: "/workspace/cert/hulladektozsde.key",
            cert: "/workspace/cert/hulladektozsde.crt"
        },*/
        reloadDebounce: 500,
        ghostMode: false,
        online: false,
        open: false,
        notify: false,
        logLevel: "info"
    }, cb)
});

gulp.task("compile", ["sass", "ts", "bower", "external-js", "image-compress"]);

// WATCH Task
gulp.task("watch", ["sass", "browser-sync"], function() {
    gulp.watch("./client/scss/**/*.scss", ["livereload:sass"]);
    gulp.watch(["./client/ts/**/*.ts"], ["livereload:ts"]);
});

//Bower task
gulp.task("bower", ["bower-js", "bower-css"]);

gulp.task("bower-js", function() {
    var uglify = require('gulp-uglify'),
        concat = require('gulp-concat'),
        debug = require('gulp-debug');

    var bowerDir = __dirname + '/bower_components/',
        nodeModules = __dirname + '/node_modules/',
        lib = __dirname + '/client/lib/js/',
        fileList = [
            bowerDir + 'jquery/dist/jquery.js',
            bowerDir + 'bootstrap/dist/js/bootstrap.js',
            bowerDir + 'respondJS/dest/respond.js'
        ];

    return gulp.src(fileList)
        .pipe(uglify())
        .pipe(debug())
        .pipe(concat('bower.js'))
        .pipe(gulp.dest('./web/js'));
});

// SASS
gulp.task('bower-css', function () {
    var concat = require('gulp-concat'),
        debug = require('gulp-debug');

    var bowerDir = __dirname + '/bower_components/',
        fileList = [
            bowerDir + 'bootstrap/dist/css/bootstrap.css',
            bowerDir + 'bootstrap/dist/css/bootstrap-theme.css',
            bowerDir + 'font-awesome/css/font-awesome.css'
        ];

    return gulp.src(fileList)
        .pipe(debug())
        .pipe(concat('bower.css'))
        .pipe(gulp.dest('./web/css'));
});

gulp.task('external-js', function () {
    var concat = require('gulp-concat');
    var uglify = require('gulp-uglify');

    return gulp.src('./client/lib/js/external-js.js')
        .pipe(uglify({
            compress: {
                drop_console: true
            }
        }))
        .pipe(concat('external.js'))
        .pipe(gulp.dest('./web/js'));
});

gulp.task('sass-lint', function () {
    var sass = require('gulp-sass'),
        sassLint = require('gulp-sass-lint');

    return gulp.src('./client/scss/**/*.scss')
         .pipe(sassLint())
         .pipe(sassLint.format())
         .pipe(sassLint.failOnError());
});

var log = function(file, cb) {
    console.log('Trying to compress image: ' + file.path);
    cb(null, file);
};

gulp.task('image-compress', function () {
    var imageMin = require('gulp-imagemin'),
        rename = require('gulp-rename'),
        //map = require('map-stream'),
        imgSrc = './web/img/**/*',
        fileLocation = '';

    gulp.src(imgSrc,  {base: './'})
        .pipe(imageMin())
        .pipe(rename(function(path) {
            fileLocation = path.dirname;
        }))
        //.pipe(map(log))
        .pipe(gulp.dest(fileLocation));
});

// DEFAULT task
gulp.task("default", ["compile"]);
