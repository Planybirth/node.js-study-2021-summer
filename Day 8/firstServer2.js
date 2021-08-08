const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8'});
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
});
server.listen(8080);

// 이벤트 리스너를 이용해서 listen에 들어간 경우 
// console.log('8080 포트에서 대기중입니다.');
server.on('listening', () => {
    console.log('8080 포트에서 대기중입니다.');
});
// 이벤트 리스너를 이용해서 error 이벤트가 발생한 경우
// console.log('8080 포트에서 대기중입니다.');
server.on('error', (err) => {
    console.error(err);
});