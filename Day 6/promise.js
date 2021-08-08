const condition = true;

// 성공하면 resolve를 실행하고
// 실패하면 reject를 실행한다.

const promise = new Promise((resolve, reject) => {
    if (condition) {
        resolve('성공');
    } else {
        reject('실패');
    }
});

// 다른 코드가 들어갈 수 있다.
promise
    .then((message) => {
        console.log(message); // 성공한 경우 이것 실행
    })
    .then((message2) => {
        console.log(message2); // 성공한 경우 이것 실행
    })
    .catch((err) => {
        console.error(err); // 실패한 경우 이것 실행
    })
    .finally(() => { // 실패하던 성공하던 마지막엔 이것을 실행시킬 것.
        console.log('작업 끝');
    })
    