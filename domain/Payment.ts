import { Person } from './Person';

export class Payment
{
    private _id : number;
    private _creditor : Person;
    private _amount : number;
    
    constructor(id : number = -1, creditor : Person = new Person(), amount : number = 0)
    {
        this.id = id;
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
}