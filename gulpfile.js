// Первым делом запустить 
// npm i
// или же
// npm init
// поcле
// npm install --save-dev gulp browser-sync gulp-sass  gulp.spritesmith  gulp-autoprefixer  gulp-sourcemaps gulp-util gulp-ftp gulp-file-include gulp-imagemin  gulp-uglify gulp-rename  gulp-minify-css gulp-plumber gulp-csscomb gulp-csscomb gulp gulp-group-css-media-queries gulp-notify gulp-concat
// в конце для старта 
// gulp   

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var spritesmith = require('gulp.spritesmith');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var ftp = require('gulp-ftp');
var fileinclude = require('gulp-file-include');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var cssmin = require('gulp-minify-css');
var plumber = require("gulp-plumber");
var csscomb = require("gulp-csscomb");
var gcmq = require('gulp-group-css-media-queries');
var notify = require( 'gulp-notify' );
var concat = require('gulp-concat');

//Базовые настройки
var config={
  //Общие настройки
    npmPath:"node_modules/", //путь к папке  NPM модулями
    ftp:{
      ftpServer:"",
      ftpUser:"",
      ftpPassword:"",
      ftpPath:"",
    },
    plugins:["holderjs"],
    imgPath:"app/img/",
    scssPath:"app/scss/" 

  }

//копирует NPM модули в папку сайта
gulp.task('npm:plugins',function(){
  var modules=config.plugins;
  var modPath=[];
  for (var key in modules) {
    modPath[key]=config.npmPath+modules[key]+'/**/*';
    console.log('copy module: '+modPath[key]);
    gulp.src(modPath[key])
    .pipe(gulp.dest('dist/plugins/'+modules[key]));
  }
});

 // It's not necessary to read the files (will speed up things), we're only after their paths: 
 var sources = gulp.src(['./dist/js/*.js', './dist/css/*.css'], {read: true});
// авто подключение стилей и скриптов
gulp.task('inject', function () {
  var target = gulp.src('./dist/*.html');
  return target.pipe(inject(sources,{relative:true}))
  .pipe(gulp.dest('./dist'));
});



//Оптимизация изображений
gulp.task('compress', function() {
  gulp.src('app/img/*')
  .pipe(imagemin({ //Сожмем их
            progressive: true, //сжатие .jpg
            svgoPlugins: [{removeViewBox: false}], //сжатие .svg
            interlaced: true, //сжатие .gif
            optimizationLevel: 3 //степень сжатия от 0 до 7
          }))
  .pipe(gulp.dest('dist/img'))
});

// билдинг js
gulp.task('js:build', function () {
    gulp.src('app/js/*.js') //Найдем наш main файл
    .pipe(gulp.dest('dist/js'))
    .pipe(concat('all.js'))
        .pipe(sourcemaps.init()) //Инициализируем sourcemap
        .pipe(uglify()) //Сожмем наш js
        .pipe(sourcemaps.write()) //Пропишем карты
        .pipe(rename({suffix: '.min'})) //добавим суффикс .min к выходному файлу
        .pipe(gulp.dest('dist/js')); //выгрузим готовый файл в build
      });

// таск для билдинга html
gulp.task('html:build', function () {
    gulp.src('app/html/**/*.html') //Выберем файлы по нужному пути
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('dist'));
  });

// билдим шрифты
gulp.task('fonts:build', function() {
  gulp.src('app/fonts/**')
  .pipe(gulp.dest('dist/fonts'));
});

// конкантенация js скриптов
gulp.task('concat', function() {
  return gulp.src('app/*.js')
  .pipe(concat('all-lib.js'))
  .pipe(gulp.dest('dist/js'));
});

//ФТП загрузка файлов
gulp.task('ftp', function () {
  return gulp.src('dist/**/*')
  .pipe(ftp({
    host: config.ftp.ftpServer,
    user: config.ftp.ftpUser,
    pass: config.ftp.ftpPassword,
    remotePath:config.ftp.ftpPath
  }))
  .pipe(gutil.noop());
});

// Компиляция SCSS файлов, автопрефикс, карта
gulp.task('sass', function() {
  return gulp.src("app/scss/*.scss")
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(sass({outputStyle: 'expanded'})
    .on( 'error', notify.onError(
    {
      message: "<%= error.message %>",
      title  : "Ошибка SASS!"
    } ) )
    )
  .pipe(autoprefixer({
   browsers: ['last 3 version', "> 1%", "ie 8", "ie 7"],
   cascade: false
 }))
  .on('error', function (err) {
    console.error('Error!', err.message);
  })
  .pipe(sourcemaps.write({includeContent: false, sourceRoot: '/app/scss'}))
  .pipe(gulp.dest("dist/"))
  .pipe(browserSync.stream({match: '**/*.css'}));
});

// Автоматическое создание спрайтов
gulp.task('sprite', function () {
  var spriteData = gulp.src('app/img/icons/*.png')
  .pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: '_sprite.scss',
    cssVarMap: function (sprite) {
     if (sprite.name.indexOf('-hover') !== -1){
       sprite.name ='.icon-' + sprite.name.replace('-hover', ':hover');
     }else{
       sprite.name = 'icon-' + sprite.name;
     }
   },
   imgPath:'img/sprite.png',
   cssOpts: {
    cssSelector: function (item) {
                // If this is a hover sprite, name it as a hover one (e.g. 'home-hover' -> 'home:hover')
                if (item.name.indexOf('-hover') !== -1) {
                  return '.icon-' + item.name.replace('-hover', ':hover');
                    // Otherwise, use the name as the selector (e.g. 'home' -> 'home')
                  }
                  else {
                    return '.icon-' + item.name;
                  }
                }
              }
            }));
  spriteData.css.pipe(gulp.dest(config.scssPath));
  spriteData.img.pipe(gulp.dest(config.imgPath));

});



gulp.task('build', ['sprite','compress','sass','fonts:build','js:build','html:build','npm:plugins','concat'],function () {
 browserSync.reload();
});

// Static Server + watching all files
gulp.task('serve', function() {
  browserSync.init({
    server: "./dist"
  });
  gulp.watch('app/img/icons/*.png', ['sprite']).on('change', browserSync.reload);
  gulp.watch('app/img/**', ['compress']).on('change', browserSync.reload);
  gulp.watch("app/scss/*.scss", ['sass']);
  gulp.watch("app/fonts/**", ['fonts:build']);
  gulp.watch("app/js/*.js",['js:build']).on('change', browserSync.reload);
  gulp.watch("app/html/**/*.html",['html:build']);
  gulp.watch("dist/*.html").on('change', browserSync.reload);

});

gulp.task('default', ['build','serve']);