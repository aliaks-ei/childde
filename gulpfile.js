const { src, dest, parallel, watch, series } = require('gulp');
const pug = require('gulp-pug');
const postcss = require('gulp-postcss')
const postcssPresetEnv = require('postcss-preset-env');
const postCssImport = require('postcss-easy-import');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const svgo = require('gulp-svgo');
const autoprefixer = require('autoprefixer')
const gulpStylelint = require('gulp-stylelint');
const plumber = require('gulp-plumber');

const paths = {
  css: 'src/css/*.css',
  html: 'src/html/**/*.pug',
  fonts: 'src/fonts/**/*.*',
  js: 'src/js/*.js',
  images: 'src/images/*'
}

function html(cb) {
  src(paths.html)
    .pipe(plumber())
    .pipe(pug())
    .pipe(dest('build/'))

  cb()
}

function fonts(cb) {
  src(paths.fonts)
    .pipe(dest('build/fonts'))
  cb()
}

function css(cb) {
  src(paths.css)
    .pipe(plumber())
    .pipe(postcss([
      postCssImport(),
      postcssPresetEnv(/* pluginOptions */),
      autoprefixer()
    ]))
    .pipe(minifyCSS())
    .pipe(dest('build/css'))

  cb()
}

function js(cb) {
  src(paths.js, { sourcemaps: true })
    .pipe(plumber())
    .pipe(concat('app.min.js'))
    .pipe(dest('build/js', { sourcemaps: true }))

  cb()
}

function images(cb) {
  src(paths.images)
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
          plugins: [
              {removeViewBox: true},
              {cleanupIDs: false}
          ]
      })
    ]))
    .pipe(plumber())
    .pipe(dest('build/images'))

    cb()
}

exports.default = function(cb) {
    watch('src/css/**/*.css', { ignoreInitial: false }, css);
    watch(paths.fonts, { ignoreInitial: false }, fonts);
    watch(paths.html, { ignoreInitial: false }, html);
    watch(paths.js, { ignoreInitial: false }, js);
    watch(paths.images, { ignoreInitial: false }, images);
};
