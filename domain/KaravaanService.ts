import { Currency } from './Currency';
import { Trip } from './Trip';
import { Person } from './Person';
import { IExpense } from './IExpense';
import { CurrencyService } from './CurrencyService';
import { ExpenseType } from './ExpenseType';
import { EvenExpense } from './EvenExpense';
import { Debt } from './Debt';
import { Payment } from './Payment';
import { BillItem } from './BillItem';
import { BillExpense } from './BillExpense';

import { KaravaanServiceDO } from './KaravaanServiceDO';

/**
* Class representing a KaravaanService.
*/
export class KaravaanService
{
    private _idCounter : number = 0;
    
    private _tripMap : Map<number, Trip>;
    private _currencyService : CurrencyService;
    private _personMap : Map<number, Person>;
    
    /**
    * Create a new KaravaanService.
    * @class KaravaanService
    */
    constructor()
    {
        this.tripMap = new Map<number, Trip>();
        this.currencyService = new CurrencyService();
        this._personMap = new Map<number, Person>();
    }
    
    // Getters and Setters
    
    private set idCounter(newIndex : number)
    {
        this._idCounter = newIndex;
    }
    
    /**
    * Get or set the idCounter, which is responsible for handling ID assignment in the KaravaanService.
    *
    * @returns {number} The currenct ID.
    */
    private get idCounter() : number
    {
        return this._idCounter;
    }
    
    /**
    * Get or set the CurrencyService, which is used for retrieving a list of currencies.
    *
    * @returns {CurrencyService} The current CurrencyService.
    */
    private get currencyService() : CurrencyService
    {
        return this._currencyService;
    }
    
    private set currencyService(newCurrencyService : CurrencyService)
    {
        this._currencyService = newCurrencyService;
    }
    
    /**
    * Get an Array of the Currencies.
    *
    * @returns {Array<Currency>} An Array of Currencies.
    */
    get currencies() : Array<Currency>
    {
        return Array.from(this.currencyMap.values());
    }
    
    /**
    * Get a Map of all Currencies.
    *
    * @returns {Map<string, Currency>} A Map<string, Currency> of all the Currencies.
    */
    get currencyMap() : Map<string, Currency>
    {
        return this.currencyService.currencies;
    }
    
    /**
    * Get or set a Map of the Trips that this KaravaanService contains.
    *
    * @returns {Map<number, Trip>} A Map of all the Trips.
    */
    get tripMap() : Map<number, Trip>
    {
        return this._tripMap;
    }
    
    set tripMap(newTripMap : Map<number, Trip>)
    {
        this._tripMap = newTripMap;
    }
    
    /**
    * Get an Array of all the Trips.
    *
    * @returns {Array<Trip>} An Array containing all the Trips.
    */
    get trips() : Array<Trip>
    {
        return Array.from(this.tripMap.values());
    }
    
    /**
    * Get or set the Map containing all Persons.
    *
    * @returns {Map<number, Person>} A Map<number, Person> containing all the Persons.
    */
    get personMap() : Map<number, Person>
    {
        return this._personMap;
    }
    
    set personMap(newPersonMap : Map<number, Person>)
    {
        this._personMap = newPersonMap;
    }
    
    /**
    * Get a list of all persons.
    *
    * @returns {Array<Peron>} An Array<Person> containing all Person objects.
    */
    get persons() : Array<Person>
    {
        return Array.from(this.personMap.values());
    }
    
    // Methods
    
    /**
    * Get a currency from the CurrencyService.
    *
    * @param {string} currencyName - The name of the desired currency.
    *
    * @throws Will throw an Error when no Currency with supplied name is found.
    *
    * @returns {Currency} The currency returned by the CurrencyService.
    */
    getCurrency(currencyName : string) : Currency
    {
        let currency = this.currencyService.currencies.get(currencyName);
        
        // Check if the currency exists. If not, throw error.
        if (typeof currency == 'undefined') throw new Error("Currency with name " + currencyName + " does not exist.");
        
        return currency;
    }
    
    /**
    * Add a new Trip by name.
    *
    * @param {string} name - The name of the Trip to be created.
    *
    * @returns {Trip} The created Trip, with all properties set to the default values and an ID assigned by the KaravaanService.
    */
    addNewTrip(name : string, description : string = "") : Trip
    {
        let newTrip = new Trip();
        newTrip.name = name;
        newTrip.description = description;
        newTrip.addCurrency(this.currencyMap.get("EUR"));
        return this.addTrip(newTrip);
    }
    
    /**
    * Add a trip by object, which can be used to replace trips after updating properties.
    *
    * @param {Trip} newTrip - The Trip object to be added or updated.
    *
    * @returns {Trip} The added Trip, with an assigned ID if it didn't have one already.
    */
    private addTrip(newTrip : Trip) : Trip
    {
        // Assign new id to the new trip if it does not have one
        if (newTrip.id < 0) newTrip.id = this.idCounter++;
        
        // Add trip to the tripMap
        this.tripMap.set(newTrip.id, newTrip);
        
        return newTrip;
    }
    
    /**
    * Get a trip by its ID.
    *
    * @param {number} id - The id of the desired Trip.
    *
    * @throws Will throw an Error when no Trip with supplied ID is found.
    *
    * @returns {Trip} The desired trip, or 'undefined' if none was found.
    */
    getTripById(id : number) : Trip
    {
        let trip = this.tripMap.get(id);
        
        // Check if Trip exists. If not, throw error.
        if (typeof trip == 'undefined') throw new Error("Trip with ID " + id + " does not exist.");
        
        return trip;
    }
    
    /**
    * Remove a Trip by its ID.
    * 
    * @param {number} tripId - The ID of the Trip to be removed.
    *
    * @throws Will throw an Error when no Trip with supplied ID is found.
    *
    * @returns {number} The amount of Trips currently maintained by the KaravaanService.
    */
    removeTripById(tripId : number) : number
    {
        let trip = this.getTripById(tripId);
        this.tripMap.delete(trip.id);
        
        return this.tripMap.size;
    }
    
    /**
    * Add a specific currency to a Trip.
    *
    * @param {number} tripId - The ID of the Trip the Currency needs to be added to.
    * @param {Currency} newCurrency - The Currency that needs to be added.
    *
    * @throws Will throw an Error when no Trip with supplied ID is found.
    *
    * @returns {number} The amount of Currencies maintained by the Trip with supplied ID after addition of the new Currency.
    */
    addCurrencyToTrip(tripId : number, newCurrency : Currency) : number
    {
        let trip = this.getTripById(tripId);
        trip.addCurrency(newCurrency);
        return trip.currencyMap.size;
    }
    
    /**
    * Remove a specific currency from a Trip.
    *
    * @param {number} tripId - The ID of the Tip the Currency needs to be removed from.
    * @param {string} currencyName - The name of the Currency that needs to be removed.
    *
    * @throws Will throw an Error when no Trip with supplied ID is found.
    * @throws Will throw an Error when no Currency with supplied name is found in the Trip.
    *
    * @returns {number} The amount of Currencies maintained by the Trip with supplied ID after removal of the Currency.
    */
    removeCurrencyFromTrip(tripId : number, currencyName : string)
    {
        let trip = this.getTripById(tripId);
        let currency = this.getCurrencyFromTripByName(tripId, currencyName);
        
        
        return trip.removeCurrency(currency);
    }
    
    /**
    * Get an Array of Currencies from a Trip.
    *
    * @param {number} tripId - The ID of the Trip we need the Currencies from.
    *
    * @throws Will throw an Error when no Trip with supplied ID is found.
    *
    * @returns {Array<Currency>} The Array of Currencies maintained by the Trip with supplied ID.
    */
    getCurrenciesByTripId(tripId) : Array<Currency>
    {
        let trip = this.getTripById(tripId);
        return trip.currencies;
    }
    
    /**
    * Get a Currency from a Trip.
    *
    * @param {number} tripId - The ID of the Trip we want to retrieve the Currency from.
    * @param {string} currencyName - The name of the Currency we want to retrieve. (e.g. "EUR")
    *
    * @throws Will throw an Error when no Trip with supplied ID is found.
    * @throws Will throw an Error when no Currency with supplied name is found in the Trip.
    *
    * @returns The Currency with supplied name from Trip with supplied ID.
    */
    getCurrencyFromTripByName(tripId : number, currencyName : string) : Currency
    {
        let trip = this.getTripById(tripId);
        let currency = trip.currencyMap.get(currencyName);
        
        // Check if a Currency is returned.
        if (typeof currency == 'undefined') throw new Error("Currency with name " + currencyName + " not found in Trip with id " + tripId + ".");
        
        return currency;
    }
    
    /**
    * Get a list of all participants to all Trips.
    *
    * @returns {Array<Person>} An Array<Person> of all participants of this service.
    */
    getAllParticipants() : Array<Person>
    {
        let participantSet = new Set<Person>();
        
        for (let trip of this.trips)
        {
            for (let participant of trip.participants)
            {
                participantSet.add(participant);
            }
        }
        
        return Array.from(participantSet);
    }
    
    /**
    * Create and add a new Person object. This Person does not get linked to a Trip using this method.
    *
    * @param {string} firstName - The first name of this new Person.
    * @param {string} lastName - The last name of this new Person.
    *
    * @returns {Person} The newly created and added Person.
    */
    addNewPerson(firstName : string, lastName : string) : Person
    {
        let newPerson = new Person();
        newPerson.firstName = firstName;
        newPerson.lastName = lastName;
        return this.addPerson(newPerson);
    }
    
    /**
    * Add a Person object.
    *
    * @param {Person} person - The Person object to be added.
    *
    * @returns {Person} The Person object with a newly assigned ID.
    */
    private addPerson(person: Person) : Person
    {
        if (person.id < 0) person.id = this.idCounter++;
        this.personMap.set(person.id, person);
        return person;
    }
    
    /**
    * Get a Person object by its ID.
    *
    * @param {number} personId - The ID of the Person object to be returned.
    *
    * @throws Will throw an Error when no Person object with supplied ID is found.
    *
    * @returns {Person} The Person object with supplied ID.
    */
    getPersonById(personId : number) : Person
    {
        let person = this.personMap.get(personId);
        if (typeof person == 'undefined') throw new Error("Person with id " + personId + " does not exist.");
        return person;
    }
    
    /**
    * Add a new participant to the Trip by using the Trips ID.
    *
    * @param {number} tripId - The ID of the Trip this participant has to be added to.
    * @param {string} firstName - The first name of the participant to be added.
    * @param {string} lastName - The last name of the participant to be added.
    *
    * @throws Will throw an Error when no Trip with supplied ID is found.
    *
    * @returns {Person} The newly created and added participant, with a new ID assigned to it.
    */
    addNewParticipantToTripById(tripId : number, firstName : string, lastName : string) : Person
    {
        let newPerson = this.addNewPerson(firstName, lastName);
        let trip = this.getTripById(tripId);
        return this.addParticipantToTrip(trip, newPerson);
    }
    
    /**
    * Add an existing Person object as a participant to a Trip.
    *
    * @param {number} tripId - The ID of the Trip this Person should be added to.
    * @param {number} personId - The ID of the Person that should be added to the Trip with given ID.
    *
    * @throws Will throw an Error when no Trip with supplied ID is found.
    * @throws Will throw an Error when no Person with supplied ID is found.
    *
    * @returns {Person} The newly added Person.
    */
    addExistingParticipantToTripById(tripId : number, personId : number) : Person
    {
        let person = this.getPersonById(personId);
        
        return this.addParticipantToTrip(this.getTripById(tripId), person);
    }
    
    /**
    * Add a participant to a Trip by using objects.
    *
    * @param {Trip} trip - The Trip where the participant should be added to.
    * @param {Person} person - The Person object that needs to be added to the Trip.
    *
    * @throws Will throw an Error when no Trip with supplied ID is found.
    *
    * @returns {Person} The person object, with an assigned ID if it didn't have one yet.
    */
    private addParticipantToTrip(trip : Trip, person : Person) : Person
    {
        trip.addParticipant(person);
        return person;
    }
    
    /**
    * Remove a participant from a Trip by using the ID of the Trip and the ID of the participant.
    *
    * @param {number} tripId - The ID of the Trip this participant needs to be removed from.
    * @param {number} participantId - The ID of the participant that needs to be removed.
    *
    * @throws Will throw an Error when no Trip with supplied ID is found.
    * @throws Will throw an Error when no participant with supplied ID is found.
    *
    * @returns The amount of participants from the Trip with supplied ID.
    */
    removeParticipantById(tripId : number, participantId : number) : number
    {
        let trip = this.getTripById(tripId);
        let participant = this.getParticipantById(trip.id, participantId);
        
        return trip.removeParticipant(participant);
    }
    
    /**
    * Get an Array of all the participants for a given Trip by using the Trips ID.
    *
    * @param {number} tripId - The ID of the desired Trip.
    *
    * @throws Will throw an Error when no Trip with supplied ID is found.
    *
    * @returns {Array<Person>} An Array containing all the participants for Trip with given ID.
    */
    getParticipantsByTripId(tripId : number) : Array<Person>
    {
        return this.getTripById(tripId).participants;
    }
    
    /**
    * Get a single participant from a Trip by using the participants ID and the Trips ID.
    *
    * @param {number} tripId - The ID of the Trip.
    * @param {number} participantId - The ID of the desired participant.
    *
    * @throws Will throw an Error when no Trip with supplied ID is found.
    * @throws Will throw an Error when no participant with supplied ID is found.
    *
    * @returns {Person} The desired participant.
    */
    getParticipantById(tripId : number, participantId : number) : Person
    {
        for (let participant of this.getTripById(tripId).participants)
        {
            if (participant.id == participantId) return participant;
        }
        
        // No participants found
        throw new Error("Participant with id " + participantId + " does not exist for Trip with id " + tripId);
    }
    
    /**
    * Add a new Expense to a Trip by using the Trips ID and specifying the ExpenseType.
    *
    * @param {number} tripId - The ID of the Trip this Expense needs to be added to.
    * @param {ExpenseType} expenseType - The ExpenseType of the Expense. Types can be found in the ExpenseType enumeration.
    * @param {number} [expenseAmount=100] - Optional total price of the Expense.
    * @param {string} [description] - Optional description for the Expense.
    * @param {string} [category] - Optional category for the Expense.
    *
    * @throws Will throw an Error when an no Trip with supplied ID is found.
    * @throws Will throw an Error when an unknow ExpenseType is supplied.
    *
    * @returns {IExpense} The newly created IExpense of given ExpenseType.
    */
    addNewExpenseByTripId(tripId : number, expenseType : ExpenseType, expenseAmount : number = 100, description : string = "", category : string = "") : IExpense
    {
        let newExpense;
        
        switch(expenseType)
        {
            case ExpenseType.EvenExpense:
                newExpense = new EvenExpense();
            break;
                
            case ExpenseType.BillExpense:
                newExpense = new BillExpense();
            break;
                
            // No expenseType found
            default: 
                throw new Error("ExpenseType " + expenseType + " not found.");
        }
        
        newExpense.expenseAmount = expenseAmount;
        newExpense.description = description;
        newExpense.category = category;
            
        return this.addExpenseToTrip(this.getTripById(tripId), newExpense);
    }
    
    /**
    * Add an IExpense to a Trip by using objects.
    *
    * @param {Trip} trip - The Trip this IExpense should be added to.
    * @param {IExpense} expense - The IExpense to add to the Trip.
    *
    * @returns {IExpense} The newly added IExpense, with an assigned ID if it didn't have one already.
    */
    private addExpenseToTrip(trip : Trip, expense : IExpense) : IExpense
    {
        if (expense.id < 0) expense.id = this.idCounter++;
        trip.addExpense(expense);
        return expense;
    }
    
    /**
    * Get an Array of IExpenses by the ID of the Trip this IExpenses belong to.
    *
    * @param {number} tripId - The ID of the Trip.
    *
    * @throws Will throw an Error when no Trip with supplied ID is found.
    *
    * @returns {Array<IExpense>} An Array containing all of the IExpenses for Trip with given ID.
    */
    getExpensesByTripId(tripId : number) : Array<IExpense>
    {
        return this.getTripById(tripId).expenses;
    }
    
    /**
    * Get an IExpense by its ID and the ID of the Trip it belongs to.
    * 
    * @param {number} tripId - The ID of the Trip this IExpense belongs to.
    * @param {number} expenseId - The ID of the desired IExpense.
    *
    * @throws Will throw an Error when no Trip with supplied ID is found.
    * @throws Will throw an Error when no IExpense with supplied ID is found.
    *
    * @returns {IExpense} The desired IExpense.
    */
    getExpenseById(tripId : number, expenseId : number) : IExpense
    {
        let expenseToReturn = this.getTripById(tripId).expenseMap.get(expenseId);
        
        // Check if an IExpens was returned.
        if (typeof expenseToReturn == 'undefined') throw new Error("Trip with id " + tripId + " does not contain an IExpense with ID " + expenseId + ".");
        
        return expenseToReturn;
    }
    
    /**
    * Remove an IExpense from a Trip by its ID and the ID of the Trip it should be removed from.
    *
    * @param {number} tripId - The ID of the Trip the IExpense should be removed from.
    * @param {number} expenseId - The ID of the IExpense that should be removed.
    *
    * @throws Will throw an Error when no Trip with supplied ID is found.
    * @throws Will throw an Error when no IExpense with supplied ID is found.
    *
    * @returns {number} The amount of IExpenses maintained by Trip with supplied ID after removal.
    */
    removeExpenseFromTripById(tripId : number, expenseId : number) : number
    {
        let trip = this.getTripById(tripId);
        let expense = this.getExpenseById(tripId, expenseId);
        
        return trip.removeExpense(expense);
    }
    
    /**
    * Add participant to an IExpense of a Trip by using the ID of the Trip the IExpense belongs to, the ID of the IExpense and the ID of the participant.
    *
    * @param {number} tripId - The ID of the Trip the IExpense and the participant belong to.
    * @param {number} expenseId - The ID of the IExpense the participant should be added to.
    * @param {number} participantId - The ID of the participant that should be added to the IExpense.
    *
    * @throws Will throw an error when no Trip with supplied ID is found.
    * @throws Will throw an error when no IExpense with supplied ID is found.
    * @throws Will throw an error when no participant with supplied ID is found.
    *
    * @returns {IExpense} The IExpense after the participant has been added.
    */
    addParticipantToExpenseById(tripId : number, expenseId : number, participantId : number) : Person
    {
        let trip = this.getTripById(tripId);
        let expense = this.getExpenseById(tripId, expenseId);
        let participant = this.getParticipantById(tripId, participantId);
        
        expense.addParticipant(participant);
        
        return this.getParticipantFromExpenseById(tripId, expenseId, participant.id);
    }
    
    /**
    * Remove participant to an IExpense of a Trip by using the ID of the Trip the IExpense belongs to, the ID of the IExpense and the ID of the participant.
    *
    * @param {number} tripId - The ID of the Trip the IExpense and the participant belong to.
    * @param {number} expenseId - The ID of the IExpense the participant should be removed from.
    * @param {number} participantId - The ID of the participant that should be removed from the IExpense.
    *
    * @throws Will throw an error when no Trip with supplied ID is found.
    * @throws Will throw an error when no IExpense with supplied ID is found.
    * @throws Will throw an error when no participant with supplied ID is found.
    * @throws Will throw an error when no participant with supplied ID participates to the IExpense with supplied ID.
    *
    * @returns {number} The amount of participants participating to the IExpense after removal.
    */
    removeParticipantFromExpenseById(tripId : number, expenseId : number, participantId : number) : number
    {
        let expense = this.getExpenseById(tripId, expenseId);
        let participant = this.getParticipantFromExpenseById(tripId, expenseId, participantId);
        
        return expense.removeParticipant(participant.id);
    }
    
    /**
    * Get a list of participants participating to IExpense with supplied ID which is maintained by Trip with supplied ID.
    *
    * @param {number} tripId - The ID of the Trip this IExpense belongs to.
    * @param {number} expenseId - The ID of the IExpense the participants should be returned from.
    *
    * @throws Will throw an error when no Trip with supplied ID is found.
    * @throws Will throw an error when no IExpense with supplied ID is found.
    *
    * @returns {Array<Person>} A list of participants participating to the IExpense with supplied ID.
    */
    getParticipantsByExpenseId(tripId : number, expenseId : number) : Array<Person>
    {
        return this.getExpenseById(tripId, expenseId).participants;
    }
    
    /**
    * Get a participant from an IExpense by using the ID of the Trip this IExpense belongs to, the ID of the IExpense this participant belongs to, and the ID of the participant.
    *
    * @param {number} tripId - The ID of the Trip the IExpense belongs to.
    * @param {number} expenseId - The ID of the IExpense the participant belongs to.
    * @param {number} participantId - The ID of the participant.
    *
    * @throws Will throw an error when no Trip with supplied ID is found.
    * @throws Will throw an error when no IExpense with supplied ID is found.
    * @throws Will throw an error when no participant with supplied ID is found.
    * @throws Will throw an error when no participant with supplied ID participates to the IExpense with supplied ID.
    *
    * @returns {Person} The participant with supplied ID participating to the IExpense with supplied ID.
    */
    getParticipantFromExpenseById(tripId : number, expenseId : number, participantId : number) : Person
    {
        let participant = this.getParticipantById(tripId, participantId);
        
        let returnedParticipant = this.getExpenseById(tripId, expenseId).participantMap.get(participantId);
        
        // Check if participant is returned. If not, throw Error.
        if (typeof returnedParticipant == 'undefined') throw new Error("Participant with ID " + participantId + " not found in IExpense with ID " + expenseId + ".");
        
        return returnedParticipant;
    }
    
    addNewPaymentToExpenseById(tripId : number, expenseId : number, participantId : number, amount) : IExpense
    {
        let expense = this.getExpenseById(tripId, expenseId);
        let participant = this.getParticipantById(tripId, participantId);
        
        let newPayment = new Payment();
        newPayment.creditor = participant;
        newPayment.amount = amount;
        
        return this.addPaymentToExpenseById(tripId, expenseId, newPayment);
    }
    
    private addPaymentToExpenseById(tripId : number, expenseId : number, newPayment : Payment) : IExpense
    {
        let expense = this.getExpenseById(tripId, expenseId);
        expense.addPayment(newPayment);
        return expense;
    }
    
    /**
    * Add a Debt to a certain IExpense by using its ID, the ID of the Trip it belongs to and the ID of the participant whose debt this is.
    * This method will throw an Error when no IExpense with given ID is found.
    * This method will throw an Error when no participant with given ID is found.
    *
    * @param {number} tripId - The ID of the Trip the IExpense belongs to.
    * @param {number} expenseId - The ID of the IExpense this Debt should be added to.
    * @param {number} participantId - The ID of the participant this debt belongs to. This will be the debtor in this newly created Debt object.
    * @param {number} amount - The amount of the Debt.
    * 
    * @returns {Debt} The newly created and added Debt, with an ID assigned to it.
    */
    addNewDebtToExpenseById(tripId : number, expenseId : number, participantId : number, amount : number) : IExpense
    {
        let expense = this.getExpenseById(tripId, expenseId);
        let participant = this.getParticipantById(tripId, participantId);
        
        // Check if expense exists
        if (typeof expense === 'undefined')
        {
            // If it does not, throw an Error
            throw new Error("Expense with id " + expenseId + " does not exist.");
        }
        
        // Check if this participant already exists
        if (typeof participant === 'undefined')
        {
            // If it does not, throw an Error
            throw new Error("Participant with id " + participantId + " does not exist in current Trip.");
        }
        
        // Create debt and add to trip
        let newDebt = new Debt();
        newDebt.debtor = participant;
        newDebt.amount = amount;
        
        return this.addDebtToExpenseById(tripId, expenseId, newDebt);
    }
    
    private addDebtToExpenseById(tripId : number, expenseId : number, newDebt : Debt) : IExpense
    {
        let expense = this.getExpenseById(tripId, expenseId);
        expense.addDebt(newDebt);
        return expense;
    }
    
    /**
    * Get an Array of Debts by the ID of the IExpense it belongs to and the ID of the Trip the IExpense belongs to.
    *
    * @param {number} tripId - The ID of the Trip.
    * @param {number} expenseId - The ID of the IExpense.
    *
    * @returns {Array<Debt>} An Array of all debts of this IExpense.
    */
    getDebtsByExpenseId(tripId : number, expenseId : number) : Array<Debt>
    {
        return Array.from(this.getExpenseById(tripId, expenseId).debts.values());
    }
    
    /**
    * Get an Array of all the Debts of a certain participant by using its ID, the ID of the IExpense these Debts belong to and the ID of the Trip this IExpense belongs to.
    *
    * @param {number} tripId - The ID of the Trip this IExpense belongs to.
    * @param {number} expenseId - The ID of the IExpense these Debts belong to.
    * @param {number} participantId - The ID of the participant these Debts belong to.
    *
    * @param {Array<Debt>} An Array with the Debts for this participant.
    */
    
    getDebtsForParticipantByExpenseId(tripId : number, expenseId : number, participantId : number) : Array<Debt>
    {
        let expense = this.getExpenseById(tripId, expenseId);
        let participant = this.getParticipantById(tripId, participantId);
        
        let debtList = new Array<Debt>();
        
        for (let debt of expense.debts.values())
        {
            if (debt.debtor === participant) debtList.push(debt);
        }
        
        return debtList;
    }
    
    addNewBillItemToExpenseById(tripId : number, expenseId : number, participantId : number, description : string, amount : number) : IExpense
    {
        let expense = this.getExpenseById(tripId, expenseId);
        let participant = this.getParticipantById(tripId, participantId);
        
        let newBillItem = new BillItem();
        newBillItem.debtor = participant;
        newBillItem.description = description;
        newBillItem.amount = amount;
        return this.addBillItemToExpense(tripId, expenseId, newBillItem);
    }
    
    private addBillItemToExpense(tripId: number, expenseId : number, newBillItem : BillItem) : IExpense
    {
        let expense = this.getExpenseById(tripId, expenseId);
        expense.addBillItem(newBillItem);
        return expense;
    }
    
    /**
    * Create a DataObject of this service that can later be used to reload it.
    *
    * @returns {KaravaanServiceDO} - The DataObject that represents this service.
    */
    toDataObject() : KaravaanServiceDO
    {
        let newDO = new KaravaanServiceDO();
        
        newDO.idCounter = this.idCounter;
        newDO.persons = this.persons;
        
        for (let trip of this.trips)
        {
            newDO.trips.push(trip.toDataObject());
        }
        
        newDO.currencies = this.currencies;
        
        return newDO;
    }
    
    static fromDataObject(karavaanDO : KaravaanServiceDO) : KaravaanService
    {
        let newService = new KaravaanService();
        
        newService.idCounter = karavaanDO.idCounter;
        
        // Import users
        for (let person of karavaanDO.persons)
        {
            let newPerson = new Person(person.id, person.firstName, person.lastName);
            newService.addPerson(newPerson);
        }
        
        // Import currencies
        let currencyMap = new Map<string, Currency>();
        
        for (let currency of karavaanDO.currencies)
        {
            let newCurrency = new Currency(currency.name, currency.rateComparedToEUR);
            currencyMap.set(newCurrency.name, newCurrency);
        }
        
        newService.currencyService.currencies = currencyMap;
        
        // Import Trips
        for (let tripDO of karavaanDO.trips)
        {
            let newTrip = new Trip(tripDO.id, tripDO.name);
            newTrip.description = tripDO.description;
            newTrip.date = new Date(tripDO.date);
            
            newService.addTrip(newTrip);
            
            // Import participants of this trip
            for (let participant of tripDO.participants)
            {
                newService.addExistingParticipantToTripById(newTrip.id, participant.id);
            }
            
            // Import currencies of this trip
            for (let currency of tripDO.currencies)
            {
                newService.addCurrencyToTrip(newTrip.id, newService.getCurrency(currency.name));
            }
            
            // Import Expenses for this trip
            for (let expenseDO of tripDO.expenses)
            {
                let newExpense = newService.addNewExpenseByTripId(newTrip.id, expenseDO.expenseType, expenseDO.expenseAmount, expenseDO.description, expenseDO.category);
                newExpense.currency = newService.getCurrency(expenseDO.currency.name);
                
                for (let payment of expenseDO.payments)
                {
                    newService.addNewPaymentToExpenseById(newTrip.id, newExpense.id, payment.creditor.id, payment.amount);
                }
                
                for (let participant of expenseDO.participants)
                {
                    newService.addParticipantToExpenseById(newTrip.id, newExpense.id, participant.id);
                }
                
                for (let billItem of expenseDO.billItems)
                {
                    newService.addNewBillItemToExpenseById(newTrip.id, newExpense.id, billItem.debtor.id, billItem.description, billItem.amount);
                }
                
                for (let debt of expenseDO.debts)
                {
                    newService.addNewDebtToExpenseById(newTrip.id, newExpense.id, debt.debtor.id, debt.amount);
                }
            }
        }
        
        return newService;
    }
}