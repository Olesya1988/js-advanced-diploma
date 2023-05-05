// level - уровень, от 1 до 4
// this.attack - показатель атаки
// this.defence - показатель защиты
// this.possibleMoves - количество клеток для перемещения
// this.possibleAttacks - количество клеток для атаки

import Character from '../Character';

export default class Daemon extends Character {
  constructor(level) {
    super(level, 'daemon');
    this.attack = 10;
    this.defence = 10;
    this.possibleMoves = 1;
    this.possibleAttacks = 4;
  }
}
