// 파일을 읽어 올려면 먼저, fs 모듈을 들고 올것이다.
const fs = require('fs');

// fs의 함수들은 기본적으로 콜백 함수로 이루어져 있다.
// 콜백 함수는 지옥으로 갈 수 있다!
fs.readFile('./readme.txt', (err, data) => {
    if(err) {
        throw err;
    }

    console.log(data);
    console.log(data.toString());
});