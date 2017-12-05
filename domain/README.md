# Karavaan Domain

You can look at the documentation compiled by `jsdoc` by running the `./build_test.sh` script. You need to install `jsdoc` to do this:

```
npm install -g jsdoc
```

Running the script:

```
./build_test.sh
```

This script will transpile the TypeScript files using `tsc` to the `target` directory and create a documentation website inside `target/docs` directory.  
An additional `jsdoc` template will be cloned from a git repository to make the documentation website readable.   

Then, the script will run the tests that can be found in `target/KaravaanTests.js`.  

Take a look at `KaravaanTests.ts` or `target/KaravaanTests.js` to look at working examples of how to use the domain classes.

# User Stories

## As a *user* I want to:

> ✔ = Functionality works and is implemented.

1. Create a KaravaanService ✔
2. Add a Trip ✔
3. Get a list of Trips ✔
4. Get a single Trip by its ID ✔
5. Remove a Trip ✔
6. Add a participant to a Trip ✔
7. Get a list of participants from a Trip ✔
8. Get a single participant from a Trip ✔
9. Remove a participant from a Trip ✔
10. Get a list of all Currencies ✔
11. Add a Currency to a Trip ✔
12. Remove a Currency from a Trip ✔
13. Get a list of Currencies from a Trip ✔
14. Get a single Currency from a Trip ✔
15. Override the details of a Currency ✔

## TODO:

10. Add an Expense to a Trip 
11. Remove an Expense from a Trip
12. Add a participant to an Expense
13. Remove a participant from an Expense
13. Add a Payment to an Expense
14. Remove a Payment from an Expense
15. Add a BillItem to an Expense
16. Remove a BillItem from an Expense
17. Assign a participant to a BillItem
15. Get a list of debts from an Expense

## 1. Create KaravaanService

Creating a KaravaanService is pretty easy, just initialise the object using its constructor.  
Only one KaravaanService object should be required per app. 

```javascript
// Create a new KaravaanService object.
let service = new KaravaanService;
```

This will create a new KaravaanService object with an empy list of Trips and a CurrencyService that can be used to get a list of Currencies.

## 2. Add a Trip

Adding a Trip can be done by using the `addNewTrip(name, description)` method, which takes the name of the New Trip as a required parameter, and the description of the new Trip as an optional parameter.  
This methods returns the newly created Trip object. You can use this object as you like, as javascript objects are passed by reference. I do however advise to manipulate the objects by using the facade methods supplied by the KaravaanService in combination with the assigned IDs.

```javascript
// Add a new trip by supplying name and description.
let newTrip = service.addNewTrip("Rome", "A trip to Rome with the collegues.");

// Add a new trip by only supplying a name.
let newTrip = service.addNewTrip("Tokyo");
```

The Trip object returned will contain an ID assigned by the KaravaanService. This ID can be used in the future to manipulate it using the facade methods.

## 3. Get a list of Trips

There are multiple ways to get a list of Trips.

#### Retrieving an array of Trips

The easiest method is by getting an `Array<Trip>` by using the `trips` property.

```javascript
// Get an Array of Trips
let trips = service.trips;
```

#### Retrieving a Map of Trips

The second option is to get a `Map<number, Trip>` by using the `tripMap` property.  
This will return a `Map<number, Trip>` object where `number` is the ID of the `Trip`.

```javascript
// Get a Map<number, Trip>
let trips = service.tripMap;
```

> These methods can be used to access a single Trip, but should not.  
> The correct method is by using the method below.  

## 4. Get a single Trip by its ID

You can retrieve a single `Trip` object by using its ID, using the `getTripById(id)` facade method. This can be done for displaying all the information of the `Trip` in the front-end.

```javascript
// Get a single Trip by its ID previously assigned on its creation by the KaravaanService.
let tokyoTrip = service.getTripById(id);
```

This method will throw an `Error` when no `Trip` with supplied ID is found. Make sure to handle this when you use it.

```javascript
// We will create a service from scratch and move on from that point to display the flow of logic.
let service = new KaravaanService();

// Add a new Trip
let newTrip = service.addNewTrip("Rome");

// Retrieve a Trip by using the ID from an existing Trip.
try
{
    console.log(service.getTripById(newTrip.id).name);
}
catch (e)
{
    // This will not fire because no error is thrown, the Trip with supplied ID exists.
    console.log(e.message);
}

// Retrieve a Trip by using an unknown ID.
try
{
    // This Trip does not exist. Error will be thrown.
    console.log(service.getTripById(1000).name);
}
catch (e)
{
    console.log(e.message);
}
```

Above code will output:

```
"Rome"
"Trip with ID 1000 does not exist."
```

## 5. Remove a Trip

Removing a `Trip` can be done by using the `removeTripById(tripId)` facade method, where `tripId` is the ID of the `Trip` you need to be removed.  
This method returns the amount of `Trips` maintained by the `KaravaanService` after deletion.

```javascript
// Let's say that there are currently 3 Trips.
let before = service.trips.length; // 3

// Remove a Trip with ID 1. (It does exist)
let after = service.removeTripById(1);

console.log(before);
console.log(after);
```

Above code will output:

```
3
2
```

> This method will throw an Error when supplying an ID that does not belong to an existing `Trip`.  
> See "Get a single Trip by its ID" for more information about Error handling.  

## 6. Add a participant to a Trip

Ofcourse we want to add participants to this Trip (including ourselves).  
This can be done by using the `addNewParticipantToTripById(tripId, firstName, lastName)` facade method. All parameters are required.  

The `tripId` is the ID of the Trip you want to add the participant to, the other parameters speak for themselves.  
This method will return the newly created `Person` object, with an ID assigned to it by the `KaravaanService`.

```javascript
// Let's create a new Trip first, to show the flow of logic.
let newTrip = service.addNewTrip("Rome");

// Add a new participant to this Trip by using its ID.
let newParticipant = service.addNewParticipantToTripById(newTrip.id, "John", "Lennon");
```

> This method will throw an Error when supplying an ID that does not belong to an existing `Trip`.  
> See "Get a single Trip by its ID" for more information about Error handling.  

## 7. Get a list of participants from a Trip

We can retrieve a list of participants from a Trip by using the `getParticipantsByTripId(tripId)` facade method, where `tripId` is the ID of the Trip we want to get the participants from.  
This method will return an `Array<Person>` containing all the participants from this `Trip`.  

```javascript
// Get a list of participants from Trip with ID = 1.
let participantList = service.getParticipantsByTripId(1);
```

> This method will throw an Error when supplying an ID that does not belong to an existing `Trip`.  
> See "Get a single Trip by its ID" for more information about Error handling.  

## 8. Get a single participant from a Trip 

Retrieving a participant from a `Trip` can be done by using the `getParticipantById(tripId, participantId)` facade method, where `tripId` is the ID of the `Trip` and `participantId` is the ID of the participant to this `Trip`.  
This method returns a `Person` object that contains all information about this participant.  

```javascript
// Add a Trip to the service
let newTrip = service.addNewTrip("Versailles");

// Add a participant to the newly created Trip.
let newParticipant = service.addNewParticipantToTrip(newTrip.id, "Louis", "XIV");

// Get a single participant by using its ID and the ID of the Trip it participates to.
let retrievedParticipant = service.getParticipantById(newTrip.id, newParticipant.id);

// Display some information about this participant.
console.log(retrievedParticipant.firstName);
console.log(retrievedParticipant.lastName);

// Using the Person.name property will return the full name.
console.log(retrievedParticipant + " was a pretty rich man.");
```

Above code will output:
 
```
"Louis"
"XIV"
"Louis XIV was a pretty rich man."
```

> This method will throw an Error when supplying an ID that does not belong to an existing `Trip`.  
> This method will throw an Error when supplying an ID that does not belong to a participant.  
> See "Get a single Trip by its ID" for more information about Error handling.  

## 9. Remove a participant from a Trip

Removing a participant from a `Trip` can be done using the `removeParticipantById(tripId, participantId)` facade method, where `tripId` is the ID of the Trip the participant needs to be removed from, and `participantId` the ID of the participant.  
This method returns the amount of participants still participating to the `Trip` after removal.  

```javascript
// Given a Trip with ID 0 and no participants yet.
let newTrip = service.addNewTrip("Rome");

// Add a new participant to the Trip
let newParticipant = service.addNewParticipantToTripById(newTrip.id, "John", "Lennon");

console.log(service.getParticipantsByTripId(newTrip.id).length); // 1

// Remove newly created participant from the Trip
let after = service.removeParticipantById(newTrip.id, newParticipant.id); // 0

console.log(after);
```

Above code will output:

```
1
2
```

> This method will throw an Error when supplying an ID that does not belong to an existing `Trip`.  
> This method will throw an Error when supplying an ID that does not belong to a participant.  
> See "Get a single Trip by its ID" for more information about Error handling.  

## 10. Get a list of all Currencies

The `KaravaanService` maintains a `CurrencyService`, which has the ability to pull a list of `Currencies` from a Rest api. If no connection is present, the `CurrencyService` will return the cashed list of `Currencies` pulled in the past. If no cahched list is present, The `CurrencyService` will return a list of hardcoded `Currencies`.  

There are 2 ways of getting list of `Currencies`  

* Retrieving an Array<Currency>
* Retrieving a Map<string, Currency>

#### Retrieving an Array of Currencies

Getting an `Array` can be done by using the facade property `currencies`.

```javascript
let currencyList = service.currencies;

console.log(currencyList[0]);
```

#### Retrieving a Map of Currencies

Getting a `Map` of `Currencies` can be done using the facade property `currencyMap`;

```javascript
let currencyMap = service.currencyMap;

console.log(currencyMap.get("EUR"));
```

This method is preferable because with the retrieved `Map` you can quickly get a `Currency` by name. (e.g. "EUR", "USD")

## 11. Add a Currency to a Trip

By default, when a `Trip` is created, it already contains one `Currency`, the Euro. You can easily add other `Currencies` by reference from the `CurrencyService`.  
You can use the `addCurrencyToTrip(tripId, newCurrency)` facade method, where `tripId` is the ID of the `Trip` the `Currency` needs to be added to, and `newCurrency` is the `Currency` instance that needs to be added.  

```javascript
// Create a new service from scratch to show the flow of logic.
let service = new KaravaanService();

// Add a new Trip
let newTrip = service.addNewTrip("New York");

// This Trip already has one Currency by default.
service.getCurrencyFromTripByName(newTrip.id, "EUR"); // Does not throw an Error.

// Retrieve a Currency from the CurrencyService
let newCurrency = service.currencyMap.get("USD");

// Add this Currency to the previously created trip.
service.addCurrencyToTrip(newTrip.id, newCurrency);

// The Trip now has 2 Currencies that can later be used to add Expenses.
console.log(service.getCurrenciesByTripId(newTrip.id).length === 2) // true
```

> This method will throw an Error when supplying an ID that does not belong to an existing `Trip`.  
> See "Get a single Trip by its ID" for more information about Error handling.  

## 12. Remove a Currency from a Trip

Removing a `Currency` from a `Trip` can be done using the `removeCurrencyFromTrip(tripId, currencyName)` facade method, where `tripId` is the ID of the `Trip` this `Currency` needs to be removed from, and `currencyName` the name of the `Currency` to be removed (e.g. "EUR").  
**This method does not remove a `Currency` from the `CurrencyService`, only from the `Trip`. The removed `Currency` is still available globally.**  

This method will return the amount of `Currencies` still maintained by the `Trip` after removal.  

```javascript
// Let's say we created a Trip before and it got assigned the ID '0'.
// We added 1 Currency "USD", so it should have 2 Currencies now: "EUR" and "USD".
let existingTrip = service.getTripById(0);

// Store the amount of Currencies before removal.
before = service.getCurrenciesByTripId(existingTrip.id);

// Remove a Currency from a previously created Trip and store the result.
let after = service.removeCurrencyFromTrip(existingTrip.id, "EUR");

console.log(before);
console.log(after);
```

Above code will output:

```
2
1
```

> This method will throw an Error when supplying an ID that does not belong to an existing `Trip`.  
> This method will throw an Error when supplying a currencyName that does not belong to a Currency maintained by the `Trip`.  
> See "Get a single Trip by its ID" for more information about Error handling.  

## 13. Get a list of Currencies from a Trip

Getting a list of `Currencies` from a `Trip` can be done using the `getCurrenciesByTripId(tripId)` method, where `tripId` is the ID of the `Trip` we want to retrieve the `Currencies` from.  
This method will return an `Array` of `Currencies`.  

```javascript
// Get an Array of Currencies from a previously created Trip with ID 0.
let currencyList = service.getCurrenciesByTripId(0);
```

> This method will throw an Error when supplying an ID that does not belong to an existing `Trip`.  
> See "Get a single Trip by its ID" for more information about Error handling.  

## 14. Get a single Currency from a Trip

Getting a single `Currency` from a `Trip` can be done using the `getCurrencyFromTripByName(tripId, currencyName)` facade method.  
This method will return a `Currency` instance corresponding to the supplied `currencyName`. (e.g. "EUR")  

```javascript 
// Retrieve a Currency from an existing Trip with ID 0.
let currency = service.getCurrencyFromTripByName(0, "EUR");
```

> This method will throw an Error when supplying an ID that does not belong to an existing `Trip`.  
> This method will throw an Error when supplying a currencyName that does not belong to a Currency maintained by the `Trip`.  
> See "Get a single Trip by its ID" for more information about Error handling.  

## 15. Override the details of a Currency

We can override the details of a `Currency` by just editing a returned `Currency` from any method that returns it, as `Currencies` are handled by reference.

```
// Retrieve a Currency from an existing Trip with ID 0.
let usd = service.getCurrencyFromTripByName(0, "USD");

// Update rate against EUR.
usd.rateComparedToEUR(1.5);
```

**This override will be enforced globally.**

## 16. Expenses

Expenses are represented using an `IExpense` interface. Expenses can be added to a `Trip` in the `KaravaanService` and, normally (depends on the type of `IExpense`), can be given new participants, `Payments`, `BillItems` and `Debts`. Adding an expense to a trip can be done using the `AddNewExpenseByTripId` facade method and passing the desired `ExpenseType` as a parameter.

All implementations of `IExpense` should be added to the `ExpenseType` enumeration.  

When adding a new `IExpense` using the `addNewExpenseByTripId` method, the created `IExpense` implementation is returned.

## 17. Adding an EvenExpense

An `EvenExpense` is an `IExpense` implementation where the total amount of the expense is evenly shared among the participants. Adding an `EvenExpense` can easily be done using the `addNewExpenseByTripId` and passing the `ExpenseType.EvenExpense` parameter.   

An `EvenExpense` works as follows:
- Create the `EvenExpense`
- Add `Payments`
- Add participants

Everytime a new operation is performed on the `EvenExpense`, the `Debt` gets recalculated and divided among the participants.

```javascript
// Create a new Trip to add the IExpense to
let newTrip = service.addNewTrip("Rome");

// Create a new EvenExpense with a price of 100 to the previously created trip for a cab ride. Category is transportation.
let newExpense = service.addNewExpenseByTripId(newTrip.id, ExpenseType.EvenExpense, 100, "Cab ride", "transportation");
```

Now, we can add participants from the `Trip` to this `EvenExpense` and add `Payments`.