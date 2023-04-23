/**
 * Формирует экземпляр персонажа из массива allowedTypes со
 * случайным уровнем от 1 до maxLevel
 *
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @returns генератор, который при каждом вызове
 * возвращает новый экземпляр класса персонажа
 *
 */

import Bowman from './characters/Bowman';
import Magician from './characters/Magician';
import Daemon from './characters/Daemon';
import Swordsman from './characters/Swordsman';
import Vampire from './characters/Vampire';
import Undead from './characters/Undead';

export function* characterGenerator(allowedTypes, maxLevel) {
  // TODO: write logic here
  const typeRandom = allowedTypes[Math.floor(Math.random() * allowedTypes.length)];
  const levelRandom = Math.floor((Math.random() * maxLevel) + 1);

  if (typeRandom === 'Bowman') {
    yield new Bowman(levelRandom);
  } else if (typeRandom === 'Magician') {
    yield new Magician(levelRandom);
  } else if (typeRandom === 'Swordsman') {
    yield new Swordsman(levelRandom);
  } else if (typeRandom === 'Daemon') {
    yield new Daemon(levelRandom);
  } else if (typeRandom === 'Vampire') {
    yield new Vampire(levelRandom);
  } else if (typeRandom === 'Undead') {
    yield new Undead(levelRandom);
  }
}

/**
 * Формирует массив персонажей на основе characterGenerator
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @param characterCount количество персонажей, которое нужно сформировать
 * @returns экземпляр Team, хранящий экземпляры персонажей.
 * Количество персонажей в команде - characterCount
 * */
export function generateTeam(allowedTypes, maxLevel, characterCount) {
  // TODO: write logic here
  const characters = [];

  for (let i = 0; i < characterCount; i++) {
    characters.push(characterGenerator(allowedTypes, maxLevel).next().value);
  }

  return characters;
}
