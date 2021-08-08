// require 안의 인자로는 불러올 모듈의 경로를 적는다.
// 위 예제에서는 같은 폴더 안에 파일을 만들어서, ./ 으로 시작하지만
// 다른 폴더에 있는 모듈 또한 사용이 가능하다.
const { odd, even } = require('./var');

// 홀수 짝수?
function checkOddOrEven(num) {
    if(num % 2) {
        return odd;
    } else {
        return even;
    }
}

// module.exports엔 객체 뿐만 아니라 함수나 변수를 바로 대입할 수 있다.
module.exports = checkOddOrEven;

