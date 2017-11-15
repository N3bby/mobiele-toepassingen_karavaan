# Karavaan Domain Implementation

A karavaan service holds all domain/business logic for the KaravaanApp.
Everything is done through one service object.

## 1. Creating a service

Creating a service is simple. A running app should only have one service object.

```javascript
let karavaanService = new KaravaanService();
```

## 2. Adding a trip to a service

The main Entity around our app is a Trip. A trip contains a series of expenses and participants.

```javascript
// Creating a trip will return a trip object, which can be used in the future
let newTrip = karavaanService.addNewTrip("A night out");

// Alternatively, a trip object can be create without requiring a returned trip object.
karavaanService.addNewTrip("Weekend to Tokyo.");

```
Above code will create new trip in the karavaan service. The KaravaanService is centered around IDs, so every object added to the service object will get a new id.
All added objects can later be manipulated or requested by using its correct id.

## 3. Adding a participant to a trip

Every trip has participants. A participant does not need to have expenses. An expense, however, does need a participant that participates to the Trip.
This is all handled for you, as we will see later when adding expenses.

```javascript
// First we will create a new trip
let newTrip = karavaanService.addNewTrip("A night out.");

// We can use the returned trip object to retrieve its new ID and use this for adding objects to it.
// Adding a new participant to the trip will return a new Person object.
let newParticipant = karavaanService.addNewParticipantToTripById(newTrip.id, "John", "Lennon");
```

## 4. Adding an expense to a trip

A trip has a list of expenses. This is an array of Expense objects, each with it's unique id.
When adding an expense, a new expense object gets created and assigned an ID. This new object will be returned.

An expense needs a description and a category.

```javascript
// Adding a new expense for going to the restaurant on previously added trip
let newExpense = karavaanService.addNewExpenseByTripId(newTrip.id, "Eating at sushi bar", "food");
```

## 5. Adding debt to an expense

An expense keeps track of who pays (payments) what and who owes (debts) what. In the next example, John Lennon has eaten something but has not payed yet.
We will add his debt to the expense.

```javascript
// Add a debt of 6.50 to an expense of a trip for a certain participant
let johnDebt = karavaanService.addNewDebtToExpenseById(newTrip.id, newExpense.id, newParticipant.id, 6.50);

console.log(johnDebt); // 6.50
```

Imagine John Lennon orders more then just one meal. We will add a new debt to his name and the amount will automatically be added to his current debt.

```javascript
let johnDebt = karavaanService.addNewDebtToExpenseById(newTrip.id, newExpense.id, newParticipant.id, 3);

console.log(johnDebt); // 9.50
```

What if a new person joins the table but is not a known participant to the trip yet? 
The service handles this for you. If you add an unknown participant to an expense, he will automatically be created with 'New participant' as name.
> NOTE: The personal details of the person should manually be edited later.
> NOTE: This scenario should not happen in real life, but it is implemented for you. Please add participants before adding a debt that participant.

```javascript
let newParticipantDebt = karavaanService.addNewDebtToExpenseById(newTrip.id, newExpense.id, 99, 5) // Added to participant with id 99, which does not exist

console.log(newParticipantDebt); // 5
```
The new participant will automatically be added to the participant list for the given trip.

> under construction