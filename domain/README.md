# Karavaan Domain User Stories

## As a *user* I want to:

// ✔✗✘✓

1. Create a KaravaanService :white_check_mark:
2. Add a Trip :white_check_mark:
3. Get a list of Trips :white_check_mark:
4. Get a single Trip by its ID :white_check_mark:
5. Add a participant to a Trip 
6. Add an Expense to a Trip 
7. Add a participant to an Expense
7. Add a Payment to an Expense

### 1. Create KaravaanService

Creating a KaravaanService is pretty easy, just initialise the object using its constructor.
Only one KaravaanService object should be required per app. 

```javascript
// Create a new KaravaanService object.
let service = new KaravaanService;
```

This will create a new KaravaanService object with an empy list of Trips and a CurrencyService that can be used to get a list of Currencies.

### 2. Add a Trip

Adding a Trip can be done by using the `addNewTrip(name, description)` method, which takes the name of the New Trip as a required parameter, and the description of the new Trip as an optional parameter.
This methods returns the newly created Trip object. You can use this object as you like, as javascript objects are passed by reference. I do however advise to manipulate the objects by using the facade methods supplied by the KaravaanService in combination with the assigned IDs.

```javascript
// Add a new trip by supplying name and description.
let newTrip = service.addNewTrip("Rome", "A trip to Rome with the collegues.");

// Add a new trip by only supplying a name.
let newTrip = service.addNewTrip("Tokyo");
```

The Trip object returned will contain an ID assigned by the KaravaanService. This ID can be used in the future to manipulate it using the facade methods.

### 3. Get a list of Trips

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

### 4. Get a single Trip by its ID

You can retrieve a single `Trip` object by using its ID, using the `getTripById(id)` facade method. This can be done for displaying all the information of the `Trip` in the front-end.

```javascript
// Get a single Trip by its ID previously assigned on its creation by the KaravaanService.
let tokyoTrip = service.getTripById(id);
```

### 5. Add a participant to a Trip

Ofcourse we want to add participants to this Trip (including ourselves). 
This can be done by using the `addNewParticipantToTripById(tripId, firstName, lastName)` facade method. All parameters are required.

The `tripId` is the ID of the Trip you want to add the participant to, the other parameters speak for themselves.
This method will return the newly created `Person` object.

```javascript
// Let's create a new Trip first, to show the flow of logic.
let newTrip = service.addNewTrip("Rome");

// Add a new participant to this Trip by using its ID.
let newParticipant = service.addNewParticipantToTripById(newTrip.id, "John", "Lennon");
```


