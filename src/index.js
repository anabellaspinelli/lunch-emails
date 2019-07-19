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

  return threeDishesPerDay // MONDAY: "OMNI: blablabla \n VEGAN: blboaboaboa \n etc..."
}

const getDishTypeFromChoice = dayChoice => {
  const SEPARATOR = ' - '

  if (dayChoice.includes(SEPARATOR)) {
    return dayChoice.split(SEPARATOR)[1]
  }

  return dayChoice
}

const getSelectedDishTypePerDay = inputData => {
  const selectedDishTypePerDay = Object.values(DAYS).reduce((accum, day) => {
    const dayChoice = inputData[`${day.toLowerCase()}Choice`]

    accum[day] = getDishTypeFromChoice(dayChoice)
    return accum
  }, {})

  return selectedDishTypePerDay
}

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

  const dishOptionsPerDay = getAllDishesPerDay(formDefinition)
  const selectedDishTypePerDay = getSelectedDishTypePerDay(inputData)

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
