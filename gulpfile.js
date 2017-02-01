var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserslist = require('browserslist');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-jsmin');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-uglifycss');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var rename = require('gulp-rename');


// Development Tasks 
// -----------------

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({    
    proxy: {
      target: 'http://localhost:8888/UXCHAT/DEVELOPPEMENT/V4/wordpress'
    }
  })
})

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass()) // Passes it through a gulp-sass
    .pipe(autoprefixer({ browsers: ["> 1%"] }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('app/css')) // Outputs it in the css folder
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }));
})

gulp.task('jsuse', function() {
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('dist'));
})


gulp.task('vendorjs', function() {

return gulp.src('app/js/vendor/*.js')
    .pipe(gulp.dest('dist/js/vendor'));

});

gulp.task('homejs', function() {

return gulp.src('app/js/bot.js')
  .pipe(uglify())
  .pipe(rename('bot.min.js'))
  .pipe(gulp.dest('dist/js'));

});

// Watchers
gulp.task('watch', function() {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
  gulp.watch('app/js/main.js', ['jsuse']); 
  gulp.watch('app/js/bot.js', ['homejs']); 
})

// Optimization Tasks 
// ------------------

// Optimizing CSS and JavaScript 
gulp.task('useref', function() {

  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano({'uglyComments': true})))
    .pipe(gulp.dest('dist'));
});

// Optimizing Images 
gulp.task('images', function() {
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
      interlaced: true,
    })))
    .pipe(gulp.dest('dist/images'))
});

// Optimizing Images jQueryui 
gulp.task('imagesUI', function() {
  return gulp.src('app/css/images/**/*.+(png|jpg|jpeg|gif|svg)')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
      interlaced: true,
    })))
    .pipe(gulp.dest('dist/css/images'))
});

// Copying fonts 
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
})

// Cleaning 
gulp.task('clean', function() {
  return del.sync('dist').then(function(cb) {
    return cache.clearAll(cb);
  });
})

gulp.task('clean:dist', function() {
  return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});

// Build Sequences
// ---------------

gulp.task('default', function(callback) {
  runSequence(['sass', 'vendorjs', 'jsuse', 'homejs', 'browserSync', 'watch'],
    callback
  )
})

gulp.task('build', function(callback) {
  runSequence(
    'clean:dist',
    'sass',
    ['vendorjs', 'useref', 'homejs', 'images', 'fonts', 'imagesUI'],
    callback
  )
})