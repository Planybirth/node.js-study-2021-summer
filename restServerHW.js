// 요청을 받아주고 응답해 줄 서버를 만들어 주는 과정이다.

const http = require('http');
const fs = require('fs').promises;
const users = {}; // 유저들의 데이터를 넣을 공간을 하나 만들어준다.

http.createServer(async (req, res) => {
    try {
        console.log(req.method, req.url); // HTTP 요청 메서드는 링크 방식이다.

        // 요청받은 HTML이 GET 방식일 때 ( 데이터, 자료 요청 )
        if(req.method === 'GET') { 
            // 서버를 쓰는 경우 루트가 자동으로 그 서버 폴더로 잡히므로
            // 해당 서버보다 상위 폴더로 가는 진입을 막아준다.
            if(req.url === '/') { // 주소가 메인일 때
                const data = await fs.readFile('./restFront.html');  // restFront.html을 보내준다.
                // writeHead = 
                // 200 = 요청이 성공했을 경우, 파일을 보내는 방식을 { 'Content-Type' : 'text/html; charset=utf-8'}로 선언한다
                // 일종의 헤더라고 생각할 것.
                res.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8'}); // 200, 요청이 성공했을 때
                return res.end(data); // 응답 종료. return 마다 res를 써 주어야 한다.

            } else if(req.url === '/about') { // 주소가 /about일 때
                const data = await fs.readFile('./about.html'); // about.html을 보내준다.
                res.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8'});
                return res.end(data); 
            } else if(req.url === '/users') { // /users일 때
                console.log(users);
                // 목록을 가져온다. 파일이 아님!! text/html -> text/plain
                res.writeHead(200, { 'Content-Type' : 'text/plain; charset=utf-8'});
                // AJAX 상에서 데이터들은 전부 XML이나 아니면 JSON으로 돌아간다.
                // stringify : 데이터, 객체 전부를 json 문자열로 변환한다.
                return res.end(JSON.stringify(users)); 
            }

            // /etc 파일, 요청일 경우. 여기서는 CSS 파일에 해당한다.
            try {
                const data = await fs.readFile(`.${req.url}`);
                return res.end(data);
            } catch(err) {
                console.error(err);
            }
        // 요청이 POST일 때
        } else if(req.method === 'POST') { 
            if(req.url === '/user') {
                let body = '';

                // 1. 요청의 body를 stream 형식으로 읽어들여 body에 계속 넣어준다.
                req.on('data', (data) => {
                    body += data;
                });

                // 2. 요청의 body를 다 받은 후에 실행된다.
                return req.on('end', () => {
                    console.log('POST 본문(Body) : ', body);
                    const { name } = JSON.parse(body); 
                    // parse를 사용해서 정보의 일부를 가져올 수 있다. 지금 시간 가져오기
                    const id = Date.now();
                    // 배열의 인덱스를 지금 시간으로 설정하고, 그 인덱스에 데이터를 넣어준다.
                    users[id] = name;

                    res.writeHead(201);
                    res.end('등록 성공'); // 위에서 return req.on을 해주므로 return을 쓸 필요가 없다.
                });
            }
        // 요청이 PUT일 때
        } else if(req.method === 'PUT') {
            if(req.url.startsWith('/user/')) { // /user로 시작한다면
                // split : 특정 문자를 기준으로 잘라내 배열로 만들어낸다.
                // ['','user','20210808xxxx'] => req.url.split('/')[2] === 20210808xxxx
                const key = req.url.split('/')[2];
                let body = '';

                req.on('data', (data) => { // 갱신할 데이터를 가져온다.
                    body += data;
                });

                return req.on('end', () => { // 데이터가 다 받아졌으면 실행시키는 리스너
                    console.log('PUT 본문(Body) : ', body);
                    users[key] = JSON.parse(body).name;
                    return res.end(JSON.stringify(users)); // 갱신한 것을 다시 보내준다. json양식으로.
                })
            }
        // 요청이 DELETE일 때
        } else if(req.method === 'DELETE') {
            if(req.url.startsWith('/user/')) { // /user로 시작한다면
                const key = req.url.split('/')[2];
                // delete를 통해서 배열의 값을 삭제해줄 수 있다.
                delete users[key];
                return res.end(JSON.stringify(users)); // 갱신사항 반영
            }
        }
        // 만약 정보를 하나도 못 찾은 경우 ( 요청받은 리소스를 찾을 수 없을 때)
        res.writeHead(404);
        return res.end('NOT FOUND');
    } catch(err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type' : 'text/plain; charset=utf-8'});
        return res.end('err.message');
    }
}) 
    // 지정 포트에서 대기하도록 설정한다.
    .listen(8080, () => {
        console.log('8080번 포트에서 서버 대기 중 입니다.');
    });