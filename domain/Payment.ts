import { Person } from './Person';
/**
* A Payment is an object that stores information about a payment that a creditor of an IExpense has done to a thrid party.
*/
export class Payment
{
    private _id : number;
    private _creditor : Person;
    private _amount : number;
    
    /**
    * Initialise a new Payment.
    *
    * @param {number} [id=-1] - The ID of the new Payment.
    * @param {Person} [creditor=new Person()] - The creditor of the new Payment.
    * @param {number} [amount=0] - The amount this creditor has paid to the third party.
    *
    * @class Payment
    */
    constructor(id : number = -1, creditor : Person = new Person(), amount : number = 0)
    {
        this.id = id;
        this.creditor = creditor;
        this.amount = amount;
    }
    
    /**
    * Get or set the ID of the Payment.
    *
    * @returns {number} The ID of the Payment.
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
    * Get or set the creditor of this Payment.
    *
    * @rturns {Person} The creditor of this payment.
    */
    get creditor() : Person
    {
        return this._creditor;
    }
    
    set creditor(newCreditor : Person)
    {
        this._creditor = newCreditor;
    }
    
    /**
    * Get or set the amount that the creditor of this Payment has paid the third party.
    *
    * @returns {number} The amount that the creditor of this Payment has paid the third party.
    */
    get amount() : number
    {
        return this._amount;
    }
    
    set amount(newAmount : number)
    {
        this._amount = newAmount;
    }
}