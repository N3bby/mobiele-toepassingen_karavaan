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

        this.addToMap(mockMap, "AUD", 1.5358);
        this.addToMap(mockMap, "BGN", 1.9558);
        this.addToMap(mockMap, "BRL", 3.9063);
        this.addToMap(mockMap, "CAD", 1.5289);
        this.addToMap(mockMap, "CHF", 1.168);
        this.addToMap(mockMap, "CNY", 7.8549);
        this.addToMap(mockMap, "CZK", 25.381);
        this.addToMap(mockMap, "DKK", 7.4444);
        this.addToMap(mockMap, "GBP", 0.87038);
        this.addToMap(mockMap, "HKD", 9.6996);
        this.addToMap(mockMap, "HRK", 7.4245);
        this.addToMap(mockMap, "HUF", 309.35);
        this.addToMap(mockMap, "IDR", 16493.0);
        this.addToMap(mockMap, "ILS", 4.2229);
        this.addToMap(mockMap, "INR", 78.865);
        this.addToMap(mockMap, "JPY", 135.12);
        this.addToMap(mockMap, "KRW", 1314.4);
        this.addToMap(mockMap, "MXN", 22.881);
        this.addToMap(mockMap, "MYR", 4.8207);
        this.addToMap(mockMap, "NOK", 9.5858);
        this.addToMap(mockMap, "NZD", 1.6823);
        this.addToMap(mockMap, "PHP", 63.189);
        this.addToMap(mockMap, "PLN", 4.1469);
        this.addToMap(mockMap, "RON", 4.6693);
        this.addToMap(mockMap, "RUB", 69.282);
        this.addToMap(mockMap, "SEK", 9.8188);
        this.addToMap(mockMap, "SGD", 1.6202);
        this.addToMap(mockMap, "THB", 38.983);
        this.addToMap(mockMap, "TRY", 4.641);
        this.addToMap(mockMap, "USD", 1.2407);
        this.addToMap(mockMap, "ZAR", 14.761);

        return mockMap;
    }

    addToMap(map, name, rate) {
        map.set(name, new Currency_1.Currency(name, rate));
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
