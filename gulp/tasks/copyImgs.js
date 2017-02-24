var gulp = require('gulp');
var config = require('../config').copyImgs;

gulp.task('copyImgs', function() {
    return gulp.src(config.src)
        .pipe(gulp.dest(config.dest));
});
