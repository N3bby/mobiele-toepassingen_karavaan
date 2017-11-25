/**
* A Person is a class that holds information about a participant to a Trip.  
* For example, a Person can be added as a participant to IExpenses, as a creditor or as a debtor.
*/
export class Person {

    private _id : number;
    
    private _lastName : string;
    private _firstName : string;

    /**
    * Initialise a new Person.
    *
    * @param {number} [id=-1] - The ID of the new Person.
    * @param {string} [firstName=""] - The first name of the new Person.
    * @param {string} [lastName=""] - The last name of the new Person.
    *
    * @class Person
    */
    constructor(id : number = -1, firstName : string = "", lastName : string = "")
    {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    
    /**
    * Get or set the ID of the Person.
    *
    * @returns {number} The ID of the Person.
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
    * Get or set the first name of the Person.
    *
    * @returns {string} The first name of the Person.
    */
    get firstName() : string
    {
        return this._firstName;
    }
    
    set firstName(newFirstName : string)
    {
        this._firstName = newFirstName;
    }
    
    /**
    * Get or set the last name of the Person.
    *
    * @returns {string} The last name of the Person.
    */
    get lastName() : string
    {
        return this._lastName;
    }
    
    set lastName(newLastName : string)
    {
        this._lastName = newLastName;
    }
    
    /**
    * Get the full name of the Person, created from the firstName and lastName members.
    *
    * @returns {string} The full name of the Person.
    */
    get name() : string
    {
        return this.firstName + " " + this.lastName;
    }
}