let candyMachine = {
    status : {
        name : 'candy',
        count : 5,
    },
    getCandy : function(){
        this.status.count--;
        return this.status.count;
    }.
};

let getCandy = candyMachine.getCandy;
let count = candyMachine.status.count;

// 구조분할 할당을 이용해서 줄인다면

let { getCandy2 , status : { count }} = candyMachine;
 ~
// 배열에서는 어떻게 사용할까?
let arr = ['node', {} , 10, true];
let node = arr[0];
let obj = arr[1];
let bool = arr[3];

// 이것을 이런식으로도 가능하다.
// 위랑 같은 문법으로 나름 규칙이 있따. 만약 내가 받을 생각이 없는 변수라면 무조건 스킵을 하고 넘어가야 한다.
const [node, obj, ,bool] = arr;
