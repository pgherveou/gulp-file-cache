# gulp-file-cache
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]  [![Coverage Status][coveralls-image]][coveralls-url] [![Dependency Status][depstat-image]][depstat-url]

> file-cache plugin for [gulp](https://github.com/wearefractal/gulp)

file-cache creates a cache file on your disk to filter files in your stream that haven't changed since last run.

## Usage

First, install `gulp-file-cache` as a development dependency:

```shell
npm install --save-dev gulp-file-cache
```

Then, add it to your `gulpfile.js`:

The following task only lint new or updated files

```javascript
var FileCache = require("gulp-file-cache");

var fileCache = new FileCache();

gulp.src("./src/*.ext")
	.pipe(fileCache.filter())
	.pipe(jshint())
	.pipe(fileCache.cache());

```

## API

### fileCache.create(name)

Create a new FileCache instance

#### name
Type: `String`
Default: `.gulp-cache`

The cache file name saved on disk.

### FileCache.filter()

Create a through stream that filters file that are already in the cache

### FileCache.cache()

Cache file in the stram into the cache file

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-file-cache
[npm-image]: https://badge.fury.io/js/gulp-file-cache.png

[travis-url]: http://travis-ci.org/pgherveou/gulp-file-cache
[travis-image]: https://secure.travis-ci.org/pgherveou/gulp-file-cache.png?branch=master

[coveralls-url]: https://coveralls.io/r/pgherveou/gulp-file-cache
[coveralls-image]: https://coveralls.io/repos/pgherveou/gulp-file-cache/badge.png

[depstat-url]: https://david-dm.org/pgherveou/gulp-file-cache
[depstat-image]: https://david-dm.org/pgherveou/gulp-file-cache.png
