// I/O : C언어 하다보면
// stdio.h를 사용한다. printf, scanf등 이것이 standard IO에 해당한다.
// input, output 입출력
// IO의 종류 : 파일 시스템 접근 ( 파일을 읽어오기, 파일에 쓰거나, 폴더를 만들거나 )
// 네트워크에 정보를 요청해서 가져오거나 (읽는것), 네트워크를 통해서 서버에 정보를 보내는 것 (출력)

// 블로킹 IO : 파일을 직접적으로 가져와서 읽고 쓰는 경우 많이 사용한다.
function longRunningTask{
    //오래 걸리는 작업
    console.log('오래 기다렸습니다~');
}
console.log('작업 시작');
longRunningTask();
console.log('다음 작업');

// 논 블로킹 IO : 네트워크 환경에서 정보를 주고 받을 때 자주 사용한다.
// 논 블로킹이 무조건적인 동시성을 보장하지는 않는다.
// 작업 같은 경우는 자원을 많이 먹기 때문에 동시에 돌아갈 작업 수가 스레드 수보다 많으면 

//node.js는 제어할 수 있는 스레드가 하나밖에 없다. 
console.log('작업 시작');
setTimeout(longRunningTask,0);
console.log('다음 작업');
