const http = require('http');

// 제일 빠른 검색 능력을 가지려면 
// 공식 문서 -> 스택 오버플로우 -> 구글링해서 기타 사이트 찾아보기
http.createServer((req, res) => {
    console.log(req.url, req.headers.cookie);
    res.writeHead(200, {'Set-Cookie': 'mycookie=test'});
    res.end('Hello Cookie');
})
    .listen(8081, () => {
        console.log('8081번 포트에서 대기중');
    });