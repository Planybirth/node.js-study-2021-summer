const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave : false,
    saveUninitialized : false,
    secret : process.env.COOKIE_SECRET,
    cookie : {
        httpOnly : true,
        secure : false,
    },
    name : 'session-cookie'
}));

app.use((req, res, next) => {
    console.log('모든 요청에 실행이 됩니다.');
    next();
});

app.get('/', (req, res, next) => { // 미들웨어
    // res.send('Hello, Express');
    // res.sendFile(path.join(__dirname, '/index.html'));
    console.log('GET / 요청에서만 실행됩니다.');
    next();
}, (req, res) => { // 미들웨어 아님
    // throw 에러나 예외처리 클래스를 던져주는 식의 명령어
    // return 하고 비슷한 느낌이면 다른 점은 이 문법은
    // 에러 처리에 특화가 되어있다.
    throw new Error('에러는 에러처리 미들웨어로 갑니다.');
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
    // next가 없기 때문에 여기서 미들웨어는 끝이 난다.
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});