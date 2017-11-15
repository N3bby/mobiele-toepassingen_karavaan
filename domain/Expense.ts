import { Person } from './Person';
import { Trip } from './Trip';
import { Currency } from './Currency';

export class Expense
{
    private _id : number = 0;
    private _description : string = "";
    private _expensePerPerson : Map<Person, number>;
    private _payedPerPerson : Map<Person, number>;
    private _category : string;
    private _date : Date;
    private _currency : Currency;

    constructor(id : number = -1, 
                description : string = "No description yet.",
                expensePerPerson : Map<Person, number> = undefined,
                payedPerPerson : Map<Person, number> = undefined,
                category : string = "Expense",
                date : Date = new Date(),
                currency : Currency = new Currency("EUR", 1)
               )
    {
        this.id = id;
        this.description = description;
        this.category = category;
        this.date = date;
        this.currency = currency;
        
        if (typeof expensePerPerson === 'undefined') expensePerPerson = new Map<Person, number>();
        if (typeof payedPerPerson === 'undefined') payedPerPerson = new Map<Person, number>();
        
        this.expensePerPerson = expensePerPerson;
        this.payedPerPerson = payedPerPerson;
    }
                
    get id() : number
    {
        return this._id;
    }
    
    set id(newId : number)
    {
        this._id = newId;
    }
    
    get description() : string
    {
        return this._description;
    }
    
    set description(newDescription : string)
    {
        this._description = newDescription;
    }
    
    get expensePerPerson() : Map<Person, number>
    {
        return this._expensePerPerson;
    }
    
    set expensePerPerson(newExpensePerPerson : Map<Person, number>)
    {
        this._expensePerPerson = newExpensePerPerson;
    }
    
    get payedPerPerson() : Map<Person, number>
    {
        return this._payedPerPerson;
    }
    
    set payedPerPerson(newPayedPerPerson : Map<Person, number>)
    {
        this._payedPerPerson = newPayedPerPerson;
    }
    
    get category() : string
    {
        return this._category;
    }
    
    set category(newCategory : string)
    {
        this._category = newCategory;
    }
    
    get date() : Date
    {
        return this._date;
    }
    
    set date(newDate : Date)
    {
        this._date = newDate;
    }
    
    get currency() : Currency
    {
        return this._currency;
    }
    
    set currency(newCurrency : Currency)
    {
        this._currency = newCurrency;
    }

    // Methods
    
    addDebt(participant : Person, amount : number)
    {
        // If a person has no debt yet, it will be added as a new debt.
        // If a person already has an expense, it will be added to it's amount
        if (typeof this.expensePerPerson.get(participant) === 'undefined')
        {
            this.expensePerPerson.set(participant, amount);
        }
        else
        {
            amount = this.expensePerPerson.get(participant);
            this.expensePerPerson.set(participant, amount);
        }
    }
}
