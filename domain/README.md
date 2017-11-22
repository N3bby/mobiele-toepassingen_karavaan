# Karavaan Domain User Stories

## As a *user* I want to:

> ✔ = Functionality works and is implemented.

1. Create a KaravaanService ✔
2. Add a Trip ✔
3. Get a list of Trips ✔
4. Get a single Trip by its ID ✔
5. Remove a Trip ✔
6. Add a participant to a Trip ✔
7. Get a list of participants to a Trip ✔
8. Get a single participant to a Trip by using the Trip ID and the participant ID
9. Add an Expense to a Trip 
10. Add a participant to an Expense
11. Add a Payment to an Expense

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
This method returns the amount of `Trip`s maintained by the `KaravaanService` after deletion.

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

## 7. Get a list of participants to a Trip

We can retrieve a list of participants to a Trip by using the `getParticipantsByTripId(tripId)` facade method, where `tripId` is the ID of the Trip we want to get the participants from.
This method will return an `Array<Person>` containing all the participants to this `Trip`.

```javascript
// Get a list of participants from Trip with ID = 1.
let participantList = service.getParticipantsByTripId(1);
```

> This method will throw an Error when supplying an ID that does not belong to an existing `Trip`.
> See "Get a single Trip by its ID" for more information about Error handling.

## 8. Get a single participant to a Trip by using the Trip ID and the participant ID

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
