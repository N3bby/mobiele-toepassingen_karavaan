import { Person } from './Person';

export class Debt
{
    private _id : number;
    private _debtor : Person;
    private _creditor : Person;
    private _amount : number;
    private _description : string;
    
    constructor(id : number, debtor : Person, creditor : Person, amount : number, description : string)
    {
        this.id = id;
        this.debtor = debtor;
        this.creditor = creditor;
        this.amount = amount;
    }
    
    get id() : number
    {
        return this._id;
    }
    
    set id(newId : number)
    {
        this._id = newId;
    }
    
    get debtor() : Person
    {
        return this._debtor;
    }
    
    set debtor(newDebtor : Person) 
    {
        this._debtor = newDebtor;
    }
    
    get creditor() : Person
    {
        return this._creditor;
    }
    
    set creditor(newCreditor : Person)
    {
        this._creditor = newCreditor;
    }
    
    get amount() : number
    {
        return this._amount;
    }
    
    set amount(newAmount : number)
    {
        this._amount = newAmount;
    }
    
    get description() : string
    {
        return this._description;
    }
    
    set description(newDescription : string)
    {
        this._description = newDescription;
    }
}