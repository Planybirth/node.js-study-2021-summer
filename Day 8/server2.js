const http = require('http');
// file system : 동기적!
// file system + promises 
// .promises : 비동기적으로 이 파일들을 가져오겠다!
const fs = require('fs').promises;

http.createServer(async (req, res) => {
    // try, catch
    // 예외 처리
    // try를 실행 도중에 에러가 발생하면
    // catch에서 처리한다.
    try {
        // await : async로 선언한 함수를 불러올 때 앞에 붙이는 키워드
        const data = await fs.readFile('./server2.html');
        res.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8'});
        res.write(data);
        res.end();
    } catch (err) {
        console.error(err);
        // 2XX : 성공을 알리는 코드
        // 3XX : 리다이렉션(다른 페이지로 이동) 을 알리는 상태 코드
        // 4XX : 요청 오류 400(잘못된 요청), 401(권한 없음), 403 forbidden, 404 not found
        // 5XX : 서버 오류 500(서버 내부 오류), 502(불량 게이트웨이), 503(서비스를 사용할 수 없음)
        res.writeHead(500, { 'Content-Type' : 'text/plain; charset=utf-8'});
        res.end(err.message);
    }
}).listen(8080, () => {
    console.log('8080 포트에서 서버 대기 중입니다.');
})