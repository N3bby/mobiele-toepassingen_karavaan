import { KaravaanService } from './KaravaanService';
import { Trip } from './Trip';

import { EvenExpense } from './EvenExpense';
import { Debt } from './Debt';
import { Person } from './Person';
import { Payment } from './Payment';


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

function requesting_nonexisting_trip_throws_error_works()
{
    let service = new KaravaanService();
    
    let throwsError = false;
    
    try
    {
        service.getTripById(0);
    }
    catch(e)
    {
        throwsError = true;
    }
    
    functionalityWorks("Requesting nonexisting trip throws error.", throwsError);
}
requesting_nonexisting_trip_throws_error_works();

function removing_a_trip_works()
{
    let service = new KaravaanService();
    let newTrip = service.addNewTrip("Rome");
    
    let before = service.trips.length;
    
    let after = service.removeTripById(newTrip.id);
    
    functionalityWorks("Removing a trip works.", before > after);
}
removing_a_trip_works();

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

function requesting_nonexisting_participants_throws_error()
{
    let service = new KaravaanService();
    let newTrip = service.addNewTrip("A night out");
    
    let throwsError = false;
    
    try
    {
        service.getParticipantById(newTrip.id, 0);
    }
    catch(e)
    {
        throwsError = true;
    }
    
    functionalityWorks("Requesting nonexistant participant throws error.", throwsError);
}
requesting_nonexisting_participants_throws_error();

function removing_participant_from_trip_works()
{
    let service = new KaravaanService();
    let newTrip = service.addNewTrip("Rome");
    
    let newParticipant = service.addNewParticipantToTripById(newTrip.id, "John", "Lennon");
    
    let before = service.getParticipantsByTripId(newTrip.id).length;
    let after = service.removeParticipantById(newTrip.id, newParticipant.id);
    
    functionalityWorks("Removing a participant from a trip works.", before > after);
}
removing_participant_from_trip_works();

function pulling_currencies_works_offline()
{
    let service = new KaravaanService();
    let newTrip = service.addNewTrip("A night out");
    
    let hasCurrencies = service.currencies.length > 0;
    
    functionalityWorks("Pulling currencies works offline", hasCurrencies);
}
pulling_currencies_works_offline();

function adding_currencies_to_a_trip_works()
{
    let service = new KaravaanService();
    let newTrip = service.addNewTrip("Rome");
    
    service.addCurrencyToTrip(newTrip.id, service.getCurrency("USD"));
    service.addCurrencyToTrip(newTrip.id, service.getCurrency("GBP"));
    
    functionalityWorks("Adding a currencies to a trip.", service.getCurrenciesByTripId(newTrip.id).length == 3);
}
adding_currencies_to_a_trip_works();

function removing_a_currency_from_a_trip_works()
{
    let service = new KaravaanService();
    let newTrip = service.addNewTrip("Rome");
    
    service.addCurrencyToTrip(newTrip.id, service.getCurrency("USD"));
    service.addCurrencyToTrip(newTrip.id, service.getCurrency("GBP"));
    
    service.removeCurrencyFromTrip(newTrip.id, "EUR");
    
    functionalityWorks("Removing a Currency from a Trip works.", service.getCurrenciesByTripId(newTrip.id).length == 2);
}
removing_a_currency_from_a_trip_works();

function getting_a_list_of_currencies_from_a_trip_works()
{
    let service = new KaravaanService();
    let newTrip = service.addNewTrip("Rome");
    
    let works = typeof service.getCurrenciesByTripId(newTrip.id) != 'undefined';
    
    functionalityWorks("Getting a list of currencies from a trip works.", works);
}
getting_a_list_of_currencies_from_a_trip_works();

function requesting_non_existing_currency_from_a_trip_throws_error()
{
    let service = new KaravaanService();
    let newTrip = service.addNewTrip("Rome");
    
    let throwsError = false;
    
    try
    {
        service.getCurrencyFromTripByName(newTrip.id, "DHDKKD");
    }
    catch(e)
    {
        throwsError = true;
    }
    
    functionalityWorks("Requesting non existing currency from trip throws error.", throwsError);
}
requesting_non_existing_currency_from_a_trip_throws_error();

function overriding_the_details_from_a_currency_from_a_trip_works()
{
    let service = new KaravaanService();
    let newTrip = service.addNewTrip("Rome");
    
    let currency = service.getCurrencyFromTripByName(newTrip.id, "EUR");
    currency.rateComparedToEUR = 1.5;
    
    var isChanged = service.getCurrencyFromTripByName(newTrip.id, "EUR").rateComparedToEUR == 1.5;
    
    functionalityWorks("Overriding details from a currency from a trip works.", isChanged);
}
overriding_the_details_from_a_currency_from_a_trip_works();



/*let ee = new EvenExpense();
ee.expenseAmount = 100;
let firstPayer = new Person(0, "Artus", "Vranken");
let secondPayer = new Person(1, "John", "Lennon");
let thirdPart = new Person(2, "Laila", "dsd");
//ee.addParticipant(thirdPart);

ee.addPayment(new Payment(0, firstPayer, 50));
ee.addPayment(new Payment(1, secondPayer, 50));
//ee.addParticipant(secondPayer);

ee.addParticipant(new Person(3, "kaka", "pipi"));


console.log(ee.debts);*/
