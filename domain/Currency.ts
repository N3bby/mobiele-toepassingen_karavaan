/**
* Currency class. 
* This class will be used to hold individual currency information.  
* A Currency consists of a name and its rate compared to the EUR.
*/
export class Currency 
{
    name : string;
    rateComparedToEUR : number; 

    /**
    * Initialize a new Currency.
    * 
    * @class Currency
    * @param {string} name - The name of the currency in ISO 4217 format.
    * @param {number} rateComparedToEUR - The rate of the currency compared to EUR.
    */
    constructor(name : string = "EUR", rateComparedToEUR : number = 1)
    {
        this.name = name;
        this.rateComparedToEUR = rateComparedToEUR;
    }
}