import { KaravaanService } from './KaravaanService';
import { Trip } from './Trip';

function functionalityWorks(functionality : string, works : boolean)
{
    let result = works ? "pass" : "fail";
    console.log(result + ": " + functionality);
}

// Add a trip
function adding_trip_works()
{
    let service = new KaravaanService();
    let newTrip = service.addNewTrip("Night out");

    let hasId = newTrip.id >= 0;
    let isAddedToService = service.trips.length > 0;
    
    functionalityWorks("Add a trip", hasId && isAddedToService);
}
adding_trip_works();

// Add multiple trips
function adding_multiple_trips_works()
{
    let service = new KaravaanService();
    
    let firstTrip = service.addNewTrip("Another night out");

    let firstHasId = firstTrip.id >= 0;
    let firstIsAddedToService = service.trips.length > 0;
    
    let secondTrip = service.addNewTrip("Another night out");

    let secondHasId = secondTrip.id > firstTrip.id;
    let secondIsAddedToService = service.trips.length > 1;
    
    // Concat booleans
    let result = firstHasId && firstIsAddedToService && secondHasId && secondIsAddedToService;
    
    functionalityWorks("Add multiple trips", result);
}
adding_multiple_trips_works();

// Add participant to trip
function adding_participants_to_trip_works()
{
    let service = new KaravaanService();
    
    let newTrip = service.addNewTrip("A night out");
    let newPerson = service.addNewParticipantToTripById(newTrip.id, "Bob", "Marley");
    
    let personIsAdded = service.getParticipantsByTripId(newTrip.id).length > 0;
    let personHasId = newPerson.id >= 0;
    let personFirstNameIsCorrect = newPerson.firstName == "Bob";
    let personLastNameIsCorrect = newPerson.lastName == "Marley";
    
    // Concat booleans
    let result = personIsAdded && personHasId && personFirstNameIsCorrect && personLastNameIsCorrect;
    
    functionalityWorks("Add person to trip", result);
}
adding_participants_to_trip_works();

function adding_multiple_participants_to_trip_works()
{
    let service = new KaravaanService();
    
    let newTrip = service.addNewTrip("A night out");
    let newPerson = service.addNewParticipantToTripById(newTrip.id, "Bob", "Marley");
    
    let personIsAdded = service.getParticipantsByTripId(newTrip.id).length > 0;
    let personHasId = newPerson.id >= 0;
    let personFirstNameIsCorrect = newPerson.firstName == "Bob";
    let personLastNameIsCorrect = newPerson.lastName == "Marley";
    
    // Concat booleans
    let result = personIsAdded && personHasId && personFirstNameIsCorrect && personLastNameIsCorrect;
    
    let secondPerson = service.addNewParticipantToTripById(newTrip.id, "Jim", "Morrisson");
    
    let secondIsAdded = service.getParticipantsByTripId(newTrip.id);
    let secondHasId = secondPerson.id >= 0;
    let secondFirstNameIsCorrect = secondPerson.firstName == "Jim";
    let secondLastNameIsCorrect = secondPerson.lastName == "Morrisson";
    
    result = result && secondIsAdded && secondHasId && secondFirstNameIsCorrect && secondLastNameIsCorrect;
    
    functionalityWorks("Adding multiple persons to trip", result);
}
adding_multiple_participants_to_trip_works();