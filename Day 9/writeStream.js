const fs= require('fs');
const writeStream = fs.createWriteStream('./writeme2.txt');
writeStream.on('fininsh', () => {
    console.log('파일 쓰기 완료');
});
writeStream.write('웹 및 서버 개발 스터디\n');
writeStream.write('우아아아아');
writeStream.end();