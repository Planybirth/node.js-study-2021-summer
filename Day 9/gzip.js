const zlib = require('zlib');
const fs = require('fs');
const readStream = fs.createReadStream('./readme3.txt');
const zlibStream = zlib.createGzip();
const WriteStream= = fs.createWriteSt