export default class GameState {
  // eslint-disable-next-line
  constructor() {    
    this.statistics = [];
    this.balls = 0;
  }

  static from(object) {
    // TODO: create object
    if (object.level > 4) {
      // eslint-disable-next-line
      object.state = 'gameOver';
    }
    return object;
  }
}
