const { src, dest, watch } = require('gulp');
const babel                = require('gulp-babel');
const pug                  = require('gulp-pug');
const postcss              = require('gulp-postcss')
const concat               = require('gulp-concat');
const imagemin             = require('gulp-imagemin');
const plumber              = require('gulp-plumber');
const livereload           = require('gulp-livereload');
const cleanCSS             = require('gulp-clean-css');
const autoprefixer         = require('autoprefixer')
const postCssImport        = require('postcss-easy-import');
const postcssPresetEnv     = require('postcss-preset-env');

const paths = {
	css    : 'src/css/**/*.css',
	html   : 'src/pug/*.pug',
	fonts  : 'src/assets/fonts/**/*.*',
	js     : 'src/js/*.js',
	images : 'src/assets/images/*',
	icons  : 'src/assets/icons/*'
};

livereload({ start: true });

function html(cb) {
	src(paths.html)
		.pipe(plumber())
		.pipe(pug())
		.pipe(dest('./build'))
		.pipe(livereload());

	cb();
}

function fonts(cb) {
	src(paths.fonts)
		.pipe(dest('build/assets/fonts'))

	cb();
}

function css(cb) {
  	src(paths.css)
		.pipe(plumber())
		.pipe(postcss([
			postCssImport(),
			postcssPresetEnv(/* pluginOptions */),
			autoprefixer()
		]))
		.pipe(concat('index.css'))
		.pipe(cleanCSS())
		.pipe(dest('build/css'))
		.pipe(livereload());

  	cb();
}

function js(cb) {
	src(paths.js, { sourcemaps: true })
		.pipe(babel({ presets: ['@babel/env'] }))
		.pipe(plumber())
		.pipe(concat('app.min.js'))
		.pipe(dest('build/js', { sourcemaps: true }))
		.pipe(livereload());

  	cb();
}

function images(cb) {
	src(paths.images)
		.pipe(imagemin([
			imagemin.optipng({ optimizationLevel: 5 })
		]))
		.pipe(plumber())
		.pipe(dest('build/assets/images'))
		.pipe(livereload());

    cb();
}

function icons(cb) {
	src(paths.icons)
		.pipe(imagemin([
			imagemin.svgo({
				plugins: [
					{ removeViewBox: true },
					{ cleanupIDs: false }
				]
			})
		]))
		.pipe(plumber())
		.pipe(dest('build/assets/icons'))
		.pipe(livereload());

    cb();
}

exports.default = function () {
	livereload.listen();

	watch('src/css/**/*.css', { ignoreInitial: false }, css);
	watch(paths.fonts,        { ignoreInitial: false }, fonts);
	watch('src/pug/**/*.pug', { ignoreInitial: false }, html);
	watch(paths.js,           { ignoreInitial: false }, js);
	watch(paths.images,       { ignoreInitial: false }, images);
	watch(paths.icons,        { ignoreInitial: false }, icons);
};
