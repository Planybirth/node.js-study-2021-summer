// 기존 방식
function add1(x,y){
    return x+y;
}

// 람다 방식
const add2 = (x,y) => {
    return x+y;
};

// 더 짧게 줄인 경우
const add3 = (x,y) => x+y;

// 좀 더 보기 쉽게 하고 싶으면
const add4 = (x,y) => (x + y);

function not1(x) {
    return !x;
}

// 위 식을 람다로
const not1 = (x) => !x;

//다만, add2의 사용법은
add2(4,6);