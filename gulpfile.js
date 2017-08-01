var gulp = require('gulp'),
	sass = require('gulp-sass'),
	sassbeautify = require('gulp-sassbeautify'),
	fileinclude = require('gulp-file-include'),
	gutil = require('gulp-util'),
	notify = require('gulp-notify'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglifyjs'),
	autoprefixer = require('gulp-autoprefixer'),
	minifyHTML = require('gulp-minify-html'),
	csso = require('gulp-csso'),
	imagemin = require('gulp-imagemin'),
	spritesmith = require('gulp.spritesmith'),
	merge = require('merge-stream'),
	svgSprite = require('gulp-svg-sprites'),
	ghPages = require('gulp-gh-pages'),
	clean = require('gulp-clean'),
	cache = require('gulp-cache');


// компиляция sass/scss в css
gulp.task('sass', function () {
  return gulp.src(['./app/sass/**/*.scss', './app/sass/**/*.sass'])
    .pipe(sass({outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(autoprefixer(['last 30 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
    .pipe(gulp.dest('./app/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('beautify-sass', ['sass'], function() {
    gulp.src(['./app/sass/**/*.sass', './app/sass/**/*.scss'])
        .pipe(sassbeautify())
        .pipe(gulp.dest('./app/sass'));
});

// сжатие .js
gulp.task('minify:js', function() {
	return gulp.src('./app/js/**/*.js')
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./dist/js/'));
});

// сжатие html
gulp.task('minify:html', function() {
    var opts = {
        conditionals: true,
        spare: true
    };

    return gulp.src(['./app/*.html'])
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('./dist/'));
});

// сжатие css
gulp.task('minify:css', function() {
    gulp.src('./app/css/**/*.css')
        .pipe(autoprefixer({
            browsers: ['last 30 versions'],
            cascade: false
        }))
        .pipe(csso())
        .pipe(gulp.dest('./dist/css/'));
});

// сжатие svg, png, jpeg
gulp.task('minify:img', function() {
    // берем все картинки, кроме папки, где лежат картинки для спрайта
    return gulp.src(['./app/images/**/*', '!./app/images/sprite/*'])
        .pipe(cache(imagemin().on('error', gutil.log)))
        .pipe(gulp.dest('./dist/images/'));
});

// создание спрайта из картинок из папки images/sprite
gulp.task('sprite:png', function() {
    var spriteData = gulp.src('./app/images/sprite/*.png').pipe(
        spritesmith({
            imgName: 'sprite.png',
            cssName: '_icon-mixin.scss',
            // retinaImgName: 'sprite@2x.png',
            // retinaSrcFilter: ['images/sprite/*@2x.png'],
            cssVarMap: function(sprite) {
                sprite.name = 'icon-' + sprite.name;
            }
        })
    );

    var imgStream = spriteData.img.pipe(gulp.dest('./app/images/'));
    var cssStream = spriteData.css.pipe(gulp.dest('./app/sass/'));

    return merge(imgStream, cssStream);
});

gulp.task('sprite:svg', function() {
    return gulp.src('./app/images/icons/**/*.svg')
        .pipe(svgSprite({ mode: "symbols" }))
        .pipe(gulp.dest("./app/images"));
});

// перенос шрифтов в дистрибутив
gulp.task('fonts-to-dist', function() {
	return gulp.src('./app/fonts/**/*')
		.pipe(gulp.dest('./dist/fonts/'));
});

// удалить папку dist
gulp.task('clean', function() {
    return gulp.src('./dist', { read: false }).pipe(clean());
});

//чистить cache
gulp.task('clear', function() {
	return cache.clearAll();
});

// сборка страницы с шаблонов
gulp.task('fileinclude', function() {
    gulp.src('./app/pages/**/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        })
        .on('error', gutil.log))
        .on('error', notify.onError())
        .pipe(gulp.dest('./app/'));
});


// автообновление браузера
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: './app'
		},
		port: "4200"
	});
});

gulp.task('watch', ['browser-sync', 'sass', 'fileinclude'], function() {
	gulp.watch('./app/sass/**/*', ['sass']);
	gulp.watch('./app/**/*.html', browserSync.reload);
	gulp.watch('./app/js/**/*.js', browserSync.reload);
	gulp.watch([
        './app/templates/**/*.html',
        './app/pages/**/*.html'
    ], ['fileinclude']);
});

// публикация на gh-pages
gulp.task('deploy', function() {
    return gulp.src('./public/**/*').pipe(ghPages());
});

// при вызове в терминале команды golp, будет запущеные задачи 
// watch - для запупуска сервера и прослушивания, 
// sass - для компиляции sass в css, потому что браузер
// не понимает предварительные синтаксис,
// fileinclude - для того, чтобы с маленьких шаблонов собрать полную страницу
gulp.task('default', ['watch', 'sass', 'fileinclude']);

// при вызове команды gulp production
// будут сжаты все ресурсы в папку dist
// после чого командой gulp deploy их можно опубликовать на github
gulp.task('production', ['minify:html', 'minify:css', 'minify:js', 'minify:img', 'fonts-to-dist']);