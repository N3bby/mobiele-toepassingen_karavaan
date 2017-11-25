"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
* Currency class.
* This class will be used to hold individual currency information.
* A Currency consists of a name and its rate compared to the EUR.
*/
class Currency {
    /**
    * Initialize a new Currency.
    *
    * @class Currency
    * @param {string} name - The name of the currency in ISO 4217 format.
    * @param {number} rateComparedToEUR - The rate of the currency compared to EUR.
    */
    constructor(name = "EUR", rateComparedToEUR = 1) {
        this.name = name;
        this.rateComparedToEUR = rateComparedToEUR;
    }
    /**
    * Get or set the name of the currency.
    * @returns {number} The name of the currency.
    */
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
    set rateComparedToEUR(rate) {
        this._rateComparedToEUR = rate;
    }
    /**
    * Get or set the rate of the currency compared to EUR.
    * @returns {number} The rate of the currency compared to EUR.
    */
    get rateComparedToEUR() {
        return this._rateComparedToEUR;
    }
}
exports.Currency = Currency;
