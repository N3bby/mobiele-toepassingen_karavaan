import { IExpense } from './IExpense';
import { Debt } from './Debt';
import { Payment } from './Payment';
import { BillItem } from './BillItem';
import { Person } from './Person';
import { Currency } from './Currency';

export class EvenExpense implements IExpense
{
    private _amountUnpaid : number;
    private _currency : Currency;
    private _participants : Array<Person>;
    
    get amountUnpaid() : number
    {
        return this._amountUnpaid;
    }
    
    set amountUnpaid(newAmount : number)
    {
        this._amountUnpaid = newAmount;
    }
    
    get amountPaid() : number
    {
        throw new Error("EvenExpense does not support paid amounts.");
    }
    
    get currency() : Currency
    {
        return this._currency;
    }
    
    set currency(newCurrency : Currency)
    {
        this._currency = newCurrency;
    }
    
    get participants() : Array<Person>
    {
        return this._participants;
    }
    
    set participants(newParticipantList : Array<Person>)
    {
        this._participants = newParticipantList;
    }
    
    addParticipant(newParticipant : Person)
    {
        if (this.participants.indexOf(newParticipant) > -1)
            this.participants.push(newParticipant);
    }
    
    removeParticipant(participant : Person)
    {
        let index = this.participants.indexOf(participant);
        if (index > -1) {
            this.participants.splice(index, 1);
        }
    }
    
    addPayment(newPayment : Payment) : number
    {
        throw new Error("EvenExpense does not support adding payments.");
    }
    
    addDebt(newDebt : Debt) : number
    {
        throw new Error("EvenExpense does not support adding debts. They are calculated for you.");
    }
    
    addBillItem(newBillItem : BillItem) : number
    {
        throw new Error("EvenExpense does not support adding billItems.");
    }
    
    removePayment(paymentId : number)
    {
        throw new Error("EvenExpense does not support removing payments.");
    }
    
    removeDebt(debtId : number)
    {
        throw new Error("EvenExpense does not support removing debts.");
    }
    
    removeBillItem(billItemId : number)
    {
        throw new Error("EvenExpense does not support removing billItems.");
    }
    
    get payments() : Map<number, Payment>
    {
        throw new Error("EvenExpense does not support payments.");
    }
    
    get debts() : Map<number, Debt>
    {
        let debtMap = new Map<number, Debt>();
        let idCounter = 0;
        let debtPerParticipant = this.dividedDebt;
        
        for (let participant of this.participants)
        {
            let newDebt = new Debt(idCounter++, participant, debtPerParticipant, "Evenly divided debt.");
            debtMap.set(newDebt.id, newDebt);
        }
        
        return debtMap;
    }
    
    get dividedDebt() : number
    {
        return this.amountUnpaid / this.participants.length;
    }
    
    get billItems() : Map<number, BillItem>
    {
        throw new Error("EvenExpense does not support adding billItems.");
    }
    
    get creditors() : Array<Person>
    {
        throw new Error("EvenExpense does not support creditors.");
    }
    
    get debtors() : Array<Person>
    {
        return this.participants;
    }
    
    get debtByDebtor() : Map<Person, number>
    {
        let dividedDebt = this.dividedDebt;
        let debtMap = new Map<Person, number>();
        
        for (let participant of this.participants)
        {
            debtMap.set(participant, dividedDebt);
        }
        
        return debtMap;
    }
    
    get creditByCreditors() : Map<Person, number>
    {
        throw new Error("EvenExpense does not support creditors.");
    }
    
    
}