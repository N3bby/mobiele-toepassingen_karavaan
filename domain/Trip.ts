import { IExpense } from './IExpense';
import { Person } from './Person';
import { Currency } from './Currency';

export class Trip 
{
    private _id : number;
    private _name : string;
    private _description : string;
    private _currencies : Map<string, Currency>;
    private _expenses : Map<number, IExpense>;
    private _participants : Map<number, Person>;
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
        this.addCurrency(currency);
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
                                         
    get currencyMap() : Map<string, Currency>
    {
        return this._currencies;
    }
    
    set currencyMap(newCurrencyMap : Map<string, Currency>)
    {
        this._currencies = newCurrencyMap;
    }
    
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
    
    get expenseMap() : Map<number, IExpense>
    {
        return this._expenses;
    }
    
    set expenseMap(newExpenses : Map<number, IExpense>)
    {
        this._expenses = newExpenses;
    }
    
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
    
    get participantMap() : Map<number, Person>
    {
        return this._participants;
    }
    
    set participantMap(newParticipants : Map<number, Person>)
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
    
    addParticipant(newParticipant : Person) : Person
    {
        this.participantMap.set(newParticipant.id, newParticipant);
        return newParticipant;
    }
    
    removeParticipant(participant : Person) : number
    {
        this.participantMap.delete(participant.id);
        return this.participantMap.size;
    }
    
    addExpense(newExpense : IExpense) : IExpense
    {
        this.expenseMap.set(newExpense.id, newExpense);
        return newExpense;
    }
    
    removeExpense(expense : IExpense) : number
    {
        this.expenseMap.delete(expense.id);
        return this.expenseMap.size;
    }
    
    addCurrency(newCurrency : Currency) : Currency
    {
        this.currencyMap.set(newCurrency.name, newCurrency);
        return newCurrency;
    }
    
    removeCurrency(currency : Currency) : number
    {
        this.currencyMap.delete(currency.name);
        return this.currencyMap.size;
    }
}