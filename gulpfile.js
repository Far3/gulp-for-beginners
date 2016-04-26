//Look intot he node_modules folder for a package named gulp. Once its found we assign its contents to the variable gulp
var gulp = require('gulp');


//'hello' is the name of the task, you can also run it in the cmd with gulp task-name.
gulp.task('hello', function(){
	console.log('Hello Franklyn');
});

//can compul sass into css withgulp-sass plugin.
//npm install gulp-sass --save-dev 
//--save-dev ensures that gulp-sass gets added to devDependencies in package.json

var sass = require('gulp-sass');


//Create a new task named sass that takes source files and a destination for the task to work.
//Put the source of the files  in src ie. where your sass files are.
//Put the destination files where you want your compiled css to go.
gulp.task('sass', function(){
	return gulp.src('app/scss/styles.scss') //Setting the source to read from.
	.pipe(sass())//using gulp-sass variable declared above.
	.pipe(gulp.dest('app/css')) //Setting the destination.
});

