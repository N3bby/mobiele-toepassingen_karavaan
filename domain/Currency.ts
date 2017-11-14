export class Currency 
{
    private _name : string;
    private _rateComparedToUSD : number; 

    constructor(name : string, rateComparedToUSD : number)
    {
        this.name = name;
        this.rateComparedToUSD = rateComparedToUSD;
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
    * Set the rate of the currency compared to USD.
    * @param {number} rate - The rate of the currency compared to USD.
    */
    set rateComparedToUSD(rate : number)
    {
        this._rateComparedToUSD = rate;
    }

    /**
    * Get the rate of the currency compared to USD.
    * @returns {number} The rate of the currency compared to USD.
    */
    get rateComparedToUSD() : number
    {
        return this._rateComparedToUSD;
    }
}