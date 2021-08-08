const http = require('http');
const cluster = require('cluster');
const { mainModule } = require('process');

const numCPUs = require('os').cpus().length;

if(cluster.isMaster) {
    console.log(`마스터 프로세스 아이디: ${process.pid}`);

    // CPU 갯수만큼 워커를 생성한다. 즉 자식 프로세스를 생성한다.
    for(let i = 0; i < numCPUs; ++i) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
        console.log('code', code, 'signal', signal);
        cluster.fork();
    });
} else {    // 자식 프로세스인 경우
    http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8'});
        res.write('<h1>Hello Node!</h1>');
        res.end('<p>Hello Server!</p>');

        setTimeout(() => { // 워커 존재를 확인하기 위해 1초마다 강제 종료
            // exit를 할 때는 인자로 들어온 값을 return 해주기 때문에
            // 위의 code에는 인자로 들어온 값이 출력된다.
            process.exit(1);
        }, 1000);
    }).listen(8080);

    console.log(`${process.pid}번 워커 실행`);
}