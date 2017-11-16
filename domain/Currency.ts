/**
* Currency class. 
*
* This class will be used to hold individual currency information.
*/
export class Currency 
{
    private _name : string;
    private _rateComparedToEUR : number; 

    /**
    * @constructs Currency
    * @param {string} name - The name of the currency in ISO 4217 format.
    * @param {number} rateComparedToEUR - The rate of the currency compared to EUR.
    */
    constructor(name : string = "EUR", rateComparedToEUR : number = 1)
    {
        this.name = name;
        this.rateComparedToEUR = rateComparedToEUR;
    }
    
    /**
    * Get the name of the currency.
    * @returns {number} The name of the currency.
    */
    get name() : string
    {
        return this._name;
    }
    
    /**
    * Set the name of the currency.
    * @param {string} name - The name to set the currency to.
    */
    set name(name : string)
    {
        this._name = name;
    }
    
    /**
    * Set the rate of the currency compared to EUR.
    * @param {number} rate - The rate of the currency compared to EUR.
    */
    set rateComparedToEUR(rate : number)
    {
        this._rateComparedToEUR = rate;
    }

    /**
    * Get the rate of the currency compared to EUR.
    * @returns {number} The rate of the currency compared to EUR.
    */
    get rateComparedToEUR() : number
    {
        return this._rateComparedToEUR;
    }
}