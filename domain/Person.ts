export class Person {

    private _id : number;
    
    private _lastName : string;
    private _firstName : string;

    constructor(id : number = -1, firstName : string = "", lastName : string = "")
    {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    
    get id() : number
    {
        return this._id;
    }
    
    set id(newId : number)
    {
        this._id = newId;
    }
    
    get firstName() : string
    {
        return this._firstName;
    }
    
    set firstName(newFirstName : string)
    {
        this._firstName = newFirstName;
    }
    
    get lastName() : string
    {
        return this._lastName;
    }
    
    set lastName(newLastName : string)
    {
        this._lastName = newLastName;
    }
}