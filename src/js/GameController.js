// this.selectedPlayerPosition - позиция выбранного игрока
// getPossibleMoves - возможные ходы
// createTooltip -
import Team from './Team';
import { generateTeam } from './generators';
import PositionedCharacter from './PositionedCharacter';
import GamePlay from './GamePlay';
import cursors from './cursors';
import getPossibleMoves from './getPossibleMoves';
import getTooltip from './getTooltip';
import themes from './themes';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.selectedPlayerPosition = this.gamePlay.cells.findIndex((el) => el.classList.contains('selected-yellow'));
  }

  // инициализация игры
  init() {
    // рисуем поле с темой "прерия"
    this.gamePlay.drawUi(themes.prairie);

    // создаем команду goodTeam
    const goodTeamArr = new Team(generateTeam(['Magician', 'Swordsman', 'Bowman'], 1, 2));

    // eslint-disable-next-line
    this.goodTeam = goodTeamArr.toArrayOfPlayers().map((character, index) => new PositionedCharacter(
      character,
      this.generateRandomPosition(this.getInitialPositions(this.goodTeam)),
    ));

    console.log('this.goodTeam');
    console.log(this.goodTeam);

    // проверяем совпадения позиций
    if (this.goodTeam[0].position === this.goodTeam[1].position) {
      // eslint-disable-next-line
      this.goodTeam = goodTeamArr.toArrayOfPlayers().map((character, index) => new PositionedCharacter(
        character,
        this.generateRandomPosition(this.getInitialPositions(this.goodTeam)),
      ));
    }

    // создаем команду badTeamArr
    const badTeamArr = new Team(generateTeam(['Vampire', 'Undead', 'Daemon'], 1, 2));

    // eslint-disable-next-line
    this.badTeam = badTeamArr.toArrayOfPlayers().map((character, index) => new PositionedCharacter(
      character,
      this.generateRandomPosition(this.getInitialPositions(this.badTeam)),
    ));

    // проверяем совпадения позиций
    if (this.badTeam[0].position === this.badTeam[1].position) {
      // eslint-disable-next-line
      this.badTeam = badTeamArr.toArrayOfPlayers().map((character, index) => new PositionedCharacter(
        character,
        this.generateRandomPosition(this.getInitialPositions(this.badTeam)),
      ));
    }

    console.log('this.badTeam');
    console.log(this.badTeam);

    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));

    // объединяем две команды в одну
    this.generalTeam = this.goodTeam.concat(this.badTeam);

    // прорисовываем персонажей на поле
    this.gamePlay.redrawPositions(this.generalTeam);
    console.log('this.generalTeam');
    console.log(this.generalTeam);
  }

  // генерация массива позиций для заданной команды
  getInitialPositions(team) {
    this.initialPositions = [];
    if (team === this.goodTeam) {
      // eslint-disable-next-line
      for (let i = 0, i2 = 1; this.initialPositions.length < this.gamePlay.boardSize * 2; i += this.gamePlay.boardSize, i2 += this.gamePlay.boardSize) {
        this.initialPositions.push(i, i2);
      }
    } else {
      // eslint-disable-next-line
      for (let i = this.gamePlay.boardSize - 2, i2 = this.gamePlay.boardSize - 1; this.initialPositions.length < this.gamePlay.boardSize * 2; i += this.gamePlay.boardSize, i2 += this.gamePlay.boardSize) { 
        this.initialPositions.push(i, i2);
      }
    }

    return this.initialPositions;
  }

  // генерация случайного элемента из массива
  // eslint-disable-next-line
  generateRandomPosition(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    const result = array[randomIndex];
    array.splice(randomIndex, 1);
    return result;
  }

  // действия при клике мыши
  onCellClick(index) {
    const selectedPlayer = event.currentTarget.firstElementChild;
    console.log('selectedPlayer');
    console.log(selectedPlayer);

    if (selectedPlayer !== null) {
      if (this.selectedPlayerPosition !== -1) {
        this.gamePlay.deselectCell(this.selectedPlayerPosition);
      }

      // опредение позиций перемещения и атаки
      // eslint-disable-next-line
      if (selectedPlayer.classList.contains('bowman') || selectedPlayer.classList.contains('magician') || selectedPlayer.classList.contains('swordsman')) {
        this.selectedPlayerPosition = index;
        this.gamePlay.selectCell(index);

        const { character } = this.generalTeam.find((el) => el.position === index);
        console.log('character');
        console.log(character);

        [this.arrOfPossibleMoves, this.arrOfPossibleAttacks] = getPossibleMoves(
          this.gamePlay.boardSize,
          index,
          character.possibleMoves,
          character.possibleAttacks,
        );

      // атака, нанесение урона
      // eslint-disable-next-line
      } else if ((selectedPlayer.classList.contains('daemon') || selectedPlayer.classList.contains('undead') || selectedPlayer.classList.contains('vampire')) && this.selectedPlayerPosition >= 0) {
        if (this.arrOfPossibleAttacks.includes(index)) {
          // eslint-disable-next-line
          const indexOfAttacker = this.generalTeam.findIndex((el) => el.position === this.selectedPlayerPosition);
          const indexOfTarget = this.generalTeam.findIndex((el) => el.position === index);

          if (indexOfAttacker >= 0 && indexOfTarget >= 0) {
            const attacker = this.generalTeam[indexOfAttacker].character;
            const target = this.generalTeam[indexOfTarget].character;
            // eslint-disable-next-line
            const damage = Math.floor(Math.max(attacker.attack - target.defence, attacker.attack * 0.1));
            target.health -= damage;

            this.gamePlay.showDamage(index, damage).then(() => {
              this.gamePlay.redrawPositions(this.generalTeam);
            });
          }
          this.gamePlay.selectCell(this.selectedPlayerPosition);
        } else {
          GamePlay.showError('Выберите правильного игрока: Лучника, Мечника или Мага');
        }
      }
    }

    // перемещение игрока
    // eslint-disable-next-line
    if (selectedPlayer === null && this.selectedPlayerPosition >= 0 && this.arrOfPossibleMoves.includes(index)) {
      // eslint-disable-next-line
      const characterInMove = this.generalTeam.findIndex((el) => el.position === this.selectedPlayerPosition);
      if (characterInMove >= 0) {
        this.generalTeam[characterInMove].position = index;
        this.gamePlay.deselectCell(this.selectedPlayerPosition);
        this.selectedPlayerPosition = index;
        this.gamePlay.redrawPositions(this.generalTeam);
        this.onCellClick(index);
      }
    }
  }

  // события при наведении курсора
  onCellEnter(index) {
    if (this.selectedPlayerPosition === -1) {
      event.currentTarget.style.cursor = cursors.notallowed;
    } else if (this.arrOfPossibleMoves.includes(index) && !event.currentTarget.hasChildNodes()) {
      event.currentTarget.style.cursor = cursors.pointer;
      this.gamePlay.selectCell(index, 'green');
    } else {
      event.currentTarget.style.cursor = cursors.notallowed;
    }

    if (event.currentTarget.hasChildNodes()) {
      const { character } = this.generalTeam.find((el) => el.position === index);

      if (character) {
        const message = getTooltip(character);
        this.gamePlay.showCellTooltip(message, index);

        if (character.type === 'bowman' || character.type === 'magician' || character.type === 'swordsman') {
          event.currentTarget.style.cursor = cursors.pointer;
        } else if (character.type === 'daemon' || character.type === 'undead' || character.type === 'vampire') {
          // eslint-disable-next-line
          if (this.arrOfPossibleAttacks && this.arrOfPossibleAttacks.includes(index) && this.selectedPlayerPosition > 0) {
            event.currentTarget.style.cursor = cursors.crosshair;
            this.gamePlay.selectCell(index, 'red');
          }
        }
      }
    }
  }

  // события, когда курсор покидает клетку
  onCellLeave(index) {
    if (event.currentTarget.hasChildNodes()) {
      this.gamePlay.hideCellTooltip(index);
    }

    if (index !== this.selectedPlayerPosition) {
      this.gamePlay.deselectCell(index);
    }
  }
}
