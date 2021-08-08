
// 다른 코드가 들어갈 수 있다.
promise
    .then((message1) => {
        return new Promise((resolve, reject) => {
            resolve(message1);
        })
    })
    .then((message2) => {
        console.log(message2); // 성공한 경우 이것 실행
        return new Promise((resolve, reject) => {
            resolve(message2); //1,2 구분은 서로 타입이 다른 경우나, 
    })
    .catch((err) => {
        console.error(err); // 실패한 경우 이것 실행
    })
    .finally(() => { // 실패하던 성공하던 마지막엔 이것을 실행시킬 것.
        console.log('작업 끝');
    })