import { Currency } from './Currency';
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';

/**
* A CurrencyService is a class that handles pulling a list of Currencies from a remote rest api.  
* If no response is returned from the remote service, the CurrencyService will return a hard-coded list, or the previously obtained list from the service.
*/
export class CurrencyService
{
    readonly apiUrl : string = "https://api.fixer.io/latest";
    private _currencies : Map<string, Currency>;
    
    /**
    * Initialise a new CurrencyService.
    *
    * @class CurrencySercice;
    */
    constructor() 
    {
        this.currencies = new Map<string, Currency>();
        this.getAllCurrencies();
    }
    
    /**
    * Get or set a Map of Currencies, ordered by their unique name. (e.g. "EUR")
    *
    * @returns {Map<string, Currency>} The latest Map of Currencies.
    */
    get currencies() : Map<string, Currency>
    {
        if (this._currencies.size == 0) this.currencies = this.getMockData();
        return this._currencies;
    }

    set currencies(newCurrencyMap : Map<string, Currency>)
    {
        this._currencies = newCurrencyMap;
    }
    
    /**
    * Return a hard-coded Map of Currencies, for when no response is returned yet.
    *
    * @returns {Map<string, Currency>} A hard-coded Map of Currencies.
    */
    getMockData() : Map<string, Currency>
    {
        let mockMap = new Map<string, Currency>();
        
        mockMap.set("EUR", new Currency("EUR", 1));
        mockMap.set("USD", new Currency("USD", 1.184));
        mockMap.set("AUD", new Currency("AUD", 1.5582));
        mockMap.set("GBP", new Currency("GBP", 0.8991));
        
        return mockMap;
    }
    
    /**
    * Pull a list of Currencies from a remote rest api and convert the response into a Map of Currencies that will be returned.  
    * This method makes use of Promises, so be patient for a result.
    *
    * @returns {Map<string,Currency>} The returned Map of Currencies.
    */
    getAllCurrencies() : Map<string, Currency>
    {
        axios.get(this.apiUrl)
        .then( (response) => {
            
            let mockMap = new Map<string, Currency>();
            
            for (let key in response.data.rates)
            {
                let newCurrency = new Currency(key, response.data.rates[key]);
                mockMap.set(newCurrency.name, newCurrency);
            }
            
            mockMap.set("EUR", new Currency("EUR", 1));
            
            this.currencies = mockMap;
            return mockMap;
        })
        .catch( (error) => {
            this.currencies = this.getMockData();
        });
        
        return this.getMockData();
    }
}