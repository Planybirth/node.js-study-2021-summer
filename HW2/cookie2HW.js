const htp = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

// 쿠키를 파싱해준다. 일부 값을 가져온다.
const parseCookies = (cookie = '') =>
   // mycookies = test;favicon=test2
    cookie
        //{ 'mycookies=test' , 'favicon=test2'}
        .split(';') //문자열을 ;를 기준으로 배열로 쪼개준다
        //{ { mycookies='test' } , { favicon='test2' }}
        .map(v => v.split('='))
        //{ {mycookies='test'} , {favicon='test2'}}
        .reduce((acc, [k,v]) => { //
            // trim -> 앞과 뒤 공백을 지워서 ' test '를 'test'로 바꾸어 준다.
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});

// decodeURIComponent -> createServer를 하면서 encode를 해주므로 꼭 필요한 옵션이다.

http.createServer(async(req, res) => {
    // 클라이언트가 보내준 쿠키들을 전부 파싱해서 결과값으로 받아준다.
    const cookies = parseCookies(req.headers.cookie);

    // url과 querystring 모듈로 각각 주소와 주소에 딸려오는 쿼리들을 분석한다. (1), (2)
    // 그리고 쿠키의 만료시간도 5분으로 설정한다. (3)

    if (req.url.startsWith('/login')) { // 처음 로그인 했을 때
        const {query} = new URL(req.url); //(1)
        const {name} = qs.parse(query);  //(2), 파싱을 해서 고유값만 넣어준다.
        const expires = new Date(); //(3)

        // expires.setMinute = 쿠키 유효시간 설정
        expires.setMinutes(expires.getMinutes() + 5);

        res.writeHead(302, {
            Location : '/',
            // AJAX에서는 아스키 코드 이외의 문자를 인식하지 못한다. 그래서 encode를 통해서 인식 가능하게끔 바꿔주는 것임. 
            'Set=Cookie' : `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        
        // 설정된 쿠키값이 보내진다.
        // 본문없이 header만 보내줘도 된다.
        res.end();
    } else if(cookies.name) { // 로그인이 되어 있을 때
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(`${cookies.name}님 안녕하세요`);
    } else {
        try {
            // 쿠키가 없는 경우엔 html 파일과 그에 맞는 쿠키를 보내줘야 한다.
            const data = await fs.readFile('./cookie2.html');
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
            res.end(data);
        } catch(err) {
            console.log(err);
            res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' })
            res.end(err.message);
        }
    }
})
    .listen(8080, () => {
        console.log('8080번 포트에서 대기중');
    })