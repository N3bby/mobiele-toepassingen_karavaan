import { Expense } from './Expense';
import { Person } from './Person';
import { Currency } from './Currency';

export class Trip 
{
    private _id : number;
    private _name:string;
    private _currencies : Array<Currency>;
    private _expenses : Array<Expense>;
    private _participants : Array<Person>;
    
    constructor(id : number = -1,
                name : string = "",
                currency : Currency = new Currency("EUR", 1),
                expenses : Array<Expense> = new Array<Expense>(),
                participants : Array<Person> = new Array<Person>()
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
    
    get currencies() : Array<Currency>
    {
        return this._currencies;
    }
    
    set currencies(newCurrencyList : Array<Currency>)
    {
        this._currencies = newCurrencyList;
    }
    
    get expenses() : Array<Expense>
    {
        return this._expenses;
    }
    
    set expenses(newExpenses : Array<Expense>)
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
    
    // Methods
    
    addParticipant(newParticipant : Person)
    {
        this.participants.push(newParticipant);
    }
    
    addExpense(newExpense : Expense)
    {
        this.expenses.push(newExpense);
    }
    
    addCurrency(newCurrency : Currency) : Currency
    {
        this.currencies.push(newCurrency);
        return newCurrency;
    }
   
}