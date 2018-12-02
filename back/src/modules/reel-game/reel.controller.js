export default () => (
  {
    runReel: (req, res) => {
      const result = spinWheelAndGetResult()
      res.status(200).json(result)
    },
  }
)

export const getReels = () => ({
  reel1: ["cherry", "lemon", "apple", "lemon", "banana", "banana", "lemon", "lemon"],
  reel2: ["lemon", "apple", "lemon", "lemon", "cherry", "apple", "banana", "lemon"],
  reel3: ["lemon", "apple", "lemon", "apple", "cherry", "lemon", "banana", "lemon"],
})

export const getCoinsForResult = ({ fruitName, occurrences }) => {
  const TABLE_OF_VALUES = {
    '3cherry': 50,
    '2cherry': 40,
    '3apple': 20,
    '2apple': 10,
    '3banana': 15,
    '2banana': 5,
    '3lemon': 3,
  }

  return TABLE_OF_VALUES[`${occurrences}${fruitName}`] || 0
}

const spinWheelAndGetResult = () => {
  const resultArray = getResultArray()
  const resultObject = verifyResult(resultArray)
  const coins = getCoinsForResult(resultObject)
  return {
    coins,
    result: resultArray
  }
}

export const getResultArray = () => {
  const reels = getReels()
  const firstValue = getValueFromReel(reels.reel1)
  const secondValue = getValueFromReel(reels.reel2)
  const thirdValue = getValueFromReel(reels.reel3)
  return [firstValue, secondValue, thirdValue]
}

export const verifyResult = (reelsResult) =>
  reelsResult.reduce((prev, fruitName) => {
    if (fruitName === prev.fruitName) {
      return {
        ...prev,
        occurrences: prev.occurrences + 1
      }
    }
    else if (!prev.occurrences || prev.occurrences == 1) {
      return {
        fruitName,
        occurrences: 1,
      }
    }
    else {
      return prev
    }

  }, {})

export const getValueFromReel = (reel) => reel[Math.floor((Math.random() * 7) + 1)]

