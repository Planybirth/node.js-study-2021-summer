const fs = require('fs');
fs.readFile // readFile은 버퍼이다.
const readStream = fs.createReadStrean('./readme3.txt', { highWaterMark : 16});
const data = [];

readStream.on('data', (chunk) => {
    data.push(chunk);  // push = 청크에 넣는 것
    console.log('data : ',chunk, chunk.length);
})

readStream.on('end', () => {
    console.log('end : ', Buffer.concat(data).toString());
});

readStream.on('error', (err) => {
    console.error('error : ', err);
})