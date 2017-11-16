import { Currency } from './Currency';
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';

export class CurrencyService
{
    readonly apiUrl : string = "https://api.fixer.io/latest";
    private _currencies : Map<string, Currency>;
    
    constructor() 
    {
        this.currencies = new Map<string, Currency>();
        this.getAllCurrencies();
    }
    
    get currencies() : Map<string, Currency>
    {
        return this._currencies;
    }

    set currencies(newCurrencyMap : Map<string, Currency>)
    {
        this._currencies = newCurrencyMap;
    }
    
    getMockData() : Map<string, Currency>
    {
        // It could be that previously pulled data is still in the currency service. Serve that data instead.
        if (this.currencies.size > 0) return this.currencies;
        
        let mockMap = new Map<string, Currency>();
        
        mockMap.set("EUR", new Currency("EUR", 1));
        mockMap.set("USD", new Currency("USD", 1.184));
        mockMap.set("AUD", new Currency("AUD", 1.5582));
        mockMap.set("GBP", new Currency("GBP", 0.8991));
        
        return mockMap;
    }
    
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