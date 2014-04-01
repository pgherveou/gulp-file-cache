var fs = require('fs'),
    through = require('through2');

/**
 * create a new FileCache instance
 */

function FileCache(name) {
  this._filename = name || '.gulp-cache';

  // load cache
  try {
    this._cache = JSON.parse(fs.readFileSync(this._filename, 'utf8'));
  } catch (err) {
    this._cache = {};
  }
}

/**
 * create a through stream that add files to the cache
 *
 * @api public
 */

FileCache.prototype.cache = function() {
  var _this = this;

  // update cache
  function transform(file, enc, callback) {

    var path = file.path,
        stat = file.stat && file.stat.mtime.getTime();

    if (path && stat) _this._cache[path] = stat;
    this.push(file);
    return callback();
  }

  // flush cache to disk
  function flush(callback) {
    fs.writeFile(_this._filename, JSON.stringify(_this._cache), callback);
  }

  return through.obj(transform, flush);
};

/**
 * clear the cache
 *
 * @api public
 */

FileCache.prototype.clear = function() {
  this._cache = {};
};

/**
 * create a through stream that filters file that match our cache
 *
 * @api public
 */

FileCache.prototype.filter = function() {
  var _this = this;

  return through.obj(function(file, enc, callback) {
    var cache = _this._cache[file.path],
        stat = file.stat && file.stat.mtime.getTime();

    // filter matching files
    if (cache && stat && cache === stat) return callback();

    this.push(file);
    return callback();
  });
};

/*!
 * exports
 */

module.exports = FileCache;