"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Trip_1 = require("./Trip");
const Person_1 = require("./Person");
const CurrencyService_1 = require("./CurrencyService");
const ExpenseType_1 = require("./ExpenseType");
const EvenExpense_1 = require("./EvenExpense");
const Debt_1 = require("./Debt");
/**
* Class representing a KaravaanService.
*/
class KaravaanService {
    /**
    * Create a new KaravaanService.
    * @class KaravaanService
    */
    constructor() {
        this._idCounter = 0;
        this.tripMap = new Map();
        this.currencyService = new CurrencyService_1.CurrencyService();
    }
    // Getters and Setters
    set idCounter(newIndex) {
        this._idCounter = newIndex;
    }
    /**
    * Get or set the idCounter, which is responsible for handling ID assignment in the KaravaanService.
    *
    * @returns {number} The currenct ID.
    */
    get idCounter() {
        return this._idCounter;
    }
    /**
    * Get or set the CurrencyService, which is used for retrieving a list of currencies.
    *
    * @returns {CurrencyService} The current CurrencyService.
    */
    get currencyService() {
        return this._currencyService;
    }
    set currencyService(newCurrencyService) {
        this._currencyService = newCurrencyService;
    }
    /**
    * Get an Array of the Currencies.
    *
    * @returns {Array<Currency>} An Array of Currencies.
    */
    get currencies() {
        return Array.from(this.currencyMap.values());
    }
    /**
    * Get a Map of all Currencies.
    *
    * @returns {Map<string, Currency>} A Map<string, Currency> of all the Currencies.
    */
    get currencyMap() {
        return this.currencyService.currencies;
    }
    /**
    * Get or set a Map of the Trips that this KaravaanService contains.
    *
    * @returns {Map<number, Trip>} A Map of all the Trips.
    */
    get tripMap() {
        return this._tripMap;
    }
    set tripMap(newTripMap) {
        this._tripMap = newTripMap;
    }
    /**
    * Get an Array of all the Trips.
    *
    * @returns {Array<Trip>} An Array containing all the Trips.
    */
    get trips() {
        return Array.from(this.tripMap.values());
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
    getCurrency(currencyName) {
        let currency = this.currencyService.currencies.get(currencyName);
        // Check if the currency exists. If not, throw error.
        if (typeof currency == 'undefined')
            throw new Error("Currency with name " + currencyName + " does not exist.");
        return currency;
    }
    /**
    * Add a new Trip by name.
    *
    * @param {string} name - The name of the Trip to be created.
    *
    * @returns {Trip} The created Trip, with all properties set to the default values and an ID assigned by the KaravaanService.
    */
    addNewTrip(name, description = "") {
        let newTrip = new Trip_1.Trip();
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
    addTrip(newTrip) {
        // Assign new id to the new trip if it does not have one
        if (newTrip.id < 0)
            newTrip.id = this.idCounter++;
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
    getTripById(id) {
        let trip = this.tripMap.get(id);
        // Check if Trip exists. If not, throw error.
        if (typeof trip == 'undefined')
            throw new Error("Trip with ID " + id + " does not exist.");
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
    removeTripById(tripId) {
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
    addCurrencyToTrip(tripId, newCurrency) {
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
    removeCurrencyFromTrip(tripId, currencyName) {
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
    getCurrenciesByTripId(tripId) {
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
    getCurrencyFromTripByName(tripId, currencyName) {
        let trip = this.getTripById(tripId);
        let currency = trip.currencyMap.get(currencyName);
        // Check if a Currency is returned.
        if (typeof currency == 'undefined')
            throw new Error("Currency with name " + currencyName + " not found in Trip with id " + tripId + ".");
        return currency;
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
    addNewParticipantToTripById(tripId, firstName, lastName) {
        let newPerson = new Person_1.Person(this.idCounter++, firstName, lastName);
        let trip = this.getTripById(tripId);
        return this.addParticipantToTrip(trip, newPerson);
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
    addParticipantToTrip(trip, person) {
        if (person.id < 0)
            trip.id = this.idCounter++;
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
    removeParticipantById(tripId, participantId) {
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
    getParticipantsByTripId(tripId) {
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
    getParticipantById(tripId, participantId) {
        for (let participant of this.getTripById(tripId).participants) {
            if (participant.id == participantId)
                return participant;
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
    addNewExpenseByTripId(tripId, expenseType, expenseAmount = 100, description = "", category = "") {
        let newExpense;
        switch (expenseType) {
            case ExpenseType_1.ExpenseType.EvenExpense:
                newExpense = new EvenExpense_1.EvenExpense();
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
    addExpenseToTrip(trip, expense) {
        if (expense.id < 0)
            expense.id = this.idCounter++;
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
    getExpensesByTripId(tripId) {
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
    getExpenseById(tripId, expenseId) {
        let expenseToReturn = this.getTripById(tripId).expenseMap.get(expenseId);
        // Check if an IExpens was returned.
        if (typeof expenseToReturn == 'undefined')
            throw new Error("Trip with id " + tripId + " does not contain an IExpense with ID " + expenseId + ".");
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
    removeExpenseFromTripById(tripId, expenseId) {
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
    addParticipantToExpenseById(tripId, expenseId, participantId) {
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
    removeParticipantFromExpenseById(tripId, expenseId, participantId) {
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
    getParticipantsByExpenseId(tripId, expenseId) {
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
    getParticipantFromExpenseById(tripId, expenseId, participantId) {
        let participant = this.getParticipantById(tripId, participantId);
        let returnedParticipant = this.getExpenseById(tripId, expenseId).participantMap.get(participantId);
        // Check if participant is returned. If not, throw Error.
        if (typeof returnedParticipant == 'undefined')
            throw new Error("Participant with ID " + participantId + " not found in IExpense with ID " + expenseId + ".");
        return returnedParticipant;
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
    addNewDebtToExpenseById(tripId, expenseId, participantId, amount) {
        let expense = this.getExpenseById(tripId, expenseId);
        let participant = this.getParticipantById(tripId, participantId);
        // Check if expense exists
        if (typeof expense === 'undefined') {
            // If it does not, throw an Error
            throw new Error("Expense with id " + expenseId + " does not exist.");
        }
        // Check if this participant already exists
        if (typeof participant === 'undefined') {
            // If it does not, throw an Error
            throw new Error("Participant with id " + participantId + " does not exist in current Trip.");
        }
        // Create debt and add to trip
        let newDebt = new Debt_1.Debt();
        newDebt.debtor = participant;
        newDebt.amount = amount;
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
    getDebtsByExpenseId(tripId, expenseId) {
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
    getDebtsForParticipantByExpenseId(tripId, expenseId, participantId) {
        let expense = this.getExpenseById(tripId, expenseId);
        let participant = this.getParticipantById(tripId, participantId);
        let debtList = new Array();
        for (let debt of expense.debts.values()) {
            if (debt.debtor === participant)
                debtList.push(debt);
        }
        return debtList;
    }
}
exports.KaravaanService = KaravaanService;