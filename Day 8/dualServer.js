const http = require('http');

// 8080 포트에서 돌아가는 서버
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8'});
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
})
    .listen(8080, () => { // 서버 연결
        // 서버 실행 시 로그를 띄우는 역할
        console.log('8080번 포트에서 서버 대기 중입니다.');

        // 보통은 따른 프로그램을 더 실행한다던지 등등을 여기서 해
    });

// 8081 포트에서 돌아가는 서버
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8'});
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
})
    .listen(8081, () => { // 서버 연결
        // 서버 실행 시 로그를 띄우는 역할
        console.log('8081번 포트에서 서버 대기 중입니다.');

        // 보통은 따른 프로그램을 더 실행한다던지 등등을 여기서 해
    });