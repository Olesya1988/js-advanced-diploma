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
      this.generateRandomPosition(this.getInitialPositions(this.goodTeam)),
    ));

    this.badTeam = badTeam.toArrayOfPlayers().map((character, index) => new PositionedCharacter(
      character,
      this.generateRandomPosition(this.getInitialPositions(this.badTeam)),
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

  getInitialPositions(team) {    
    this.initialPosition = [];
    if (team === this.goodTeam) {
      for (let i = 0, i2 = 1; this.initialPosition.length < this.gamePlay.boardSize * 2; i += this.gamePlay.boardSize, i2 += this.gamePlay.boardSize) {
        this.initialPosition.push(i, i2);
      }
    } else {
      for (let i = this.gamePlay.boardSize - 2, i2 = this.gamePlay.boardSize - 1; this.initialPosition.length < this.gamePlay.boardSize * 2; i += this.gamePlay.boardSize, i2 += this.gamePlay.boardSize) {
        this.initialPosition.push(i, i2);
      }
    }
    
    return this.initialPosition;
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
