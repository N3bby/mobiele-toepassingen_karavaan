

export class Currency {
    private name:string;
    private rateComparedToUSD:number
    private currency:Currency;

    constructor(name:string,rateComparedToUSD:number){
        this.name=name;
        this.rateComparedToUSD=rateComparedToUSD;
    }

    Currency(currency:Currency){
        this.currency=currency;
    }

    getCurrency():Currency{
        return this.currency;
    }

    getName():string{
        return name;
    }

    getRateComparedToUSD():number{
        return this.rateComparedToUSD;
    }
}