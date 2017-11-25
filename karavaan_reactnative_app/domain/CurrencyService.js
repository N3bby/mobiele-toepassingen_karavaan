"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Currency_1 = require("./Currency");
const axios_1 = require("axios");
/**
* A CurrencyService is a class that handles pulling a list of Currencies from a remote rest api.
* If no response is returned from the remote service, the CurrencyService will return a hard-coded list, or the previously obtained list from the service.
*/
class CurrencyService {
    /**
    * Initialise a new CurrencyService.
    *
    * @class CurrencySercice;
    */
    constructor() {
        this.apiUrl = "https://api.fixer.io/latest";
        this.currencies = new Map();
        this.getAllCurrencies();
    }
    /**
    * Get or set a Map of Currencies, ordered by their unique name. (e.g. "EUR")
    *
    * @returns {Map<string, Currency>} The latest Map of Currencies.
    */
    get currencies() {
        if (this._currencies.size == 0)
            this.currencies = this.getMockData();
        return this._currencies;
    }
    set currencies(newCurrencyMap) {
        this._currencies = newCurrencyMap;
    }
    /**
    * Return a hard-coded Map of Currencies, for when no response is returned yet.
    *
    * @returns {Map<string, Currency>} A hard-coded Map of Currencies.
    */
    getMockData() {
        let mockMap = new Map();
        mockMap.set("EUR", new Currency_1.Currency("EUR", 1));
        mockMap.set("USD", new Currency_1.Currency("USD", 1.184));
        mockMap.set("AUD", new Currency_1.Currency("AUD", 1.5582));
        mockMap.set("GBP", new Currency_1.Currency("GBP", 0.8991));
        return mockMap;
    }
    /**
    * Pull a list of Currencies from a remote rest api and convert the response into a Map of Currencies that will be returned.
    * This method makes use of Promises, so be patient for a result.
    *
    * @returns {Map<string,Currency>} The returned Map of Currencies.
    */
    getAllCurrencies() {
        axios_1.default.get(this.apiUrl)
            .then((response) => {
            let mockMap = new Map();
            for (let key in response.data.rates) {
                let newCurrency = new Currency_1.Currency(key, response.data.rates[key]);
                mockMap.set(newCurrency.name, newCurrency);
            }
            mockMap.set("EUR", new Currency_1.Currency("EUR", 1));
            this.currencies = mockMap;
            return mockMap;
        })
            .catch((error) => {
            this.currencies = this.getMockData();
        });
        return this.getMockData();
    }
}
exports.CurrencyService = CurrencyService;
