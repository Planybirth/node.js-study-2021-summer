// [express란?]
// 기존의 방식에서 벗어난 새로운 웹 프레임워크
// 가독성, 확장성이 떨어지는 기존의 방식을 개선하고 새로운 편의기능을 추가하였다.

// [특징]
// 코드를 분리적으로 사용하여 가독성이 높다.
// 가볍고 유연하게 웹 프레임워크를 구성할 수 있게 되었다.
// if문으로 rest 요청 메서드, 주소를 구별하지 않아도 된다.

// *npm으로 express를 깔고, 갱신 시 서버를 재실행하는 nodemon 모듈이 유용하므로 
// 같이 깔아두는 것이 좋다.

// npm init명령으로 npm을 다운받고, 특별한 존재로 만든다. package.json이란 파일이 생성된다.
// package.json - script부분에 실행 스크립트를 추가하는 것이 좋다. "start":"nodemon /*실행파일*/"
const express = require('express', 'path', 'morgan', 
    'cookie-parser', 'express-session', 'dotenv'); // path : 파일 경로를 지정해주는 모듈


dotenv.config();
const app = express(); // express 객체 생성

// 프로세스 환경에 포트 번호가 지정되어 있으면 그 값을 사용하고, 아니라면 3000을 사용한다.
app.set('port', process.env.PORT || 3000);

// res.end를 쓰지 않아도 사용 가능하다. 다만 사용하는 것을 권장하는 편.
// app.get(주소, 라우터)
// 주소에 대한 get이 들어오면 어떤 동작을 할 지 적는다.


// * 유용한 패키지들 ( ~48번째 줄까지 )
// morgan : 자세한 로그를 볼 수 있게 해준다. dev, combined가 자주 쓰인다.
app.use(morgan('dev'));

// static : 기본적으로 express에서 제공하는 미들웨어. 정적인 파일을 제공하는 라우터 역할을 한다.
// 아래 코드는 요청 주소에 public을 넣지 않아도 접근이 가능하게 한다.
// 외부에서 서버 구조를 쉽게 파악할 수 없어 보안 강화에 도움이 된다.
// fs.readFile을 이용하지 않아도 파일을 읽어올 수 있다.
app.use('/', express.static(path.join(__dirname, 'public')));

// body-parser
// 요청 본문의 데이터를 해석해서 req.body로 만들어 주는 미들웨어이다.
// 이미지, 동영상, 파일 데이터는 처리하지 못하지만 form 데이터나 AJAX 요청 데이터를 처리한다.
// express 내장 기능이지만 Raw, Text 형식 데이터를 지원하기 위해선 수동 설치가 필요하다.

app.use(express.json()); // 데이터를 json으로 내보내겠다는 미들웨어
app.use(express.urlencoded({ extended : false })); // true인 경우 qs모듈로 쿼리스트링 해석
// false인 경우 queryString으로 해석

// cookie-parser
// 요청에 동봉된 쿠키를 해석해 req.cookies 객체로 만들어 준다.
// body-parser와 같이 사용한다면 a=b 형식의 쿠키는 { a : 'b'} 형식으로  req.cookies에 들어간다.
app.use(cookieParser(process.env.COOKIE_SECRET)); // process.env.COOKIE_SECRET === 비밀키

// exress-session
// 특정 사용자를 위한 데이터를 임시적으로 저장해 둘 경우 유용하다. 세션 관리용 미들웨어.
app.use(session({
    resave : false, // 세션 변경사항이 없더라도 저장할 지 설정
    saveUninitialized : false, // 세션에 저장할 내역이 없어도 처음부터 세션을 생성할 지 설정
    secret : process.env.COOKIE_SECRET, // 더욱 안전한 전송 옵션으로 쿠키에 필요한 서명값을 보낸다.
    
    // 쿠키 설정
    cookie : {  
        httpOnly : true,
        secure : false,
    },
    name : 'session-cookie'
}));

// multer
// static의 멀티 파트 데이터의 업로드 문제를 해결하기 위해 사용하는 방식. 
// 다중 파일 업로드도 가능하다.
const multer = require('multer');


const fs = require('fs');

// uploads 폴더가 있으면 해당 디렉터리를 사용 / 없으면 생성
try {
    fs.readdirSync('uploads');
} catch(err) {
    console.error('uploads 폴더가 없기 때문에 uploads 폴더를 만들겠습니다.');
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage : multer.diskStorage({
        // 파일이 들어왔을 때 저장될 경로를 설정
        destination(req, file, done) {
            done(null, 'uploads/');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    // 파일 업로드 제한 크기
    limits : {fileSize : 5 * 1024 * 1024},
});


app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'multipart.html')); // 라우터이므로 sendFile 사용
});

app.post('/upload', 
    upload.fields([{name : 'image1'}, {name : 'image2'}]),
    (req, res) => {
        console.log(req.files, req.body);
        res.send('ok');
    }
);

// 미들웨어
// 요청과 응답 중간에 위치하며, 익스프레스의 핵심이 되는 부분이다.
// 요청, 응답을 조작하고, 기능 추가를 하기도 한다.
// 사용법은 app.use(미들웨어)

// app.use( ( req, res, next ) => {} )
// use는 REST API의 5가지 요소에 대하여 모두 실행된다.
// 모든 요청에 대하여 실행된다. 주소를 첫 번째 인수로 주어야 한다.


app.get('/', (req, res, next) => { // next가 있으므로 미들웨어이다.
    console.log('GET / 요청에서만 실행됩니다.');

    // next : 다음 미들웨어로 넘어가게 해준다. 
    // { next() }, {(req, res)}~~ 같이 다음 괄호가 있으면 해당 미들웨어로 넘어간다.
    // 다른 미들웨어와 값변경을 거칠 시 주의를 요한다.
    next();
    
}, (req, res) => { // next가 없으므로 미들웨어가 아니다
    // throw : 사용자 정의 예외를 발생시키는 명령어
    // return와 비슷하나 error 처리에 더욱 특화되어 있다. 
    // 해당 에러는 아래의 107번째 줄 에러처리 미들웨어로 이동한다.
    throw new Error('에러는 에러처리 미들웨어로 갑니다.');
});

// 에러 처리를 할 때만 err가 붙는다. 인수가 총 4개이다.
// 다음은 에러 처리를 위한 미들웨어.
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
    // next가 없기 때문에 여기서 미들웨어가 종료된다.
});

// listen은 http와 사용하는 방법이 동일하다.
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});