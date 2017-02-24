var gulp = require('gulp');

gulp.task('build', ['copyData','copyImgs','copyLibs','browserify', 'markup', 'less']);
