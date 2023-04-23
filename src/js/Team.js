/**
 * Класс, представляющий персонажей команды
 *
 * @todo Самостоятельно продумайте хранение персонажей в классе
 * Например
 * @example
 * ```js
 * const characters = [new Swordsman(2), new Bowman(1)]
 * const team = new Team(characters);
 *
 * team.characters // [swordsman, bowman]
 * ```
 * */
export default class Team {
  // TODO: write your logic here
  constructor(player) {
    this.characters = new Set();
    this.add(player);
  }

  add(players) {
    if (players.length === 0) {
      throw new Error('There are no players on the team');
    }

    players.forEach((character) => {
      this.characters.add(character);
    });
  }

  toArrayOfPlayers() {
    if (this.characters.size === 0) {
      throw new Error('There are no players on the team');
    }

    const arrayOfPlayers = [];

    this.characters.forEach((character) => {
      arrayOfPlayers.push(character);
    });

    return arrayOfPlayers;
  }
}
