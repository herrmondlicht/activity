import { verifyResult } from "../reel.controller";
import each from 'jest-each';

describe('reel controller', () => {
  each([
    [
      ['banana', 'apple', 'banana'],
      { fruitName: 'banana', occurrences: 1 }
    ],
    [
      ['banana', 'banana', 'banana'],
      { fruitName: 'banana', occurrences: 3 }
    ],
    [
      ['banana', 'banana', 'lemon'],
      { fruitName: 'banana', occurrences: 2 }
    ],
    [
      ['banana', 'apple', 'apple'],
      { fruitName: 'apple', occurrences: 2 }
    ],
    [
      ['banana', 'apple', 'lemon'],
      { fruitName: 'lemon', occurrences: 1 }
    ],
  ]).it('return from verifyResult', (reelValue, expected) => {
    const actual = verifyResult(reelValue)
    expect(actual).toEqual(expected)
  })

})