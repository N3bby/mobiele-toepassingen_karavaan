import { Person } from './Person';

export class Debt
{
    private _id : number;
    private _debtor : Person;
    private _creditor : Person;
    private _amount : number;
    private _description : string;
    private _isPaid : boolean;
    
    constructor(id : number = -1, debtor : Person = new Person(), creditor : Person = new Person(), amount : number = 0, description : string = "New Debt.", isPaid : boolean = false)
    {
        this.id = id;
        this.debtor = debtor;
        this.creditor = creditor;
        this.amount = amount;
        this.description = description;
        this.isPaid = isPaid;
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
    
    get isPaid() : boolean
    {
        return this._isPaid;
    }
    
    set isPaid(newPaidState : boolean)
    {
        this._isPaid = newPaidState;
    }
}