const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie = '') => 
    // mycookie=test;favicon=test2
    cookie
        // [ 'mycookie=test' , 'favicon=test2']
        .split(';')
        // [ { mycookie='test' } , { favicon='test2' }]
        .map(v => v.split('='))
        .reduce((acc, [k, v]) => { 
            // [ {mycookie='test'} , {favicon='test2'}]
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});

http.createServer(async (req, res) => {
    // 클라이언트가 보내준 쿠키들을 전부 파싱해서 결과값으로 받아준다! 
    const cookies = parseCookies(req.headers.cookie); // { mycookie: 'test' }

    // /(home) -> /login?id=asdfa;password=as2d4f -> /
    // 주소가 /login으로 시작하는 경우
    // url과 querystring 모듈로 각각 주소와 주소에 딸려오는 쿼리들을 분석한다.
    // 그리고 쿠키의 만료시간도 5분으로 설정을 해준다.
    if (req.url.startsWith('/login')) { // 처음으로 로그인 하는 경우
        const { query } = url.parse(req.url);
        const { name } = qs.parse(query);
        // 지금 시간을 가져온다.
        const expires = new Date();

        // 쿠키 유효 시간을 현재시간 + 5분으로 설정
        expires.setMinutes(expires.getMinutes() + 5);

        res.writeHead(302, {
            Location: '/',
            // AJAX 상에서 한국어는 지원이 안 된다.
            // 그렇기 때문에 encodeURIComponent 메서드를 이용해서
            // 웹 상에서 왔다갔다할 수 있는 코드로 변환을 해준다.
            'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
          });

        // 설정된 쿠키값이 보내진다.
        // 본문없이 header만 보내줘도 된다.
        res.end();
    } else if(cookies.name) { // name이라는 쿠키가 있으면, 즉 로그인이 되어있으면
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`${cookies.name}님 안녕하세요`);
    } else {
        try {
            // 쿠키가 없는 경우는
            // 다시 html 파일하고, 그에 맞는 쿠키를 보내줘야 한다.
            const data = await fs.readFile('./cookie2.html');
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        } catch(err) {
            console.log(err);
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end(err.message);
        }
    }
})
    .listen(8080, () => {
        console.log('8080번 포트에서 대기중')
    });