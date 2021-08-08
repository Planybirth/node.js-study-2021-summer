class Human {
    constructor() {}
    static ping() {
      return 'ping';
    }
  }
  
  class Computer extends Human {
    constructor() {}
    static pingpong() {
      return super.ping() + ' pong';
    }
  }
  Computer.pingpong(); // 'ping pong'
  