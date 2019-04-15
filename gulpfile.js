var gulp = require('gulp')
  ,imagemin       = require('gulp-imagemin')
  ,clean          = require('gulp-clean')
  ,concat         = require('gulp-concat')
  ,htmlReplace    = require('gulp-html-replace')
  ,uglify         = require('gulp-uglify')
  ,usemin         = require('gulp-usemin')
  ,cssmin         = require('gulp-cssmin')
  ,browserSync    = require('browser-sync').create()
  ,jshint         = require('gulp-jshint')
  ,jshintStylish  = require('jshint-stylish')
  ,csslint        = require('gulp-csslint')
  ,autoprefixer   = require('gulp-autoprefixer')
  ,cssnano        = require('gulp-cssnano')
  ,htmlmin        = require('gulp-htmlmin')
  ,gulpif         = require('gulp-if')
  ,useref         = require('gulp-useref')
  ,inlineSource   = require('gulp-inline-source')
  ,sass           = require('gulp-sass')
  ,babel          = require('gulp-babel')
  ,connect        = require('gulp-connect-php')
  ,tinypng        = require('gulp-tinypng')
  ,webserver      = require('gulp-webserver')
  ,mkdir          = require('mkdirp')
  ,gutil          = require('gulp-util')
  ,svgmin         = require('gulp-svgmin')
  ,ftp            = require('gulp-ftp')
  ,less           = require('gulp-less')
  ,path           = require('path')
  ,prefix         = require('gulp-prefix');

let host          = '';                   /* host para o ftp */
let user          = '';                   /* user para o ftp */
let pass          = '';                   /* pass para o ftp */
let dirDist       = '/public_html/dist';  /* dir de teste*/
let dirPublic     = '/public_html';       /*dir de dev */

gulp.task('default', ['useref','copyPHP', 'copyFonts', 'copyVideo', 'copyJs', 'copyScss', 'copyCss', 'seo'], function() {
  gulp.start('build-img');
  // gulp.start('build-svg');
});

gulp.task('copy', ['clean'], function() {
  return gulp.src('src/**/*')
    .pipe(gulp.dest('dist'));
});

gulp.task('copyPHP', function() {
    return gulp.src('src/php/*')
        .pipe(gulp.dest('dist/php'));
});

gulp.task('copyFonts', function() {
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('copyVideo',function(){
  return gulp.src('src/video/*')
        .pipe(gulp.dest('dist/video'));
});

gulp.task('copyJs',function(){
  return gulp.src('src/js/**/*')
        .pipe(gulp.dest('dist/js'));
});

gulp.task('copyScss',function(){
  return gulp.src('src/sass/**/*')
        .pipe(gulp.dest('dist/sass'));
});

gulp.task('copyCss',function(){
  return gulp.src('src/css/**/*.css')
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css'))
});

gulp.task('clean', function() {
  return gulp.src('dist')
    .pipe(clean());
});

gulp.task('seo',function(){
  return gulp.src('src/seo/**/*')
        .pipe(gulp.dest('dist'));
});

gulp.task('build-svg', function () {
    return gulp.src('src/img/**/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('dist/img'));
});

gulp.task('build-img', function() {

  return gulp.src('src/img/**/*.{png,jpg,jpeg}')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [
                {removeViewBox: false},
                {cleanupIDs: false}
            ]
        }))
        // vJyGDhoFt93pai7bNOlLnt9wx35GfClT
        .pipe(tinypng('2fTBYUG9ROnvcw5jclwjWsXP8n2SF_-Z'))
        .pipe(gulp.dest('dist/img'));
});

// minificação
gulp.task('minify-js', function() {
  return gulp.src('src/**/*.js')
    .pipe(babel({presets: ['es2015']}))
    .pipe(concat("all.js"))
    .pipe(uglify({ compress: true }).on('error', function(e){
         console.log(e);
    }))
    .pipe(gulp.dest('dist/js'))
});

gulp.task('minify-css', function() {
  return gulp.src('src/**/*.css')
    .pipe(cssnano())
    .pipe(gulp.dest('dist'))
});

gulp.task('minify-html', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
});

/* Concatenação */
gulp.task('useref', function () {
    return gulp.src('src/*.html')
        .pipe(useref())
        .pipe(gulpif('*.html', inlineSource()))
        .pipe(gulpif('*.html', htmlmin({collapseWhitespace: true})))
        .pipe(gulpif('*.js',babel({
            compact: false,
            presets: [['es2015', {modules: false}]]
        })))
        .pipe(gulpif('*.js', uglify({ compress: false })))
        .pipe(gulpif('*.css', cssnano({safe: true})))
        .pipe(gulp.dest('dist'));
});

/* deploy dist ftp */
gulp.task('deployDist', ['default'], function () {
   return gulp.src('dist/**/*')
   .pipe(ftp({
     host: host,
     user: user,
     pass: pass,
     remotePath: dirDist
   }))
   .pipe(gutil.noop());
});

/* deploy public ftp */
gulp.task('deployPublic', ['default'], function () {
   return gulp.src('dist/**/*')
   .pipe(ftp({
     host: host,
     user: user,
     pass: pass,
     remotePath: dirPublic
   }))
   .pipe(gutil.noop());
});

var customReporter = function(file) {
  var report = "";
  report = `${file.csslint.errorCount} erro no arquivo ${file.path} \r\n`;

  file.csslint.results.forEach(function(result) {
    // Msg += result.error.message  + " on line "  + result.error.line + "\r\n";
    report = `${result.error.message} na linha ${result.error.line} \r\n`;
  });

  // require('fs').appendFileSync('cssErrors.txt', report); 
};

gulp.task('watchJs', ()=>{
  gulp.watch('src/js/**/*.js').on('change', function(event) {
    console.log("Linting " + event.path);
    gulp.src(event.path)
        .pipe(jshint({esversion: 6}))
        .pipe(jshint.reporter(jshintStylish));
  });
})

gulp.task('watchCss', ()=>{
  gulp.watch('src/css/**/*.css').on('change', function(event) {
    console.log("Linting " + event.path);
    gulp.src(event.path)
        .pipe(csslint())
        .pipe(csslint.reporter(customReporter));            
  }); 
})

gulp.task('watchImg', ()=>{
  gulp.watch('src/img/**/*').on('change', function(event) {
    gulp.src(event.path)
        .pipe(gulp.dest('src/img'));
  })

})

gulp.task('watchLess', ()=>{
  gulp.watch('src/less/*.less').on('change', function(event) {
    return gulp.src('src/less/*.less', ['less'])
            .pipe(less())
            .pipe(gulp.dest('src/css'));
  })
})

gulp.task('watchSass', ()=>{
  gulp.watch('src/sass/*.scss').on('change', function(event) {
    var stream = gulp.src('src/sass/*.scss')
         .pipe(sass().on('error', function(erro) {
           console.log('Sass, erro compilação: ' + erro.filename);
           console.log(erro.message);
         }))
         .pipe(gulp.dest('src/css'));
 });
})

//server
gulp.task('server', function() {
    connect.server();
    
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    });

    gulp.watch('src/**/*').on('change', browserSync.reload);

    gulp.watch('src/js/**/*.js').on('change', function(event) {
      console.log("Linting " + event.path);
      gulp.src(event.path)
          .pipe(jshint({esversion: 6}))
          .pipe(jshint.reporter(jshintStylish));
    });

    gulp.watch('src/css/**/*.css').on('change', function(event) {
      console.log("Linting " + event.path);
      gulp.src(event.path)
          .pipe(csslint())
          .pipe(csslint.reporter(customReporter));            
    }); 

    gulp.watch('src/img/**/*').on('change', function(event) {
      gulp.src(event.path)
          .pipe(gulp.dest('src/img'));
    })
  
    gulp.watch('src/less/*.less').on('change', function(event) {
      return gulp.src('src/less/*.less', ['less'])
              .pipe(less({
                paths: [ path.join(__dirname, 'less', 'includes') ]
              }))
              // .pipe(prefix("last 8 version", "> 1%", "ie 8", "ie 7"), {cascade:true})
              .pipe(gulp.dest('src/css'));
    })
    
});