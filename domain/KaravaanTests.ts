import { KaravaanService } from './KaravaanService';
import { Trip } from './Trip';

import { EvenExpense } from './EvenExpense';
import { Debt } from './Debt';
import { Person } from './Person';
import { Payment } from './Payment';
import { BillItem } from './BillItem';
import { ExpenseType } from './ExpenseType';
import { BillExpense } from './BillExpense';


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

function adding_EvenExpense_to_a_trip_works()
{
    let service = new KaravaanService();
    let newTrip = service.addNewTrip("Rome");
    
    let newEvenExpense = service.addNewExpenseByTripId(newTrip.id, ExpenseType.EvenExpense, 50);
    let secondEvenExpense = service.addNewExpenseByTripId(newTrip.id, ExpenseType.EvenExpense, 70);
    
    let expenseExists = typeof service.getExpenseById(newTrip.id, newEvenExpense.id) != 'undefined';
    let expenseHasId = service.getExpenseById(newTrip.id, newEvenExpense.id).id > -1;
    let expenseAmountIsCorrect = service.getExpenseById(newTrip.id, newEvenExpense.id).expenseAmount == 50;
    
    let secondExists = typeof service.getExpenseById(newTrip.id, newEvenExpense.id) != 'undefined';
    let secondHasId = service.getExpenseById(newTrip.id, secondEvenExpense.id).id > -1;
    let secondAmountIsCorrect = service.getExpenseById(newTrip.id, secondEvenExpense.id).expenseAmount == 70;
    
    // Concatenate booleans
    let result = expenseExists && expenseHasId && expenseAmountIsCorrect;
    result = result && secondExists && secondHasId && secondAmountIsCorrect;
    
    functionalityWorks("Adding new EvenExpense to Trip works.", result);
}
adding_EvenExpense_to_a_trip_works();

function adding_participants_to_EvenExpense_works()
{
    let service = new KaravaanService();
    let newTrip = service.addNewTrip("Rome");
    let newParticipant = service.addNewParticipantToTripById(newTrip.id, "John", "Lennon");
    
    let newEvenExpense = service.addNewExpenseByTripId(newTrip.id, ExpenseType.EvenExpense, 50);
    
    let expenseExists = typeof service.getExpenseById(newTrip.id, newEvenExpense.id) != 'undefined';
    let expenseHasId = service.getExpenseById(newTrip.id, newEvenExpense.id).id > -1;
    let expenseAmountIsCorrect = service.getExpenseById(newTrip.id, newEvenExpense.id).expenseAmount == 50;
   
    let returnedParticipant = service.addParticipantToExpenseById(newTrip.id, newEvenExpense.id, newParticipant.id);
    
    let participantIdReturned = typeof returnedParticipant != 'undefined';
    let participantsAreEqual = returnedParticipant === newParticipant;
    let participantAdded = service.getParticipantFromExpenseById(newTrip.id, newEvenExpense.id, returnedParticipant.id) === newParticipant;
    
    // Concatenate booleans
    let result = expenseExists && expenseHasId && expenseAmountIsCorrect && participantAdded;
    result = result && participantIdReturned && participantsAreEqual;
    
    functionalityWorks("Adding participants to new EvenExpense works.", result);
}
adding_participants_to_EvenExpense_works();

function removing_a_participant_from_EvenExpense_works()
{
    let service = new KaravaanService();
    let newTrip = service.addNewTrip("Rome");
    let newParticipant = service.addNewParticipantToTripById(newTrip.id, "John", "Lennon");
    
    let newEvenExpense = service.addNewExpenseByTripId(newTrip.id, ExpenseType.EvenExpense, 50);
    let returnedParticipant = service.addParticipantToExpenseById(newTrip.id, newEvenExpense.id, newParticipant.id);
    
    let before = service.getParticipantsByExpenseId(newTrip.id, newEvenExpense.id).length;
    let after = service.removeParticipantFromExpenseById(newTrip.id, newEvenExpense.id, returnedParticipant.id);
    
    let result = before > after;
    
    functionalityWorks("Removing participant from EvenExpense works.", result);
}
removing_a_participant_from_EvenExpense_works();

function editing_info_of_participants_of_expense_is_enforced_globally()
{
    let service = new KaravaanService();
    let newTrip = service.addNewTrip("Rome");
    let newParticipant = service.addNewParticipantToTripById(newTrip.id, "John", "Lennon");
    
    // Check if it works with EvenExpense
    let newEvenExpense = service.addNewExpenseByTripId(newTrip.id, ExpenseType.EvenExpense, 50);
    let returnedParticipant = service.addParticipantToExpenseById(newTrip.id, newEvenExpense.id, newParticipant.id);
    
    returnedParticipant.firstName = "Mike";
    returnedParticipant.lastName = "Tyson";
    
    let result = newParticipant === returnedParticipant;
    
    functionalityWorks("Editing info of a participant of an expense is enforced globally.", result);
}
editing_info_of_participants_of_expense_is_enforced_globally();

function adding_an_EvenExpense_to_Trip_works()
{
    let service = new KaravaanService();
    let newTrip = service.addNewTrip("Rome");
    let newExpense = service.addNewExpenseByTripId(newTrip.id, ExpenseType.EvenExpense, 100, "Taxi", "food");
    
    let newParticipant = service.addNewParticipantToTripById(newTrip.id, "John", "Lennon");
    let secondParticipant = service.addNewParticipantToTripById(newTrip.id, "Sherlock", "Holmes");
    let thirdParticipant = service.addNewParticipantToTripById(newTrip.id, "George", "Clooney");
    let fourthParticipant = service.addNewParticipantToTripById(newTrip.id, "King", "Philip");
    
    service.addParticipantToExpenseById(newTrip.id, newExpense.id, newParticipant.id);
    service.addParticipantToExpenseById(newTrip.id, newExpense.id, secondParticipant.id);
    service.addParticipantToExpenseById(newTrip.id, newExpense.id, thirdParticipant.id);
    service.addParticipantToExpenseById(newTrip.id, newExpense.id, fourthParticipant.id);
    
    service.addNewPaymentToExpenseById(newTrip.id, newExpense.id, newParticipant.id, 50);
    service.addNewPaymentToExpenseById(newTrip.id, newExpense.id, newParticipant.id, 50);
    
    let expenseIsCompletelyPaidByCreditors = service.getExpenseById(newTrip.id, newExpense.id).expenseUnpaid == 0;
    let amountToBePaidIsZero = service.getExpenseById(newTrip.id, newExpense.id).amountUnpaid == 0;
    let fourParticipants = service.getParticipantsByExpenseId(newTrip.id, newExpense.id).length == 4;
    
    let threeDebts = service.getDebtsByExpenseId(newTrip.id, newExpense.id).length == 3;
    
    // Concat booleans
    let result = amountToBePaidIsZero && expenseIsCompletelyPaidByCreditors && fourParticipants && threeDebts;
    
    functionalityWorks("Adding an EvenExpense to Trip works.", result);
}
adding_an_EvenExpense_to_Trip_works();

function adding_a_BillExpense_to_Trip_works()
{
    let service = new KaravaanService();
    let newTrip = service.addNewTrip("Rome");
    let newExpense = service.addNewExpenseByTripId(newTrip.id, ExpenseType.BillExpense, 75, "Restaurant.", "food");
    
    let firstParticipant = service.addNewParticipantToTripById(newTrip.id, "John", "Lennon");
    let secondParticipant = service.addNewParticipantToTripById(newTrip.id, "Mark", "Zuckerberg");
    let thirdParticipant = service.addNewParticipantToTripById(newTrip.id, "Paul", "Kalkbrenner");
    
    let newPayment = service.addNewPaymentToExpenseById(newTrip.id, newExpense.id, firstParticipant.id, 75);
    
    let firstBillItem = service.addNewBillItemToExpenseById(newTrip.id, newExpense.id, firstParticipant.id, "Hawaii", 25);
    let secondBillItem = service.addNewBillItemToExpenseById(newTrip.id, newExpense.id, secondParticipant.id, "Marguerita", 25);
    let thirdBillItem = service.addNewBillItemToExpenseById(newTrip.id, newExpense.id, thirdParticipant.id, "Prosciutto", 25);
    
    let secondParticipantDebtIsCorrect = service.getExpenseById(newTrip.id, newExpense.id).debtByDebtor.get(secondParticipant) == 25;
    let thirdParticipantDebtIsCorrect = service.getExpenseById(newTrip.id, newExpense.id).debtByDebtor.get(thirdParticipant) == 25;
    
    let result = secondParticipantDebtIsCorrect && thirdParticipantDebtIsCorrect;
    
    let has3Participants = service.getExpenseById(newTrip.id, newExpense.id).participants.length == 3;
    let has3BillItems = service.getExpenseById(newTrip.id, newExpense.id).billItems.size == 3;
    
    result = result && has3BillItems && has3Participants;
    
    let totalAmountIsPaid = service.getExpenseById(newTrip.id, newExpense.id).amountUnpaid == 0;
    let has2Debts = service.getDebtsByExpenseId(newTrip.id, newExpense.id).length == 2;
    
    result = result && totalAmountIsPaid && has2Debts;
    
    functionalityWorks("Adding a BillExpense to Trip works.", result);
}
adding_a_BillExpense_to_Trip_works();

function exporting_and_importing_DataObject_works()
{
    let service = new KaravaanService();
    
    let participant1 = service.addNewPerson("John", "Lennon");
    let participant2 = service.addNewPerson("Paul", "McCartney");
    let participant3 = service.addNewPerson("George", "Harrison");
    let participant4 = service.addNewPerson("Ringo", "Star");
    
    let newTrip = service.addNewTrip("Rome");
    
    service.addExistingParticipantToTripById(newTrip.id, participant1.id);
    service.addExistingParticipantToTripById(newTrip.id, participant2.id);
    service.addExistingParticipantToTripById(newTrip.id, participant3.id);
    service.addExistingParticipantToTripById(newTrip.id, participant4.id);
    
    let newEvenExpense = service.addNewExpenseByTripId(newTrip.id, ExpenseType.EvenExpense, 100);
    let firstEvenPayment = service.addNewPaymentToExpenseById(newTrip.id, newEvenExpense.id, participant1.id, 50);
    let secondEvenPayment = service.addNewPaymentToExpenseById(newTrip.id, newEvenExpense.id, participant2.id, 50);
    let fistEvenParticipant = service.addParticipantToExpenseById(newTrip.id, newEvenExpense.id, participant3.id);
    let secondEvenParticipant = service.addParticipantToExpenseById(newTrip.id, newEvenExpense.id, participant4.id);
    
    let serviceJSONString = JSON.stringify(service.toDataObject());
    let importedService = KaravaanService.fromDataObject(JSON.parse(serviceJSONString));
    
    console.log(importedService.persons);
}
exporting_and_importing_DataObject_works();