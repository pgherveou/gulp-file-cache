/*global describe, it*/

var gutil = require('gulp-util'),
  chai = require('chai'),
  FileCache = require('../');

var expect = chai.expect;

describe('gulp-file-cache', function () {

  var fileCache = new FileCache(),
      d1 = new Date('2014-01-01'),
      d2 = new Date('2014-02-01'),
      file1, file2, file3;

  file1 = new gutil.File({
    path: 'file1',
    stat: {mtime: d1}
  });

  file2 = new gutil.File({
    path: 'file2',
    stat: {mtime: d1}
  });

  file3 = new gutil.File({
    path: 'file3',
    stat: {mtime: d1}
  });

  fileCache.clear();

  it('should populated the cache', function (done) {
    var stream = fileCache.cache();

    stream.on('finish', function() {
      expect(fileCache._cache).to.have.keys(['file1', 'file2']);
      done();
    });

    stream.write(file1);
    stream.write(file2);
    stream.end();
  });

  it('should filter unchanged files', function (done) {
    var stream = fileCache.filter();

    // update file 2
    file2.stat.mtime = d2;

    stream.pipe(gutil.buffer(function(err, files){
      expect(err).to.not.exist;
      expect(files).to.deep.eq([file2, file3]);
      done();
    }));

    stream.write(file1);
    stream.write(file2);
    stream.write(file3);
    stream.end();
  });
});
