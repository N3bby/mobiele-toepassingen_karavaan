import { IExpense } from './IExpense';
import { Person } from './Person';
import { Currency } from './Currency';

/**
* A Trip is a class that stores information about a Trip. Everything in the KaravaanService revolves around Trips.
*/
export class Trip 
{
    private _id : number;
    private _name : string;
    private _description : string;
    private _currencies : Map<string, Currency>;
    private _expenses : Map<number, IExpense>;
    private _participants : Map<number, Person>;
    private _date : Date;
    
    /**
    * Initialise a new Trip.
    *
    * @param {number} [id=-1] - The ID of the new Trip.
    * @param {string} [name=""] - The name of the new Trip.
    * @param {string} [description=""] - The description of the new Trip.
    * @param {Currency} [currency=new Currency()] - The default Currency of the new Trip.
    * @param {Array<IExpense>} [expenses=New Array<IExpense>] - The list of IExpenses the new Trip will maintain.
    * @param {Array<Person>} [participants=New Array<Person>] - The list of participants the new Trip will maintain.
    * @param {Date} [date=new Date()] - The date of the new Trip.
    *
    * @class Trip
    */
    constructor(id : number = -1,
                name : string = "",
                description : string = "",
                currency : Currency = new Currency("EUR", 1),
                expenses : Array<IExpense> = new Array<IExpense>(),
                participants : Array<Person> = new Array<Person>(),
                date : Date = new Date()
               )
    {
        this.id = id;
        this.name = name;
		this.description = description;
        this.currencies = new Array<Currency>();
        this.addCurrency(currency);
        this.expenses = expenses;
        this.participants = participants;
    }
    
    /**
    * Get or set the ID of the Trip.
    *
    * @returns {number} The ID of the Trip.
    */
    get id() : number
    {
        return this._id;
    }
    
    set id(newId : number)
    {
        this._id = newId;
    }
    
    /**
    * Get of set the name of the Trip.
    *
    * @returns {string} The name of the Trip.
    */
    get name() : string
    {
        return this._name;
    }
    
    set name(newName : string)
    {
        this._name = newName;
    }
    
    /**
    * Get or set the description of this Trip.
    *
    * @returns {string} The description of this Trip.
    */
    get description() : string
    {
        return this._description;
    }
    
    set description(newDescription : string)
    {
        this._description = newDescription;
    }
    
    /**
    * Get or set a list of Currencies maintained by this Trip.
    *
    * @returns {Array<Currency>} An Array<Currency> containing all the Currenceis that are maintained by this Trip.
    */
    get currencies() : Array<Currency>
    {
        return Array.from(this.currencyMap.values());
    }
    
    set currencies(newCurrencies : Array<Currency>)
    {
        let newCurrencyMap = new Map<string, Currency>();
        
        for (let currency of newCurrencies)
        {
            newCurrencyMap.set(currency.name, currency);
        }
        
        this.currencyMap = newCurrencyMap;
    }
    
    /**
    * Get or set a Map of Currencies maintained by this Trip, where the keys are the names of the Currencies and the values are the Currencys instances.
    *
    * @returns {Map<string, Currency>} A Map<string, Currency> containing all the Currencies maintained by this Trip.
    */
    get currencyMap() : Map<string, Currency>
    {
        return this._currencies;
    }
    
    set currencyMap(newCurrencyMap : Map<string, Currency>)
    {
        this._currencies = newCurrencyMap;
    }
    
    /**
    * Get or set a list of IExpenses that are maintained by this Trip.
    *
    * @returns {Array<IExpense>} An Array<IExpense> of IExpenses that are maintained by this Trip.
    */
    get expenses() : Array<IExpense>
    {
        return Array.from(this.expenseMap.values());
    }
    
    set expenses(newExpenses : Array<IExpense>)
    {
        let newExpenseMap = new Map<number, IExpense>();
        
        for (let expense of newExpenses)
        {
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
    get expenseMap() : Map<number, IExpense>
    {
        return this._expenses;
    }
    
    set expenseMap(newExpenses : Map<number, IExpense>)
    {
        this._expenses = newExpenses;
    }
    
    /**
    * Get or set a list of participants that participate to this Trip.
    *
    * @returns {Array<Person>} An Array<Person> of participants that participate to this Trip.
    */
    get participants() : Array<Person>
    {
        return Array.from(this.participantMap.values());
    }
    
    set participants(newParticipants : Array<Person>)
    {
        let newParticipantsMap = new Map<number, Person>();
        
        for (let participant of newParticipants)
        {
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
    get participantMap() : Map<number, Person>
    {
        return this._participants;
    }
    
    set participantMap(newParticipants : Map<number, Person>)
    {
        this._participants = newParticipants;
    }
    
    /**
    * Get or set the date of this Trip.
    *
    * @returns {Date} The date of this Trip.
    */
    get date() : Date
    {
        return this._date;
    }
    
    set date(newDate : Date)
    {
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
    addParticipant(newParticipant : Person) : Person
    {
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
    removeParticipant(participant : Person) : number
    {
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
    addExpense(newExpense : IExpense) : IExpense
    {
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
    removeExpense(expense : IExpense) : number
    {
        this.expenseMap.delete(expense.id);
        return this.expenseMap.size;
    }
    
    /**
    * Add a new Currency to this Trip.
    *
    * @param {Currency} newCurrency - The Currency that should be added to this Trip.
    *
    * @returns {Currency} The newly added Currency.
    */
    addCurrency(newCurrency : Currency) : Currency
    {
        this.currencyMap.set(newCurrency.name, newCurrency);
        return newCurrency;
    }
    
    /**
    * Remove a Currency from this Trip.
    *
    * @param {Currency} currency - The Currency that should be removed from this Trip;
    *
    * @returns {number} The amount of Currencies maintained by this Trip after removal.
    */
    removeCurrency(currency : Currency) : number
    {
        this.currencyMap.delete(currency.name);
        return this.currencyMap.size;
    }
}