const {
  getDishTypeFromChoice,
  getAllDishesPerDay,
  getSelectedDishTypePerDay,
  getSelectedDishesPerDay,
  constants: { DAYS, REGEXPS },
} = require('../index')

const { formDefinition } = require('./form-definition')
const { inputData } = require('./input-data')
const {
  dishOptionsPerDay,
  dishTypePerDay,
  dishTypePerDayWithNoLunch,
  dishOptionsPerDayWithNoLunch,
} = require('./test-data')

describe('getDishTypeFromChoice', () => {
  it('returns the selected dish type', () => {
    const dishType = getDishTypeFromChoice('HQ - Omni')
    expect(dishType).toEqual('Omni')
  })
})

describe('getAllDishesPerDay', () => {
  it('returns an object of dish options per day', () => {
    const dishesPerDay = getAllDishesPerDay(formDefinition)

    Object.values(DAYS).forEach(day => {
      expect(dishesPerDay).toHaveProperty(day)
      expect(dishesPerDay[day].length).toBeGreaterThan(0)
    })
  })
})

describe('getSelectedDishTypePerDay', () => {
  it('returns an object of selected dish types by day', () => {
    const selectedDishTypePerDay = getSelectedDishTypePerDay(inputData)

    Object.values(DAYS).forEach(day => {
      const dayChoice = inputData[`${day.toLowerCase()}Choice`]
      const selectedDishType = selectedDishTypePerDay[day]

      expect(selectedDishTypePerDay).toHaveProperty(day)
      expect(selectedDishTypePerDay[day].length).toBeGreaterThan(0)
      expect(dayChoice.includes(selectedDishType)).toBe(true)
    })
  })
})

describe('getSelectedDishesPerDay', () => {
  it('returns an object of selected dish names per day', () => {
    const selectedDishPerDay = getSelectedDishesPerDay(
      dishOptionsPerDay,
      dishTypePerDay,
    )

    Object.values(DAYS).forEach(day => {
      const selectedDishOfTheDay = selectedDishPerDay[day]
      const dishOptionsOfTheDay = dishOptionsPerDay[day]

      expect(selectedDishPerDay).toHaveProperty(day)
      expect(selectedDishPerDay[day].length).toBeGreaterThan(0)
      expect(dishOptionsOfTheDay.includes(selectedDishOfTheDay)).toBe(true)
    })
  })

  it("returns an object with dish selections per day when some days don't have lunch", () => {
    const selectedDishPerDay = getSelectedDishesPerDay(
      dishOptionsPerDayWithNoLunch,
      dishTypePerDayWithNoLunch,
    )

    Object.values(DAYS).forEach(day => {
      const selectedDishOfTheDay = selectedDishPerDay[day]
      const dishOptionsOfTheDay = dishOptionsPerDay[day]

      expect(selectedDishPerDay).toHaveProperty(day)
      expect(selectedDishPerDay[day].length).toBeGreaterThan(0)
    })
  })
})
