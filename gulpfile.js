"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var rename = require("gulp-rename");
var server = require("browser-sync").create();
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
var cheerio = require("gulp-cheerio");
var htmlmin = require("gulp-htmlmin");
var uglify = require("gulp-uglify");

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
  .pipe(plumber())
  .pipe(sourcemap.init())
  .pipe(sass())
  .pipe(postcss([
    autoprefixer()
    ]))
  .pipe(sourcemap.write("."))
  .pipe(gulp.dest("build/css"))
  .pipe(csso())
  .pipe(rename("style.min.css"))
  .pipe(sourcemap.write("."))
  .pipe(gulp.dest("build/css"))
  .pipe(server.stream());
  });

gulp.task("compressjs", function () {
  return gulp.src("source/js/*.js")
    .pipe(uglify())
    .pipe(rename({
      suffix: ".min"
      }))
    .pipe(gulp.dest("build/js"));
});

gulp.task("sprite", function () {
  return gulp.src("source/img/inline-*.svg")
  .pipe(svgstore({
    inlineSvg: true
    }))
  .pipe(cheerio({
    run: function ($) {
      $("[fill]").removeAttr("fill");
      $("svg").addClass("visually-hidden");
      },
      parserOptions: { xmlMode: true }
      }))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build/img"));
  });

gulp.task("html", function () {
  return gulp.src("source/*.html")
  .pipe(posthtml([
    include()
    ]))
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest("build"));
  });

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.mozjpeg({progressive: true}),
    imagemin.svgo()
    ]))
  .pipe(gulp.dest("build/img"));
  });

gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest("build/img"));
  });

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
    });

  gulp.watch("source/sass/**/*.scss", gulp.series("css"));
  gulp.watch("source/img/inline-*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/js/*.js", gulp.series("compressjs", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
  });

gulp.task("refresh", function (done) {
  server.reload();
  done();
  });

gulp.task("copy", function () {
  return gulp.src([
    "source/css/style.css",
    "source/css/style.css.map",
    "source/fonts/**/*.{woff,woff2}",
    "source/*.ico"
    ], {
      base: "source"
      })
  .pipe(gulp.dest("build"));
  });

gulp.task("clean", function () {
  return del("build");
  });

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "css",
  "images",
  "webp",
  "sprite",
  "html",
  "compressjs"
  ));

gulp.task("start", gulp.series("build", "server"));
