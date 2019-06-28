const dishOptionsPerDay = {
  MONDAY:
    '*MAIN DISH:* \n● *Vegetarian:* Vegetable couscous. _(310 Kcal) (g)_\n● *Vegan:* Grilled vegetables and potato served with romesco sauce (hazelnut, almonds). _(190 Kcal) (g, e, n, d)_\n● *Omni:* Dorada fish fillet, "pico de gallo" and quinoa.\n_(330 Kcal) (f)_',
  TUESDAY:
    '*MAIN DISH:* \n● *Vegetarian:* Vegetable couscous. _(310 Kcal) (g)_\n● *Vegan:* Grilled vegetables and potato served with romesco sauce (hazelnut, almonds). _(190 Kcal) (g, e, n, d)_\n● *Omni:* Dorada fish fillet, "pico de gallo" and quinoa.\n_(330 Kcal) (f)_',
  WEDNESDAY:
    '*MAIN DISH:* \n● *Vegetarian:* Vegetable couscous. _(310 Kcal) (g)_\n● *Vegan:* Grilled vegetables and potato served with romesco sauce (hazelnut, almonds). _(190 Kcal) (g, e, n, d)_\n● *Omni:* Dorada fish fillet, "pico de gallo" and quinoa.\n_(330 Kcal) (f)_',
  THURSDAY:
    '*MAIN DISH:* \n● *Vegetarian:* Vegetable couscous. _(310 Kcal) (g)_\n● *Vegan:* Grilled vegetables and potato served with romesco sauce (hazelnut, almonds). _(190 Kcal) (g, e, n, d)_\n● *Omni:* Dorada fish fillet, "pico de gallo" and quinoa.\n_(330 Kcal) (f)_',
  FRIDAY:
    '*MAIN DISH:* \n● *Vegetarian:* Vegetable couscous. _(310 Kcal) (g)_\n● *Vegan:* Grilled vegetables and potato served with romesco sauce (hazelnut, almonds). _(190 Kcal) (g, e, n, d)_\n● *Omni:* Dorada fish fillet, "pico de gallo" and quinoa.\n_(330 Kcal) (f)_',
}

const dishOptionsPerDayWithNoLunch = {
  MONDAY:
    '*MAIN DISH:* \n● *Vegetarian:* Vegetable couscous. _(310 Kcal) (g)_\n● *Vegan:* Grilled vegetables and potato served with romesco sauce (hazelnut, almonds). _(190 Kcal) (g, e, n, d)_\n● *Omni:* Dorada fish fillet, "pico de gallo" and quinoa.\n_(330 Kcal) (f)_',
  TUESDAY:
    '*MAIN DISH:* \n● *Vegetarian:* Vegetable couscous. _(310 Kcal) (g)_\n● *Vegan:* Grilled vegetables and potato served with romesco sauce (hazelnut, almonds). _(190 Kcal) (g, e, n, d)_\n● *Omni:* Dorada fish fillet, "pico de gallo" and quinoa.\n_(330 Kcal) (f)_',
  WEDNESDAY:
    '*MAIN DISH:* \n● *Vegetarian:* Vegetable couscous. _(310 Kcal) (g)_\n● *Vegan:* Grilled vegetables and potato served with romesco sauce (hazelnut, almonds). _(190 Kcal) (g, e, n, d)_\n● *Omni:* Dorada fish fillet, "pico de gallo" and quinoa.\n_(330 Kcal) (f)_',
  THURSDAY: "Bank holiday",
  FRIDAY:
    '*MAIN DISH:* \n● *Vegetarian:* Vegetable couscous. _(310 Kcal) (g)_\n● *Vegan:* Grilled vegetables and potato served with romesco sauce (hazelnut, almonds). _(190 Kcal) (g, e, n, d)_\n● *Omni:* Dorada fish fillet, "pico de gallo" and quinoa.\n_(330 Kcal) (f)_',
}

const dishTypePerDay = {
  MONDAY: "OMNI",
  TUESDAY: "VEGAN",
  WEDNESDAY: "VEGETARIAN",
  THURSDAY: "OMNI",
  FRIDAY: "VEGAN",
}

const dishTypePerDayWithNoLunch = {
  MONDAY: "OMNI",
  TUESDAY: "JUST SALAD FOR ME",
  WEDNESDAY: "VEGETARIAN",
  THURSDAY: "NO LUNCH FOR ME TODAY :)",
  FRIDAY: "VEGAN",
}

module.exports = {
  dishOptionsPerDay,
  dishTypePerDay,
  dishTypePerDayWithNoLunch,
  dishOptionsPerDayWithNoLunch,
}
