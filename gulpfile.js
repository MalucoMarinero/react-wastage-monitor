var gulp = require('gulp')
var babel = require('gulp-babel')
var webpack = require('webpack-stream')
var connect = require("gulp-connect")

gulp.task('example', function() {
  return gulp.src('./examples/index.js')
    .pipe(webpack({
      output: {
        filename: 'WastageExamples.pkg.js',
      },
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/
          },
        ],
        rules: [
          {
            test: /\.jsx?$/,
            use: [ 'babel-loader', ],
            exclude: /node_modules/
          },
        ],
      },
    }))
    .pipe(gulp.dest('web'))
})

gulp.task('build', () => {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('npm'))
})

gulp.task('default', [
  'example'
], function () {
  gulp.watch('src/**/*.js', ['example'])
  gulp.watch('examples/**/*.js', ['example'])

  connect.server({
    root: 'web',
    port: 8000,
    livereload: true
  })
})
