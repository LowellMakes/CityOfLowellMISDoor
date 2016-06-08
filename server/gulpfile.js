var gulp = require('gulp');
var browserify = require('gulp-browserify');
 
// Basic usage 
gulp.task('scripts', function() {
    // Single entry point to browserify 
    gulp.src('ui/main.js')
        .pipe(browserify({
          insertGlobals : true,
          debug : !gulp.env.production,
          transform: [ 'reactify' ]
        }))
        .pipe(gulp.dest('./public/'));
});

gulp.task('default', ['scripts']);