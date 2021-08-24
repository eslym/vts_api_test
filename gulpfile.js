const gulp = require('gulp');
const clean = require('gulp-clean');
const webpack = require('webpack-stream');
const wp = require('webpack');

const env = process.env.NODE_ENV || 'development';

gulp.task('build', function () {
    return gulp.src('src/main.ts')
    .pipe(webpack({
        mode: env,
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {filename: '[name].js'}
    }, wp))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('clean', function () {
    return gulp.src(['dist'], {read: false, allowEmpty:true})
        .pipe(clean());
});

gulp.task('watch', function () {
    return gulp.watch('./src/**.ts', gulp.task('build'));
});
