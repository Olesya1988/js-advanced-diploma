import themes from './themes';
import PositionedCharacter from './PositionedCharacter';
import { generateTeam } from './generators';
import Team from './Team';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
  }

  init() {
    // TODO: add event listeners to gamePlay events
    // TODO: load saved stated from stateService
    this.gamePlay.drawUi(themes.prairie);

    const goodTeam = new Team(generateTeam(['Magician', 'Swordsman', 'Bowman'], 1, 2));
    const badTeam = new Team(generateTeam(['Vampire', 'Undead', 'Daemon'], 1, 2));

    this.goodTeam = goodTeam.toArrayOfPlayers().map((character, index) => new PositionedCharacter(
      character,
      this.generateRandomPosition([
        0, 1, 8, 9, 16, 17, 24, 25, 32, 33, 40, 41, 48, 49, 56, 57,
      ]),
    ));

    this.badTeam = badTeam.toArrayOfPlayers().map((character, index) => new PositionedCharacter(
      character,
      this.generateRandomPosition([
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 62, 63,
      ]),
    ));
    this.arrAllTeams = this.goodTeam.concat(this.badTeam);
    this.gamePlay.redrawPositions(this.arrAllTeams);
  }

  generateRandomPosition(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const result = array[randomIndex];
    array.splice(randomIndex, 1);
    return result;
  }

  onCellClick(index) {
    // TODO: react to click
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
  }
}
