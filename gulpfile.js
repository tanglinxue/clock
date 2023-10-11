const gulp = require('gulp');
const GulpSSH = require('gulp-ssh');
const { exec } = require('child_process');
const ecsPath = '/www/wwwroot/h5.lespa.cn/public/h5';
const TestecsPath = '/www/wwwroot/bakh5.lespa.cn/public/h5';
const gulpSSH = new GulpSSH({
  ignoreErrors: false,
  sshConfig: {
    host: '121.196.208.186',
    port: 22,
    username: 'root',
    password: 'xTLaj56DoZNDDLqD',
  },
});
const TestgulpSSH = new GulpSSH({
  ignoreErrors: false,
  sshConfig: {
    host: '121.43.235.117',
    port: 22,
    username: 'root',
    password: 'YgHrj56DoZNDBkNh',
  },
});

// 本地打包
gulp.task('upload-before', (cb) => exec('npm run build', (err, stdout, stderr) => {
  console.log(stdout);
  console.log(stderr);
  cb(err);
}));

gulp.task('upload-sftp', () => gulp.src('./dist/build/h5/**/*')
  .pipe(gulpSSH.dest(ecsPath)));

gulp.task('upload-sftp-test', () => gulp.src('./dist/build/h5/**/*')
  .pipe(TestgulpSSH.dest(TestecsPath)));

// 打包并发布
gulp.task('build', gulp.series('upload-before', 'upload-sftp'));

gulp.task('buildTest', gulp.series('upload-before', 'upload-sftp-test'));
