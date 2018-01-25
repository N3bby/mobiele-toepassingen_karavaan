"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Currency_1 = require("./Currency");
const TripDO_1 = require("./TripDO");
/**
* A Trip is a class that stores information about a Trip. Everything in the KaravaanService revolves around Trips.
*/
class Trip {
    /**
    * Initialise a new Trip.
    *
    * @param {number} [id=-1] - The ID of the new Trip.
    * @param {string} [name=""] - The name of the new Trip.
    * @param {string} [description=""] - The description of the new Trip.
    * @param currencies
    * @param activeCurrency
    * @param {Array<IExpense>} [expenses=New Array<IExpense>] - The list of IExpenses the new Trip will maintain.
    * @param {Array<Person>} [participants=New Array<Person>] - The list of participants the new Trip will maintain.
    * @param {Date} [date=new Date()] - The date of the new Trip.
    *
    * @class Trip
    */
    constructor(id = -1, name = "", description = "", currencies = new Map(), activeCurrency = "EUR", expenses = new Array(), participants = new Array(), date = new Date()) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.currencies = currencies;
        this.activeCurrency = activeCurrency;
        this.expenses = expenses;
        this.participants = participants;
        this.date = date;
    }

    /**
     *
     * @param amount (in euro)
     */
    convertToActiveCurrency(amount) {

    }
    /**
    * Get or set the ID of the Trip.
    *
    * @returns {number} The ID of the Trip.
    */
    get id() {
        return this._id;
    }
    set id(newId) {
        this._id = newId;
    }
    /**
    * Get of set the name of the Trip.
    *
    * @returns {string} The name of the Trip.
    */
    get name() {
        return this._name;
    }
    set name(newName) {
        this._name = newName;
    }
    /**
    * Get or set the description of this Trip.
    *
    * @returns {string} The description of this Trip.
    */
    get description() {
        return this._description;
    }
    set description(newDescription) {
        this._description = newDescription;
    }
    /**
    * Get or set a list of IExpenses that are maintained by this Trip.
    *
    * @returns {Array<IExpense>} An Array<IExpense> of IExpenses that are maintained by this Trip.
    */
    get expenses() {
        return Array.from(this.expenseMap.values());
    }
    set expenses(newExpenses) {
        let newExpenseMap = new Map();
        for (let expense of newExpenses) {
            newExpenseMap.set(expense.id, expense);
        }
        this.expenseMap = newExpenseMap;
    }
    /**
    * Get or set a Map of IExpenses that are maintained by this Trip, where the keys are the IDs of the IExpenses and the values are the Expenses isntances.
    *
    * @returns {Map<number, IExpense>} A Map<number, IExpense> of IExpenses that are maintained by this Trip.
    *
    */
    get expenseMap() {
        return this._expenses;
    }
    set expenseMap(newExpenses) {
        this._expenses = newExpenses;
    }
    /**
    * Get or set a list of participants that participate to this Trip.
    *
    * @returns {Array<Person>} An Array<Person> of participants that participate to this Trip.
    */
    get participants() {
        return Array.from(this.participantMap.values());
    }
    set participants(newParticipants) {
        let newParticipantsMap = new Map();
        for (let participant of newParticipants) {
            newParticipantsMap.set(participant.id, participant);
        }
        this.participantMap = newParticipantsMap;
    }
    /**
    * Get or set a Map of participants that participate to this Trip, where the keys are the IDs of the participants and the values are the Person instances.
    *
    * @returns {Map<number, Person>} A Map<number, Person> of participants that participate to this Trip.
    *
    */
    get participantMap() {
        return this._participants;
    }
    set participantMap(newParticipants) {
        this._participants = newParticipants;
    }
    /**
    * Get or set the date of this Trip.
    *
    * @returns {Date} The date of this Trip.
    */
    get date() {
        return this._date;
    }
    set date(newDate) {
        this._date = newDate;
    }
    // Methods
    /**
    * Add a participant to this Trip.
    *
    * @param {Person} newParticipant - The participant that should be added to this Trip.
    *
    * @returns {Person} The newly added participant.
    */
    addParticipant(newParticipant) {
        this.participantMap.set(newParticipant.id, newParticipant);
        return newParticipant;
    }
    /**
    * Remove a participant from this Trip.
    *
    * @param {Person} participant - The participant that needs to be removed from this Trip.
    *
    * @returns {number} The amount of participants participating to this Trip after removal.
    */
    removeParticipant(participant) {
        this.participantMap.delete(participant.id);
        return this.participantMap.size;
    }
    /**
    * Add an IExpense to this Trip.
    *
    * @param {IExpense} newExpense - The IExpense that should be added to this Trip.
    *
    * @retuns {IExpense} The newly added IExpense.
    */
    addExpense(newExpense) {
        this.expenseMap.set(newExpense.id, newExpense);
        return newExpense;
    }
    /**
    * Remove an IExpense from this Trip.
    *
    * @param {IExpense} expense - The IExpense that should be removed from this Trip.
    *
    * @returns {number} The amount of IExpenses maintained by this Trip after removal.
    */
    removeExpense(expense) {
        this.expenseMap.delete(expense.id);
        return this.expenseMap.size;
    }
    toDataObject() {
        let newDO = new TripDO_1.TripDO();
        newDO.id = this.id;
        newDO.name = this.name;
        newDO.description = this.description;
        newDO.currencies = Array.from(this.currencies.values());
        newDO.activeCurrency = this.activeCurrency;
        for (let IExpense of this.expenses) {
            newDO.expenses.push(IExpense.toDataObject());
        }
        newDO.participants = this.participants;
        newDO.date = this.date.toISOString();
        return newDO;
    }
}
exports.Trip = Trip;
