//Look intot he node_modules folder for a package named gulp. Once its found we assign its contents to the variable gulp
var gulp = require('gulp');
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');

//'hello' is the name of the task, you can also run it in the cmd with gulp task-name.
gulp.task('hello', function(){
	console.log('Hello Franklyn');
});

//can compul sass into css withgulp-sass plugin.
//npm install gulp-sass --save-dev 
//--save-dev ensures that gulp-sass gets added to devDependencies in package.json

//Create a new task named sass that takes source files and a destination for the task to work.
//Put the source of the files  in src ie. where your sass files are.
//Put the destination files where you want your compiled css to go.
gulp.task('sass', function(){
	return gulp.src('app/scss/**/*.scss') //Setting the source to read from. Gets all files ending in with .scss in app/scss and all children directories.
	.pipe(sass())//using gulp-sass variable declared above.
	.pipe(gulp.dest('app/css')) //Setting the destination.
	.pipe(browserSync.reload({
		stream: true
	}))
});

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

//gulp watch syntax
//gulp.watch('files-to-watch', ['tasks', 'to', 'run']);
//Call the gulp watch command and tell it where to look and what tasks to run.

gulp.task('watch', ['sass', 'browserSync'], function(){
	gulp.watch('app/scss/**/*.scss',['sass']);
	//other watchers can be added below/
	gulp.watch('app/js**/*.js', browserSync.reload);
	gulp.watch('app/*.html', browserSync.reload);
});