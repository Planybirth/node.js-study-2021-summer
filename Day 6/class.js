let player = function(type){
    this.type = type || 'player';
}

player.isPlayer = function (player) {
    // instanceof :
    // 왼쪽에 변수, instanceof 오른쪽엔 클래스 이름이 온다.
    // 변수가 이 오른쪽에 있는 클래스 타입인지 검사하는 것이 instanceof이다.
    return player instanceof Player;  
}

Player.prototype.attack = function() {
    console.log('Attack!');
};

let Warrior = function(type, firstName, lastName) {
    Player.apply(this, arguments);
    this.firstName = firstName;
    this.lastName = lastName;
};

Warrior.prototype = Object.create(Player.prototype);
Warrior.prototype.constructor = Warrior;
Warrior.prototype.sayName = function() {
    console.log(`${this.firstName} ${this.lastName}`);
}

let OldWarrior = new Warrior('player', 'Iron', 'Sword');
console.log(Player.isPlayer(OldWarrior))