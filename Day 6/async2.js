//for 문을 써서 프로미스를 순차적으로 실행시키고 싶은 경우. 여러 개의 프로미스가 존재함.
const promise1 = Promise.resolve('성공1');
const promise2 = Promise.resolve('성공2');

(async() => {
    //python의 for i in range(0,10) 0~9같은 것.
    for await(promise of [promise1, promise2]) {
        console.log(promise);
    }
})();

//  async는 데이터베이스에 저장할 때 많이 쓴다. 그래서 사용법은 꼭 알아둬야 한다.
