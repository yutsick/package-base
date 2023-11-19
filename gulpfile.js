
let project_folder = "dict";
let source_folder = "src";
let wp_folder = "../css/";

let path = {
  build: {
    html: project_folder + "/",
    css: project_folder + "/css/",
    wp_css: wp_folder,
    js: project_folder + "/js/",
    img: project_folder + "/img/",
    fonts: project_folder + "/fonts/"
  },
  src: {
    html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
    css: source_folder + "/scss/style.scss",
    js: source_folder + "/js/script.js",
    img: source_folder + "/img/**/*",
    fonts: source_folder + "/fonts/*.ttf"
  },
  watch: {
    html: source_folder + "/**/*.html",
    css: source_folder + "/scss/**/*.scss",
    js: source_folder + "/js/**/*.js",
    img: source_folder + "/img/**/*"
  },
  clean: "./" + project_folder + "/"
};

let { src, dest } = require('gulp'),
  gulp = require('gulp'),
  browsersync = require("browser-sync").create(),
  fileinclude = require("gulp-file-include"),
  scss = require('gulp-sass')(require('sass')),
  autoprefixer = require('gulp-autoprefixer'),
  group_media = require('gulp-group-css-media-queries'),
  clean_css = require('gulp-clean-css'),
  rename = require('gulp-rename'),// rename files to .min version
  uglify_js = require('gulp-uglify-es').default;

function browserSync(params) {
  browsersync.init({
    server: {
      baseDir: "./" + project_folder + "/"
    },
    port: 3000,
    notify: false

  });
}

function html() {
  return src(path.src.html)
    .pipe(fileinclude())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream());
}

function img() {
  return src(path.src.img)
    .pipe(dest(path.build.img))
}

function css() {
  return src(path.src.css)
    .pipe(
      scss({
        outputStyle: "expanded"
      })
    )
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 5 versions'],
      cascade: true
    }))
    .pipe(
      group_media()
    )
    .pipe(clean_css())
    .pipe(
      rename({
        extname: ".min.css"
      })
    )
    .pipe(dest(path.build.css))
    .pipe(dest(path.build.wp_css))
    .pipe(browsersync.stream());
}

function js() {
  return src(path.src.js)
    .pipe(fileinclude())

    .pipe(
      uglify_js()
    )
    .pipe(
      rename({
        extname: ".min.js"
      })
    )
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream());
}

function watchFiles(params) {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], img);
}

let build = gulp.series(gulp.parallel(js, html, css, img));
let watch = gulp.parallel(build, browserSync, watchFiles);

exports.js = js;
exports.html = html;
exports.css = css;
exports.img = img;
exports.build = build;
exports.watch = watch;
exports.default = watch;