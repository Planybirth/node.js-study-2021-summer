// cluster
// Node.js 는 싱글 프로세스에서 실행한는 것이 일반적이다.
// 여러 코어를 사용하기 위해 병렬 처리 시스템을 사용해 부하를 분산시킬 수 있다. 
// 이 방식이 클러스터이다.

// 단, 메모리는 공유하지 못한다.


// 1. 마스터 프로세스를 실행한다.
const http = require('http');
const cluster = require('cluster'); // 추가된 모듈 cluster
const { mainModule } = require('process');

const numCPUs = require('os').cpus().length; // 모듈의 특정값으로 cpu 개수를 가져왔다.

if(cluster.isMaster) {  // 마스터 프로세스인 경우
    // 마스터 프로세스를 반환한다.
    console.log(`마스터 프로세스 아이디: ${process.pid}`);

    // CPU 갯수만큼 워커를 생성한다. 즉 자식 프로세스를 생성한다.
    // fork() : 프로세스를 새로 실행.
    for(let i = 0; i < numCPUs; ++i) {
        cluster.fork();
    }

    // 개별적으로 Node 서버가 만들어진다.
    // 같은 포트이더라도 작동한다.
    // code : return 0 / return 1에서의 숫자. 프로그램이 끝나면 반환해주는 숫자.
    // signal : 프로세스에게 전달하는 신호. 
    cluster.on('exit', (worker, code, signal) => {
        console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
        console.log('code', code, 'signal', signal);
        // exit하면서 서버가 꺼지게 되므로 다시 실행시켜준다.
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
            // exit시 30번째 줄의 exit로 이동한다.
            process.exit(1);
        }, 1000);

    }).listen(8080);
    // signal을 보내지 않으면 null이 출력된다.

    // 확인용 콘솔로그 출력
    console.log(`${process.pid}번 워커 실행`);
}