const { getOfficeAndDishType } = require("../index")

describe("parse location/type selection", () => {
  it("returns an object with location and dish type", () => {
    const pair = getOfficeAndDishType("HQ - Omni")
    expect(pair.location).toEqual("HQ")
    expect(pair.dishType).toEqual("OMNI")
  })
})
