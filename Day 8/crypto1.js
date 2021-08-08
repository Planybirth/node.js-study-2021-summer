const crypto = require('crypto');

// 단방향 알고리즘
// createHash : 암호화 알고리즘을 선택한다.
// update : 변환될 문자열을 넣는다.
// digest : 어떤 문자 방식으로 인코딩할 것인가. (결과물로 변환된 문자열을 반환해준다.)
// base64 : 문자열이 제일 짧게 때문에 많이 사용된다. 
console.log('base64:', crypto.createHash('sha512').update('비밀번호').digest('base64'));
console.log('hex:', crypto.createHash('sha512').update('비밀번호').digest('hex'));
console.log('base64:', crypto.createHash('sha512').update('다른 비밀번호').digest('base64'));