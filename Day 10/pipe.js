const fs = require('fs');

const readStream = fs.createReadStream('./readme3.txt');
const writeStream = fs.createWriteStream('./writeme3.txt');

// 입력 받은 결과물(출력값)이 writeStream의 입력값이 된다.
readStream.pipe(writeStream);