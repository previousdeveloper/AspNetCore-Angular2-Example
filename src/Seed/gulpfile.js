/// <binding BeforeBuild='clean-lib, build-spa' Clean='clean-lib' ProjectOpened='clean-lib, build-spa, watch' />
var gulp = require('gulp'),
    merge = require('merge'),
    fs = require("fs"),
    del = require('del'),
    path = require('path'),
    gp_typescript = require('gulp-typescript'),
    gp_concat = require('gulp-concat'),
    gp_rename = require('gulp-rename'),
    gp_uglify = require('gulp-uglify'),
    gp_sourcemaps = require('gulp-sourcemaps');

eval("var project = " + fs.readFileSync("./project.json"));
var lib = "./" + project.webroot + "/lib/";

var paths = {
    npm: './node_modules/',
    tsSource: './wwwroot/app/**/*.ts',
    tsOutput: lib + 'spa/',
    tsDef: lib + 'definitions/',
    jsVendors: lib + 'js',
    jsAngular: lib + 'js/@angular',
    jsAngularWebApi: lib + 'js/angular2-in-memory-web-api',
    jsRxJSVendors: lib + 'js/rxjs',
    cssVendors: lib + 'css',
    imgVendors: lib + 'img',
    fontsVendors: lib + 'fonts'
};

var tsProject = gp_typescript.createProject('./wwwroot/tsconfig.json');

gulp.task('setup-vendors', function (done) {

    //js from node packages
    gulp.src([
    'node_modules/zone.js/dist/zone.js',
    'node_modules/reflect-metadata/Reflect.js',
    'node_modules/systemjs/dist/system.src.js',
    'node_modules/fancybox/dist/js/jquery.fancybox.pack.js'
    ])

        .pipe(gp_uglify())
        .pipe(gp_rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.jsVendors));

    //js from node packages
    gulp.src([
      'node_modules/es6-shim/es6-shim.min.js',
      'node_modules/es6-shim/es6-shim.min.js',
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/bootstrap/dist/js/bootstrap.min.js',
      'bower_components/alertify.js/lib/alertify.min.js'

    ])
        .pipe(gulp.dest(paths.jsVendors));

    //@angular from node package
    gulp.src([
     'node_modules/@angular/**/*.js'
    ]).pipe(gulp.dest(paths.jsAngular));

    //@angular from node package
    gulp.src([
     'node_modules/angular2-in-memory-web-api/**/*.js'
    ])
        .pipe(gp_uglify())
        .pipe(gulp.dest(paths.jsAngularWebApi));

    //rxjs from node package
    gulp.src([
     'node_modules/rxjs/**/*.js'
    ])
        .pipe(gp_uglify())
        .pipe(gulp.dest(paths.jsRxJSVendors));

    ////js from bower
    //gulp.src([

    //]).pipe(gulp.dest(paths.cssVendors));

    //css
    gulp.src([
      'node_modules/bootstrap/dist/css/bootstrap.css',
      'bower_components/alertify.js/themes/alertify.core.css',
      'bower_components/alertify.js/themes/alertify.bootstrap.css',
      'bower_components/alertify.js/themes/alertify.default.css',
      'bower_components/components-font-awesome/css/font-awesome.css',
      'node_modules/fancybox/dist/css/jquery.fancybox.css'
    ]).pipe(gulp.dest(paths.cssVendors));

    //images
    gulp.src([
       'node_modules/fancybox/dist/img/blank.gif',
       'node_modules/fancybox/dist/img/fancybox_loading.gif',
       'node_modules/fancybox/dist/img/fancybox_loading@2x.gif',
       'node_modules/fancybox/dist/img/fancybox_overlay.png',
       'node_modules/fancybox/dist/img/fancybox_sprite.png',
       'node_modules/fancybox/dist/img/fancybox_sprite@2x.png'
    ]).pipe(gulp.dest(paths.imgVendors));

    //fonts
    gulp.src([
      'node_modules/bootstrap/fonts/glyphicons-halflings-regular.eot',
      'node_modules/bootstrap/fonts/glyphicons-halflings-regular.svg',
      'node_modules/bootstrap/fonts/glyphicons-halflings-regular.ttf',
      'node_modules/bootstrap/fonts/glyphicons-halflings-regular.woff',
      'node_modules/bootstrap/fonts/glyphicons-halflings-regular.woff2',
      'bower_components/components-font-awesome/fonts/FontAwesome.otf',
      'bower_components/components-font-awesome/fonts/fontawesome-webfont.eot',
      'bower_components/components-font-awesome/fonts/fontawesome-webfont.svg',
      'bower_components/components-font-awesome/fonts/fontawesome-webfont.ttf',
      'bower_components/components-font-awesome/fonts/fontawesome-webfont.woff',
      'bower_components/components-font-awesome/fonts/fontawesome-webfont.woff2'
    ]).pipe(gulp.dest(paths.fontsVendors));
});

gulp.task('compile-typescript', function (done) {
    var tsResult = gulp.src([
       "node_modules/angular2/bundles/typings/angular2/angular2.d.ts",
       "node_modules/angular2/bundles/typings/angular2/http.d.ts",
       "node_modules/angular2/bundles/typings/angular2/router.d.ts",
       "wwwroot/app/**/*.ts",
    ])
        .pipe(gp_sourcemaps.init())
        .pipe(gp_typescript(tsProject), undefined, gp_typescript.reporter.fullReporter());

    return tsResult.js
        .pipe(gp_sourcemaps.write())
        .pipe(gulp.dest(paths.tsOutput));
});

gulp.task('watch.ts', ['compile-typescript'], function () {
    return gulp.watch('wwwroot/app/**/*.ts', ['compile-typescript']);
});

gulp.task('watch', ['watch.ts']);

gulp.task('clean-lib', function () {
    return del([lib]);
});

gulp.task('build-spa', ['setup-vendors', 'compile-typescript']);