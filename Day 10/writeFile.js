const fs = require('fs').promises;

let str = "이글스라 행복합니다.";
// 이 함수를 실행하면 
// 먼저 writeme.txt 에다가 str 내용을 넣어준다.
fs.writeFile('./writeme.txt', str)
    // 위의 내용을 적어준 다음에 실행되는 행동들
    .then(() => {
        // 잘 읽어졌나 확인하기 위한 용도
        return fs.readFile('writeme.txt');
    })
    .then((data) => {
        // 위에서 readFile을 이용해서 읽은 데이터를 여기서 출력한다.
        console.log(data.toString());
    })
    .catch((err) => {
        // 만약 오류가 있으면 에러를 리턴한다!
        console.error(err);
    })