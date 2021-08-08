// .promises : 콜백 함수를 프로미스로 사용할 수 있게 해준다.
const fs = require('fs').promises;

fs.readFile('./readme.txt')
    .then((data) => {
        console.log(data);
        console.log('1번', data.toString());
    })
    .catch((err) => {
        console.error(err);
    });

fs.readFile('./readme.txt')
    .then((data) => {
        console.log(data);
        console.log('2번', data.toString());
    })
    .catch((err) => {
        console.error(err);
    });
    
fs.readFile('./readme.txt')
    .then((data) => {
        console.log(data);
        console.log('3번', data.toString());
    })
    .catch((err) => {
        console.error(err);
    });