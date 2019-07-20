const DAYS = {
  MONDAY: 'MONDAY',
  TUESDAY: 'TUESDAY',
  WEDNESDAY: 'WEDNESDAY',
  THURSDAY: 'THURSDAY',
  FRIDAY: 'FRIDAY',
}

const REGEXPS = {
  VEGETARIAN: /\*Vegetarian\:\*[\s\w\,\(\)\.\"\-]*/gm,
  VEGAN: /\*Vegan\:\*[\s\w\,\(\)\.\"\-]*/gm,
  OMNI: /\*Omni\:\*[\s\w\,\(\)\.\"\-]*/gm,
}

const NO_DISH_OPTIONS = ['JUST SALAD FOR ME', 'NO LUNCH FOR ME TODAY']

/**
 * Goes through a provided form definition and extracts the 3
 * available meals for each day, removing information about the
 * salad bar ingredients.
 *
 * @param {object} formDefinition - The lunch form json definition
 * @returns {object} - An object with days as keys and the full text
 * of dish options per each day as values (including line jumps, etc.)
 */
const getAllDishesPerDay = formDefinition => {
  const threeDishesPerDay = Object.values(DAYS).reduce((accum, day) => {
    const fullMenuOfTheDay = formDefinition.fields.find(field =>
      field.title.includes(day),
    ).properties.description

    const threeDishesOfTheDay = fullMenuOfTheDay.split(
      '----------------------------------------',
    )[1] // discard Salad bar

    accum[day] = threeDishesOfTheDay
    return accum
  }, {})

  return threeDishesPerDay
}

/**
 * If there's lunch available that day, (i.e., the string has a `-`)
 * it extracts the description of the dish and returns it.
 *
 * @param {string} dayChoice - Example 'Omni - Milanesa with papas fritas'
 * @returns {string} - 'Milanesa with papas fritas'
 */
const getDishTypeFromChoice = dayChoice => {
  const SEPARATOR = ' - '

  if (dayChoice.includes(SEPARATOR)) {
    return dayChoice.split(SEPARATOR)[1]
  }

  return dayChoice
}

/**
 * Goes through a dayChoices per `${day}Choice` object and returns
 * a dishType per `day`
 *
 * @param {object} - An object with `${day}Choice` as keys and a string like
 * 'Omni - Milanesa with papas fritas' as values
 * @returns {object} - An object with `day` as
 */
const getSelectedDishTypePerDay = inputData => {
  const selectedDishTypePerDay = Object.values(DAYS).reduce((accum, day) => {
    const dayChoice = inputData[`${day.toLowerCase()}Choice`]

    accum[day] = getDishTypeFromChoice(dayChoice)
    return accum
  }, {})

  return selectedDishTypePerDay
}

/**
 * Uses the dish type (Omni, etc) selected for each day to match it to
 * the dish options available that day, and produce a dish description.
 *
 * @param {object} dishOptionsPerDay
 * @param {object} selectedDishTypePerDay
 */
const getSelectedDishesPerDay = (dishOptionsPerDay, selectedDishTypePerDay) => {
  const selectedDishesPerDay = Object.values(DAYS).reduce((accum, day) => {
    const noDishSelected = NO_DISH_OPTIONS.some(NDO =>
      selectedDishTypePerDay[day].includes(NDO),
    )

    if (noDishSelected) {
      accum[day] = selectedDishTypePerDay[day]
      return accum
    }

    accum[day] = dishOptionsPerDay[day]
      .match(REGEXPS[selectedDishTypePerDay[day]])[0]
      .split('* ')[1]

    return accum
  }, {})

  return selectedDishesPerDay
}

////////////////////////
//       SCRIPT       //
////////////////////////

const myAsyncFunc = async () => {
  // Get form definition
  const res = await fetch('https://api.typeform.com/forms/so1jyt')
  const formDefinition = await res.json()

  // The three different options for each day
  const dishOptionsPerDay = getAllDishesPerDay(formDefinition)

  // Selected dish types per day, like {monday: 'Omni', ...}
  const selectedDishTypePerDay = getSelectedDishTypePerDay(inputData)

  // Match dish type with dish options, like {monday: 'Milanesa with papas fritas'}
  const selectedDishesPerDay = getSelectedDishesPerDay(
    dishOptionsPerDay,
    selectedDishTypePerDay,
  )

  return selectedDishesPerDay
}

myAsyncFunc()

// EXPORTING FOR TESTING PURPOSES //
module.exports = {
  getAllDishesPerDay,
  getDishTypeFromChoice,
  getSelectedDishTypePerDay,
  getSelectedDishesPerDay,
  constants: {
    DAYS,
    REGEXPS,
  },
}
