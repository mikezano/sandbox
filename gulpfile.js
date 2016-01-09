var gulp = require('gulp');
var sass = require('gulp-sass');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function() {
    gulp.src('sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(function(f) {
            return f.base;
        }))
});

gulp.task('scripts', function() {
	var tsResult = gulp.src('ts/*.ts', {base: '.'})
                        .pipe(ts({}));
        
					   //.pipe(sourcemaps.init()) // This means sourcemaps will be generated 
					  // .pipe(ts({
						//   sortOutput: true,
						   // ... 
					   //}));
	
	return tsResult.js
				//.pipe(concat('output.js')) // You can use other plugins that also support gulp-sourcemaps 
				//.pipe(sourcemaps.write()) // Now the sourcemaps are added to the .js file 
				.pipe(gulp.dest('.'));
});

gulp.task('default', function() {
    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch('ts/**/*.ts', ['scripts']);
});