var gulp = require('gulp');
var config = require('../config').copyLibs;

gulp.task('copyLibs', function() {
    return gulp.src(config.src)
        .pipe(gulp.dest(config.dest));
});
