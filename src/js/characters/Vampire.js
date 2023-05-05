// level - уровень, от 1 до 4
// this.attack - показатель атаки
// this.defence - показатель защиты
// this.possibleMoves - количество клеток для перемещения
// this.possibleAttacks - количество клеток для атаки

import Character from '../Character';

export default class Vampire extends Character {
  constructor(level) {
    super(level, 'vampire');
    this.attack = 25;
    this.defence = 25;
    this.possibleMoves = 2;
    this.possibleAttacks = 2;
  }
}
