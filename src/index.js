const myFunc = async () => {
  const DAYS = {
    MONDAY: "MONDAY",
    TUESDAY: "TUESDAY",
    WEDNESDAY: "WEDNESDAY",
    THURSDAY: "THURSDAY",
    FRIDAY: "FRIDAY",
  }

  const REGEXPS = {
    VEGETARIAN: /\*Vegetarian\:\*[\s\w\,\(\)\.\"\-]*/gm,
    VEGAN: /\*Vegan\:\*[\s\w\,\(\)\.\"\-]*/gm,
    OMNI: /\*Omni\:\*[\s\w\,\(\)\.\"\-]*/gm,
  }

  // DELETE ME
  const inputData = {
    mondayChoice: "HQ - Just salad for me",
    tuesdayChoice: "No lunch for me today :)",
    wednesdayChoice: "HQ - Omni",
    thursdayChoice: "BH - Vegan",
    fridayChoice: "BH - Vegan",
  }

  const NO_DISH_OPTIONS = ["JUST SALAD FOR ME", "NO LUNCH FOR ME TODAY"]

  // extract dish name from menu of the day
  const getDishNamesPerDay = (formDefinition, selections) => {
    const dishNamePerDay = Object.values(DAYS).reduce((accum, day) => {
      const noDish = NO_DISH_OPTIONS.some(option => {
        selections[day].dishType.includes(option)
      })

      if (noDish) {
        accum[day] = inputData[`${day.toLowerCase()}Choice`]
        return accum
      }

      const fullMenuOfTheDay = formDefinition.fields.find(field =>
        field.title.includes(day),
      ).properties.description

      const threeDishesOfTheDay = fullMenuOfTheDay.split(
        "----------------------------------------",
      )[1] // discard Salad bar

      accum[day] = threeDishesOfTheDay
        .match(REGEXPS[selections[day].dishType])[0]
        .split("* ")[1]
      return accum
    }, {})

    return dishNamePerDay
  }

  // returns ['HQ', 'Vegan']
  const getOfficeAndDishType = dayChoice => {
    const pair = dayChoice.split(" - ").map(el => el.toUpperCase())

    if (pair.length === 1) {
      return {
        location: pair[0],
        dishType: pair[0],
      }
    }

    return {
      location: pair[0],
      dishType: pair[1],
    }
  }

  const selections = {
    MONDAY: getOfficeAndDishType(inputData.mondayChoice),
    TUESDAY: getOfficeAndDishType(inputData.tuesdayChoice),
    WEDNESDAY: getOfficeAndDishType(inputData.wednesdayChoice),
    THURSDAY: getOfficeAndDishType(inputData.thursdayChoice),
    FRIDAY: getOfficeAndDishType(inputData.fridayChoice),
  }

  // Get form definition
  const res = await fetch("https://api.typeform.com/forms/so1jyt")
  const formDefinition = await res.json()

  const dishNamePerDay = getDishNamesPerDay(formDefinition, selections)

  console.log({ dishNamePerDay })
  return dishNamePerDay
}

// myFunc()

const getOfficeAndDishType = dayChoice => {
  const pair = dayChoice.split(" - ").map(el => el.toUpperCase())

  if (pair.length === 1) {
    return {
      location: pair[0],
      dishType: pair[0],
    }
  }

  return {
    location: pair[0],
    dishType: pair[1],
  }
}

module.exports = {
  getOfficeAndDishType,
}
