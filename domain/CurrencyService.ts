import { Currency } from './Currency';
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';

export class CurrencyService
{
    private _currencies : Map<string, Currency>;
    readonly apiUrl : string = "https://api.fixer.io/latest";
    
    constructor()
    {
        this.currencies = new Map<string, Currency>();
    }
    
    get currencies() : Map<string, Currency>
    {
        return this._currencies;
    }
    
    set currencies(newCurrencyMap : Map<string, Currency>)
    {
        this._currencies = newCurrencyMap;
    }
    
    // Methods
    
    addCurrency(newCurrency : Currency) : Currency
    {
        this.currencies.set(newCurrency.name, newCurrency);
        return newCurrency;
    }
    
    getMockData() : Map<string, Currency>
    {
        let mockMap = new Map<string, Currency>();
        
        mockMap.set("EUR", new Currency("EUR", 1));
        mockMap.set("USD", new Currency("USD", 1.184));
        mockMap.set("AUD", new Currency("AUD", 1.5582));
        mockMap.set("GBP", new Currency("GBP", 0.8991));
        
        if (this.currencies.size > mockMap.size) return this.currencies;
        return mockMap;
    }
    
    pullCurrencies() : Map<string, Currency>
    {
        axios.get(this.apiUrl)
        .then( (response) => {
            
            console.log(response);
            
            let mockMap = new Map<string, Currency>();
            
            
            for (let key in response.data.rates)
            {
                console.log(key);
                let newCurrency = new Currency(key, response.data.rates[key]);
                mockMap.set(newCurrency.name, newCurrency);
            }
            
            mockMap.set("EUR", new Currency("EUR", 1));
            
            this.currencies = mockMap;
        })
        .catch( (error) => {
            this.currencies = this.getMockData();
        });
        
        return this.currencies;
    }
    
}