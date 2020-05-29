const { src, dest, watch } = require('gulp');

const babel            = require('gulp-babel');
const pug              = require('gulp-pug');
const postcss          = require('gulp-postcss');
const concat           = require('gulp-concat');
const plumber          = require('gulp-plumber');
const livereload       = require('gulp-livereload');
const svgSymbols       = require('gulp-svg-symbols')
const clean            = require('gulp-clean');
const csso             = require('gulp-csso');
const minify           = require('gulp-minify');
const rename           = require('gulp-rename');
const addsrc           = require('gulp-add-src');
const autoprefixer     = require('autoprefixer')
const postCssImport    = require('postcss-easy-import');
const postcssPresetEnv = require('postcss-preset-env');

const paths = {
	css: [
		'src/assets/styles/variables.css',
		'src/assets/styles/global.css',
		'src/common.blocks/**/*.css', 
		'!src/common.blocks/**/m.*.css'
	],
	mCss   : [ 'src/assets/styles/m.global.css', 'src/common.blocks/**/m.*.css' ],
	js     : 'src/common.blocks/**/*.js',
	html   : 'src/pages/*.pug',
	images : 'src/assets/images/*.png',
	icons  : 'src/assets/icons/*.svg'
};

livereload({ start: true });

function cleanBuild() {
	src('build/**/*.*', { read: false })
		.pipe(clean());
}

function svgSprites() {
	src(paths.icons)
		.pipe(svgSymbols())
		.pipe(dest('build/assets/icons'))
}

function html(cb) {
	src(paths.html)
		.pipe(plumber())
		.pipe(pug({ pretty: true }))
		.pipe(dest('build'))
		.pipe(livereload());

	cb();
}

function css(cb) {
	src(paths.css)
		.pipe(addsrc.append(paths.mCss))
		.pipe(plumber())
		.pipe(postcss([
			postCssImport(),
			postcssPresetEnv(),
			autoprefixer()
		]))
		.pipe(concat('index.css'))
		.pipe(dest('build/css'))
		.pipe(rename('index.min.css'))
		.pipe(csso())
		.pipe(dest('build/css'))
		.pipe(livereload());

  	cb();
}

function js(cb) {
	src(paths.js)
		.pipe(plumber())
		.pipe(concat('index.js'))
		.pipe(babel({ presets: ['@babel/env'] }))
		.pipe(minify({
			ext: {
				src :'.js',
				min :'.min.js'
			}
		}))
		.pipe(dest('build/js'))
		.pipe(livereload());

  	cb();
}

function images(cb) {
	src(paths.images)
		.pipe(plumber())
		.pipe(dest('build/assets/images'))
		.pipe(livereload());

    cb();
}

exports.default = function () {
	livereload.listen();

	cleanBuild();

	watch([ 'src/pages/*.pug', 'src/common.blocks/**/*.pug' ], { ignoreInitial: false }, html);
	watch([ 'src/assets/styles/*.css', 'src/common.blocks/**/*.css' ], { ignoreInitial: false }, css);
	watch([ 'src/common.blocks/**/*.js' ], { ignoreInitial: false }, js);
	watch(paths.images, { ignoreInitial: false }, images);
	watch(paths.icons, { ignoreInitial: false }, svgSprites);
};
