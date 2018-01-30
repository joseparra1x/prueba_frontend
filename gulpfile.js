var gulp  = require('gulp');

// load all plugins in "devDependencies 'Package.json'" into the variable $
const $ = require("gulp-load-plugins")({
    pattern: ["*"],
    scope: ["devDependencies"]
});


/* Paths and global vars */
var browserSync = $.browserSync.create();
source  = {
	'javascript'	: 'source/js/**/*.js',
	'vendorjs'		: 'public/assets/js/**/*.js',
	'css'			: 'public/assets/css/**/*.css',
	'html'			: 'public/*.html'
},

output = {
	'stylesheets'	: 'public/assets/css',
	'javascript'	: 'public/assets/js',
	'images'		: 'public/assets/images',
	'html'			: 'public'
};
/* END PAHTS */


// Task minify CSS
gulp.task('css-minify', function() {
    return gulp.src('public/assets/css/**/*.css')
        .pipe($.minifyCss())
        .pipe(gulp.dest(output.stylesheets))
        .pipe($.browserSync.reload({stream: true}));
});

// Task minify JS
gulp.task('js-minify', function() {
    return gulp.src(source.javascript)
        .pipe($.uglify())
        .pipe(gulp.dest(output.javascript))
        .pipe($.browserSync.reload({stream: true}));
});

// Static Server + watching files
gulp.task('server', function() {
    $.browserSync.init({
        server: "./public/"
    });

    gulp.watch(source.html).on('change', $.browserSync.reload);
	gulp.watch(source.css).on('change', $.browserSync.reload);
});

// Default Task
gulp.task('default', ['server'], function() {
	gulp.watch(source.javascript, ['js-minify']);
  	return $.util.log('Running process');
});