const str = 'abc';
const num = 1;
const boolean = true;

const obj = {
    outside : {
        inside : {
            key : 'value',
        },
    },
};

console.time('전체 시간');
console.log('평범한 로그');
console.log(str, num, boolean);
console.error('에러 메시지는 여기 담습니다.');

console.table([{ name : '차', birth : 1995 }, { name : '이', birth : 1988}]);

console.dir(obj, { colors : false, depth : 2 });
console.dir(obj, { colors : true, depth : 1 });

console.time('시간 측정');
for (let i = 0; i < 100000; ++i) {}
console.timeEnd('시간 측정');

function b() {
    console.trace('에러 위치 추적');
}

function a() {
    b();
}
a();

console.timeEnd('전체 시간');