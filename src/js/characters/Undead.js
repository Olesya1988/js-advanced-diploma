// level - уровень, от 1 до 4
// this.attack - показатель атаки
// this.defence - показатель защиты
// this.possibleMoves - количество клеток для перемещения
// this.possibleAttacks - количество клеток для атаки

import Character from '../Character';

export default class Undead extends Character {
  constructor(level) {
    super(level, 'undead');
    this.attack = 40;
    this.defence = 10;
    this.possibleMoves = 4;
    this.possibleAttacks = 1;
  }
}
