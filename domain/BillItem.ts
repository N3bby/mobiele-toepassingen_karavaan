import { Person } from './Person';

export class BillItem
{
    _id: number;
    _debtor: Person;
    _amount: number;
    
    constructor(id : number = -1, debtor : Person = new Person(), amount : number = 0)
    {
        this.id = id;
        this.debtor = debtor;
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
    
    get amount() : number
    {
        return this._amount;
    }
    
    set amount(newAmount : number)
    {
        this._amount = newAmount;
    }
    
}