const http = require('http');
const fs = require('fs').promises;

// 유저들의 데이터를 넣을 공간을 하나 만들어준다.
const users = {};

/*
    복습 중점 포인트
    1. REST 감 잡기
    2. url 감 잡기
    3. AJAX 감 잡기(axios를 기반으로)
*/

http.createServer(async (req, res) => {
    try {
        // 요청쪽에 어떤 HTTP 메서드를 보냈나!
        // 요청 자원(링크 방식)
        console.log(req.method, req.url);

        // HTML을 요청받은 경우 처리하는 것!
        if(req.method === 'GET') {
            // 서버를 쓰는 경우
            // 루트가 자동으로 그 서버 폴더로 잡히기 때문에, 
            // 이제 그 서버보다 상위 폴더로 진입을 막아준다.
            if(req.url === '/') {
                // restFront.html을 보내준다.
                const data = await fs.readFile('./restFront.html');
                // 헤더 제공
                // 요청이 성공했을 경우
                // 이것을 보내겠다 
                // 내가 응답으로 보내는 파일의 형식이 { 'Content-Type' : 'text/html; charset=utf-8'} 이 방식이다.
                res.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8'});
                // 응답 종료
                // 만약 인자가 있다면 그 자료까지만 보내고 끝낸다.
                return res.end(data); 
            } else if(req.url === '/about') {
                const data = await fs.readFile('./about.html');
                res.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8'});
                return res.end(data); 
            } else if(req.url === '/users') {
                console.log(users);

                // 목록을 가져온다.
                res.writeHead(200, { 'Content-Type' : 'text/plain; charset=utf-8'});
                // AJAX 상에서 데이터들은 전부 XML이나 아니면 JSON으로 돌아간다.
                // stringify 데이터들을 json 형식에 맞춰서 넣어준다.
                return res.end(JSON.stringify(users)); 
            }

            // /도 /about 도 아닌 경우
            // 즉 css파일 같은 거
            try {
                const data = await fs.readFile(`.${req.url}`);
                return res.end(data);
            } catch(err) {
                console.error(err);
            }
        } else if(req.method === 'POST') {
            if(req.url === '/user') {
                let body = '';

                // 요청의 body를 stream 형식으로 읽어들인다.
                req.on('data', (data) => {
                    body += data;
                });

                // 요청의 body를 다 받은 후에 실행된다.
                return req.on('end', () => {
                    console.log('POST 본문(Body) : ', body);
                    const { name } = JSON.parse(body);
                    // 지금 시간 가져오기
                    const id = Date.now();
                    // 배열의 인덱스를 지금 시간으로 설정하고, 그 인덱스에 데이터를 넣어준다.
                    users[id] = name;

                    res.writeHead(201);
                    res.end('등록 성공');
                });
            }
        } else if(req.method === 'PUT') {
            if(req.url.startsWith('/user/')) {
                const key = req.url.split('/')[2];
                let body = '';

                req.on('data', (data) => {
                    body += data;
                });

                return req.on('end', () => {
                    console.log('PUT 본문(Body) : ', body);
                    users[key] = JSON.parse(body).name;
                    return res.end(JSON.stringify(users));
                })
            }
        } else if(req.method === 'DELETE') {
            if(req.url.startsWith('/user/')) {
                const key = req.url.split('/')[2];
                // delete를 통해서 배열의 값을 삭제해줄 수 있다.
                delete users[key];
                return res.end(JSON.stringify(users));
            }
        }
        // 만약 정보를 하나도 못 찾은 경우
        res.writeHead(404);
        return res.end('NOT FOUND');
    } catch(err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type' : 'text/plain; charset=utf-8'});
        return res.end('err.message');
    }
}) 
    // 서버가 계속 요청을 들을 수 있게
    // 대기시키는 것 (n번 포트에서)
    .listen(8080, () => {
        console.log('8080번 포트에서 서버 대기 중 입니다.');
    });