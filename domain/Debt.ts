import { Person } from './Person';

/**
* A Debt is an object that keeps track of how much a Person owes another Person.  
* A Debt consists of an ID, a debtor, a creditor, an amount, a description and an "isPaid" flag/boolean that conveys if the Debt has been paid or not.
*/
export class Debt
{
    private _id : number;
    private _debtor : Person;
    private _creditor : Person;
    private _amount : number;
    private _description : string;
    private _isPaid : boolean;
    
    /**
    * Initialise a new Debt.
    *
    * @param {number} [id=-1] - The ID of the new Debt.
    * @param {Person} [debtor=new Person()] - The debtor of the Debt. (e.g.: Who needs to pay?)
    * @param {Person} [creditor=new Person()] - The creditor of the Debt. (e.g.: Who needs to be paid?)
    * @param {number} [amount=0] - The amount of the Debt. (e.g.: How much needs to be paid?)
    * @param {string} [description=""] - The description of the Debt. (e.g.: What needs to be paid?)
    * @param {boolean} [isPaid=false] - The boolean to keep track of the "paystate" of the Debt. (e.g.: Has it been paid already?)
    * 
    * @class
    */
    constructor(id : number = -1, debtor : Person = new Person(), creditor : Person = new Person(), amount : number = 0, description : string = "New Debt.", isPaid : boolean = false)
    {
        this.id = id;
        this.debtor = debtor;
        this.creditor = creditor;
        this.amount = amount;
        this.description = description;
        this.isPaid = isPaid;
    }
    
    /**
    * Get the ID of the Debt.
    *
    * @returns {number} The ID of the Debt.
    */
    get id() : number
    {
        return this._id;
    }
    
    /**
    * Set the ID of the Debt.
    *
    * @param {number} newId - The new ID of the Debt.
    */
    set id(newId : number)
    {
        this._id = newId;
    }
    
    /**
    * Get the debtor of the Debt.
    *
    * @returns {Person} The debtor of the Debt.
    */
    get debtor() : Person
    {
        return this._debtor;
    }
    
    /**
    * Set a new debtor for the Debt.
    *
    * @param {Person} newDebtor - The new debtor for the Debt.
    */
    set debtor(newDebtor : Person) 
    {
        this._debtor = newDebtor;
    }
    
    /**
    * Get the creditor of the Debt.
    *
    * @returns {Person} The creditor of the Debt.
    */
    get creditor() : Person
    {
        return this._creditor;
    }
    
    /**
    * Set a new creditor of the Debt.
    *
    * @param {Person} newCreditor - The new creditor of the Debt.
    */
    set creditor(newCreditor : Person)
    {
        this._creditor = newCreditor;
    }
    
    /**
    * Get the amount (price) of the Debt.
    *
    * @returns {number} The amount (price) of the Debt.
    */
    get amount() : number
    {
        return this._amount;
    }
    
    /**
    * Set a new amount (price) for the Debt.
    *
    * @param {number} newAmount - The new amount (price) of the Debt.
    */
    set amount(newAmount : number)
    {
        this._amount = newAmount;
    }
    
    /**
    * Get the description of the Debt.
    *
    * @returns {string} The description of the Debt.
    */
    get description() : string
    {
        return this._description;
    }
    
    /**
    * Set a new description for the Debt.
    *
    * @param {string} newDescription - The new description of the Debt.
    */
    set description(newDescription : string)
    {
        this._description = newDescription;
    }
    
    /**
    * Check if the Debt has been paid.
    *
    * @returns {boolean} The state of payment. (e.g.: Has the debt already been paid, true or false?)
    */
    get isPaid() : boolean
    {
        return this._isPaid;
    }
    
    /**
    * Set a new pay-state for the Debt, true or false.
    *
    * @param {boolean} newPaidState - The new boolean representing the pay-state of the Debt.
    */
    set isPaid(newPaidState : boolean)
    {
        this._isPaid = newPaidState;
    }
}