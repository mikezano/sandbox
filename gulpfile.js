var gulp = require('gulp');
var sass = require('gulp-sass');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var connect = require('gulp-connect');




gulp.task('sass', function() {
    return gulp.src('sass/**/*.scss', {base: '.'})
        .pipe(sass())
        .pipe(gulp.dest('.')
        .pipe(connect.reload()));
});

gulp.task('scripts', function() {
	var tsResult = gulp.src('app/**/*.ts', {base: '.'})
                        .pipe(ts());
        
					   //.pipe(sourcemaps.init()) // This means sourcemaps will be generated 
					  // .pipe(ts({
						//   sortOutput: true,
						   // ... 
					   //}));
	
	return tsResult.js
				//.pipe(concat('output.js')) // You can use other plugins that also support gulp-sourcemaps 
				//.pipe(sourcemaps.write()) // Now the sourcemaps are added to the .js file 
				.pipe(gulp.dest('.')
                .pipe(connect.reload()));
});


gulp.task('connect', function(){
  connect.server({
      root: '.',
      livereload: true
  });    
});

gulp.task('html', function(){
    gulp.src('./**/*.html')
    .pipe(connect.reload());
});


gulp.task('watch', function(){
    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch('app/**/*.ts', ['scripts']);
    gulp.watch('./**/*.html', ['html']);
});

gulp.task('default',  ['connect', 'watch']);