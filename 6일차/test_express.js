const express = require('express');

// 서버 
const app = express();

app.set('port', process.env.PORT || 8080);

// GET 완성
app.get('/', (req, res) => {
    res.send('Hello, Express');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port') + '번 포트에서 대기중');
})