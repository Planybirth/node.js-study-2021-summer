//클라이언트가 첫 서버에 접속했을 때 사용자에게 쿠키를 준다/
//서버가 이를 기억하고 있다가, 해당 클라이언트가 접속 요청을 보냈을 때
//클라이언트를 인식하고 바로 들여보내준다. 즉 인증 토큰 같은 것.
//키 값이 쿠키이며, 데이터의 헤더에 담겨 있다.


const http = require('http');

http.createServer((req, res) => {
    // 헤더에 요청받은 쿠키가 있는지 확인한다.
    console.log(req.url, req.headers.cookie); 
    // 기존에는 writeHead 내부에 파일이 보내질 형식이 들어왔었음.
    res.writeHead(200, {'Set-Cookie': 'mycookie=test'}); 
    res.end('Hello Cookie');
})
    .listen(8081, () => {
        console.log('8081번 포트에서 대기중');
    });

// localhost:8081을 통해서 들어가면 responce headers에 쿠키가 존재함.
// request headers에도 쿠키가 있다면 서버에 내 쿠키가 저장되었다는 뜻.