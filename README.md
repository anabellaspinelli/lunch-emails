# Typeform Lunch Emails

A script for parsing Lunch Typeform definitions and matching them against a user's dish type selections for each day, in order to match every day with a dish description.

## Naming

Definition and example of what each word means in the code.

### Dishes

Generic term to describe a meal offered by Typeform's lunch service.

#### Dish type

The kind of dish, one of: 'Omni', 'Vegan' or 'Vegetarian'.

#### Dish description

The actual description of the meal, its name, ingredients and style. Example: "Milanesa with papas fritas."

### Choice

A.k.a. "dayChoice", is the option selected by the user, which comes in the response payload. Example: "OMNI - Milanesa with papas fritas."

### No dish options

They are options that _the user can select_ if they don't chose a dish. One of: 'No lunch for me today', 'Just salad for me'.

### Bank holiday

Bank holidays are non-working days at Typeform. They don't have any dishes, so the only option available to the user is "No lunch for me today."
