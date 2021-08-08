const zlib = require('zlib');
const fs = require('fs');

const readStream = fs.createReadStream('./readme3.txt');
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream('./readme3.txt.gz');
readStream.pipe(zlibStream).pipe(writeStream);