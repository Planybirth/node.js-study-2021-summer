// 쿠키는 f12 - 네트워크 - responce header에서 쉽게 확인을 할 수 있다.
// 이름이나 개인정보가 쉽게 노출될 수 있어서 위험하다.

// 세션은 서버가 사용자를 관리한다. 
// 보안적인 측면에서 세션을 사용하는 것이 맞지만, 
// 따로 hashmap을 사용하여 서버공간, 서버자원을 사용하므로 서버에 더 큰 영향을 끼친다.

// 쿠키는 비허용하거나 삭제할 경우 재인증이 필요하다.
// 세션은 브라우저를 닫거나 세션에서 삭제하지 않는 이상 계속 유지된다.

const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie = '') =>
  cookie
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

const session = {}; // 사용자 정보가 담길 공간이다. hashmap 선언할 때 {}을 사용한다.
// hashmap -> { Key, Value } 으로 구성된 자료구조
// 맵 인터페이스를 구현한 대표적인 맵 컬렉션이다.

http.createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie); // 쿠키를 가져온다

    if (req.url.startsWith('/login')) { // login으로 시작되는 접속이 감지되면
        const { query } = url.parse(req.url);
        const { name } = qs.parse(query);
        const expires = new Date();

        expires.setMinutes(expires.getMinutes() + 5);

        const uniqueInt = Date.now();

        // Key : 지금 시간                  hashmap = [ Key, Value ]
        // Value : 이름, 만료시간을 저장
        session[uniqueInt] = {
            name,
            expires,
        };  // 사용자에 대한 세션을 저장하였음.

        res.writeHead(302, { // 302 : 해당 url이 새로운 구조로 개편되었음. 경로 초기화, 세션값 저장
            Location: '/',
            'Set-Cookie': `session=${uniqueInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end();

        // 세션쿠키가 존재하고, 만료 기간이 지나지 않았다면
    } 
    
    else if (cookies.session && session[cookies.session].expires > new Date()) { 
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`${session[cookies.session].name}님 안녕하세요`); // 저장한 세션을 바로 불러온다.
    } 
    
    else {
        try {
          const data = await fs.readFile('./cookie2.html');
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(data);
        } catch (err) {
          // 서버 에러 응답 status 500
          res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
          res.end(err.message);
        }
    }
})
    .listen(8080, () => {
        console.log('8080번 포트에서 서버 대기 중입니다!');
    });