class Player{
    //클래스를 생성할 때
    // 자동으로 실행되는 메서드
    constructor (type = 'player'){
        this.type = type;
    }

    //static 메서드
    //정적 메서드
    //의미? : 공유되는 메서드
    //전역 메서드라고도 한다.
    //전역 함수에서 얘를 써야되는 경우가 있어서 쓴다.
    // 이 클래스와 관련된 전역함수를 만들고 싶을 때 보통 많이 쓴다.
    static isPlayer(player){
        return player instanceof Player;
    }

    // 팁 : 보통 public 접근자를 가진 메서드의 경우
    // 보통은 대문자로 시작한다. 특히 c++, 게임 업계에서 사용한다.
    Attack() {
        console.log('attack');
    }
};

class Warrior extends player {
    constructor(type, firstName, lastName) {
        // 이 클래스가 상속받은 클래스에게 데이터를 넘겨주는 것
        // 같은 이름의 클래스에
        super(type);
        this.firstName = firstName;
        this.lastName = lastName;
    }

    sayName() {
        super.Attack();
        console.log(`${this.firstName} ${this.lastName}`);
    }
};

const newPlayer= new Warrior('player', 'Iron', 'Sword');
console.log(Player.isPlayer(newPlayer));
newPlayer.sayName();