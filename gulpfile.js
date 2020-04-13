const { src, dest, watch } = require('gulp');

const babel            = require('gulp-babel');
const pug              = require('gulp-pug');
const postcss          = require('gulp-postcss');
const concat           = require('gulp-concat');
const imagemin         = require('gulp-imagemin');
const plumber          = require('gulp-plumber');
const livereload       = require('gulp-livereload');
const injectSvg        = require('gulp-inject-svg');
const clean            = require('gulp-clean');
const csso             = require('gulp-csso');
const autoprefixer     = require('autoprefixer')
const postCssImport    = require('postcss-easy-import');
const postcssPresetEnv = require('postcss-preset-env');

const paths = {
	css    : 'src/css/parts/*.css',
	html   : 'src/pug/*.pug',
	js     : 'src/js/*.js',
	images : 'src/assets/images/*.png',
	icons  : 'src/assets/icons/*.svg'
};

livereload({ start: true });

function cleanBuild() {
	src('build/**/*.*', { read: false })
		.pipe(clean());
}

function html(cb) {
	src(paths.html)
		.pipe(plumber())
		.pipe(pug({ pretty: true }))
		.pipe(injectSvg({ base: '/src/assets/icons/' })) 
		.pipe(dest('build'))
		.pipe(livereload());

	cb();
}

function css(cb) {
  	src([ 'src/css/global.css', paths.css ])
		.pipe(plumber())
		.pipe(postcss([
			postCssImport(),
			postcssPresetEnv(),
			autoprefixer()
		]))
		.pipe(concat('index.css'))
		.pipe(csso())
		.pipe(dest('build/css'))
		.pipe(livereload());

  	cb();
}

function js(cb) {
	src(paths.js)
		.pipe(babel({ presets: ['@babel/env'] }))
		.pipe(plumber())
		.pipe(concat('app.js'))
		.pipe(dest('build/js'))
		.pipe(livereload());

  	cb();
}

function images(cb) {
	src(paths.images)
		.pipe(plumber())
		.pipe(imagemin([
			imagemin.optipng({ optimizationLevel: 5 })
		]))
		.pipe(dest('build/assets/images'))
		.pipe(livereload());

    cb();
}

exports.default = function () {
	livereload.listen();

	cleanBuild();

	watch('src/pug/**/*.pug', { ignoreInitial: false }, html);
	watch('src/css/**/*.css', { ignoreInitial: false }, css);
	watch(paths.js,           { ignoreInitial: false }, js);
	watch(paths.images,       { ignoreInitial: false }, images);
};
