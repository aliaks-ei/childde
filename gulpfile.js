const { src, dest, watch, series } = require('gulp');

const babel            = require('gulp-babel');
const pug              = require('gulp-pug');
const postcss          = require('gulp-postcss');
const concat           = require('gulp-concat');
const plumber          = require('gulp-plumber');
const livereload       = require('gulp-livereload');
const svgSymbols       = require('gulp-svg-symbols');
const csso             = require('gulp-csso');
const minify           = require('gulp-minify');
const rename           = require('gulp-rename');
const addsrc           = require('gulp-add-src');
const sass             = require('gulp-sass');
const mjml             = require('gulp-mjml');
const autoprefixer     = require('autoprefixer');
const del              = require('del');
const postcssPresetEnv = require('postcss-preset-env');
const mjmlEngine       = require('mjml');

const paths = {
	css: [
		'src/assets/styles/variables.scss', 
		'src/assets/styles/global.scss', 
		'src/common.blocks/**/*.scss', 
		'!src/common.blocks/**/m.*.scss' 
	],
	mCss    : [ 'src/assets/styles/m.global.scss', 'src/common.blocks/**/m.*.scss' ],
	js      : 'src/common.blocks/**/*.js',
	html    : 'src/pages/*.pug',
	images  : 'src/assets/images/*',
	icons   : 'src/assets/icons/*.svg',
	mailers : 'src/pages/mailers/*.pug'
};

sass.compiler = require('node-sass');

function cleanBuild() {
	return del('build/**/*');
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
		.pipe(postcss([ postcssPresetEnv(), autoprefixer() ]))
		.pipe(concat('index.scss'))
		.pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
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

function mailers(cb) {
	src(paths.mailers)
		.pipe(plumber())
		.pipe(pug())
		.pipe(rename({ extname: '.mjml' }))
		.pipe(dest('build/mailers'))
		.pipe(mjml(mjmlEngine, { beautify: true }))
		.pipe(dest('build/mailers'))
		.pipe(livereload())
		.on('end', function () {
			del('build/mailers/*.mjml');
		});

	cb();
}

function watchChanges() {
	livereload.listen();

	watch([ 'src/pages/*.pug', 'src/common.blocks/**/*.pug' ], { ignoreInitial: false }, html);
	watch([ 'src/assets/styles/*.scss', 'src/common.blocks/**/*.scss' ], { ignoreInitial: false }, css);
	watch(paths.js, { ignoreInitial: false }, js);
	watch(paths.images, { ignoreInitial: false }, images);
	watch(paths.icons, { ignoreInitial: false }, svgSprites);
	watch(paths.mailers, { ignoreInitial: false }, mailers);
}

livereload({ start: true });

exports.default = series(cleanBuild, watchChanges);
