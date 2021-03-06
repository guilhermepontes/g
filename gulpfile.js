var gulp   = require('gulp');
var karma  = require('gulp-karma');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var GulpApp = {
  config: {
    testFiles: [
      'src/g.js',
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/underscore/underscore-min.js',
      'specs/*.js'
    ]
  },

  test: function() {
    return gulp.src(GulpApp.config.testFiles)
      .pipe(
        karma({
          configFile: 'karma.conf.js',
          action: GulpApp.config.action || "run"
        })
      );
  },

  default: function() {
    GulpApp.config.action = "watch";
    return GulpApp.test();
  },

  build: function() {
    return gulp.src(GulpApp.config.testFiles[0])
     .pipe(uglify())
     .pipe(rename({ suffix: '.min' }))
     .pipe(gulp.dest('src/'));
  }
};

gulp.task('default', GulpApp.default);
gulp.task('build', ['test', 'compress']);
gulp.task('test', GulpApp.test);
gulp.task('compress', GulpApp.build);
