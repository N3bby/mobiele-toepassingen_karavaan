import { IExpense } from './IExpense';
import { Person } from './Person';
import { Currency } from './Currency';

export class Trip 
{
    private _id : number;
    private _name : string;
    private _description : string;
    private _currencies : Array<Currency>;
    private _expenses : Array<IExpense>;
    private _participants : Array<Person>;
    private _date : Date;
    
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
        this.currencies = new Array<Currency>();
        this.currencies.push(currency);
        this.expenses = expenses;
        this.participants = participants;
    }
    
    get id() : number
    {
        return this._id;
    }
    
    set id(newId : number)
    {
        this._id = newId;
    }
    
    get name() : string
    {
        return this._name;
    }
    
    set name(newName : string)
    {
        this._name = newName;
    }
    
    get description() : string
    {
        return this._description;
    }
    
    set description(newDescription : string)
    {
        this._description = newDescription;
    }
    
    get currencies() : Array<Currency>
    {
        return this._currencies;
    }
    
    set currencies(newCurrencyList : Array<Currency>)
    {
        this._currencies = newCurrencyList;
    }
    
    get expenses() : Array<IExpense>
    {
        return this._expenses;
    }
    
    set expenses(newExpenses : Array<IExpense>)
    {
        this._expenses = newExpenses;
    }
    
    get participants() : Array<Person>
    {
        return this._participants;
    }
    
    set participants(newParticipants : Array<Person>)
    {
        this._participants = newParticipants;
    }
    
    get date() : Date
    {
        return this._date;
    }
    
    set date(newDate : Date)
    {
        this._date = newDate;
    }
    
    // Methods
    
    addParticipant(newParticipant : Person)
    {
        this.participants.push(newParticipant);
    }
    
    addExpense(newExpense : IExpense)
    {
        this.expenses.push(newExpense);
    }
    
    addCurrency(newCurrency : Currency) : Currency
    {
        this.currencies.push(newCurrency);
        return newCurrency;
    }
   
}