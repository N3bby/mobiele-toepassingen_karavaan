import { IExpense } from './IExpense';
import { ExpenseType } from './ExpenseType';
import { Currency } from './Currency';
import { Payment } from './Payment';
import { Debt } from './Debt';
import { Person } from './Person';
import { BillItem } from './BillItem';
import { IExpenseDO } from './IExpenseDO';

export class ShareExpense implements IExpense
{
    id : number;
    readonly expenseType = ExpenseType.ShareExpense;
    
    category : string;
    description : string;
    expenseAmount : number;
    currency : Currency;
    
    payments : Map<number, Payment>;
    debts : Map<number, Debt>;
    
    private idCounter = 0;
    
    constructor(id : number = -1, expenseAmount : number = 100, category : string, description : string = "A new SharedExpense where participants enter their own debts.")
    {
        this.id = id;
        this.expenseAmount = expenseAmount;
        this.category = category;
        this.description = description;
        
        this.payments = new Map<number, Payment>();
        this.debts = new Map<number, Debt>();
    }
    
    get expenseUnpaid() : number 
    {
        let amountToPay = this.expenseAmount;
        
        for (let payment of this.payments.values())
        {
            amountToPay -= payment.amount;
        }
        
        return amountToPay;
    }
    
    get expensePaid() : number
    {
        return this.expenseAmount - this.expenseUnpaid;
    }
    
    get amountPaid() : number
    {
        let amountAlreadyPaid = 0;
        
        for (let debt of this.debts.values())
        {
            amountAlreadyPaid += debt.amount;
        }
        
        return amountAlreadyPaid;
    }
    
    get amountUnpaid() : number
    {
        return this.expenseAmount - this.amountPaid;
    }
    
    get participants() : Array<Person>
    {
        let participantSet = new Set<Person>();
        
        for (let payment of this.payments.values())
        {
            participantSet.add(payment.creditor);
        }
        
        for (let debt of this.debts.values())
        {
            participantSet.add(debt.debtor);
        }
        
        return Array.from(participantSet);
    }
    
    get participantMap() : Map<number, Person>
    {
        let newParticipantMap = new Map<number, Person>();
        
        for (let participant of this.participants)
        {
            newParticipantMap.set(participant.id, participant);
        }
        
        return newParticipantMap;
    }
    
    addParticipant(newParticipant : Person)
    {
        throw new Error('Adding participants to a ShareExpense is not supported. Add debts instead.')
    }
    
    removeParticipant(participantId : number) : number
    {
        throw new Error('Removing participants from a ShareExpense is not supported. Remove participants instead.')
    }
    
    addPayment(newPayment : Payment) : number
    {
        if (newPayment.id < 0) newPayment.id = this.idCounter++;
        
        if (this.expensePaid + newPayment.amount > this.expenseAmount)
        {
            throw new Error("Can not pay more than the total price of the expense.");
        }
        
        this.payments.set(newPayment.id, newPayment);
        
        return newPayment.id;
    }
    
    removePayment(paymentId : number) : number
    {
        this.payments.delete(paymentId);
        return this.payments.size;
    }
    
    addDebt(newDebt : Debt) : number
    {
        if (newDebt.id < 0) newDebt.id = this.idCounter++;
        this.debts.set(newDebt.id, newDebt);
        return newDebt.id;
    }
    
    removeDebt(debtId : number) : number
    {
        this.debts.delete(debtId);
        return this.debts.size;
    }
    
    get unfilteredDebts() : Map<number, Debt>
    {
        return this.debts;
    }
    
    addBillItem(billItem : BillItem) : number
    {
        throw new Error("Adding BillItems is not supported by ShareExpense.");
    }
    
    removeBillItem(billItemId : number) : number
    {
        throw new Error('Removing BillItems is not supported by ShareExpense.');
    }
    
    get billItems() : Map<number, BillItem>
    {
        throw new Error("BillItems are not supported by ShareExpense.");
    }
    
    get creditors() : Array<Person>
    {
        let creditorSet = new Set<Person>();
        
        for (let payment of this.payments.values())
        {
             creditorSet.add(payment.creditor);
        }
        
        return Array.from(creditorSet);
    }
    
    get debtors() : Array<Person>
    {
        let debtorSet = new Set<Person>();
        
        for (let debt of this.debts.values())
        {
            debtorSet.add(debt.debtor);
        }
        
        return Array.from(debtorSet);
    }
    
    get debtByDebtor() : Map<Person, number>
    {
        let debtMap = new Map<Person, number>();
        
        for (let debt of this.debts.values())
        {
            if (debtMap.has(debt.debtor))
            {
                let newAmount = debtMap.get(debt.debtor) + debt.amount;
                debtMap.set(debt.debtor, newAmount);
            }
            else debtMap.set(debt.debtor, debt.amount);
        }
        
        return debtMap;
    }
    
    get creditByCreditor() : Map<Person, number>
    {
        let creditMap = new Map<Person, number>();
        
        for (let payment of this.payments.values())
        {
            if (creditMap.has(payment.creditor))
            {
                let newAmount = creditMap.get(payment.creditor) + payment.amount;
                creditMap.set(payment.creditor, newAmount);
            }
            else creditMap.set(payment.creditor, payment.amount);
        }
        
        return creditMap;
    }
    
    toDataObject() : IExpenseDO
    {
        let newDO = new IExpenseDO();
        
        newDO.id = this.id;
        newDO.idCounter = this.idCounter;
        newDO.expenseType = this.expenseType;
        newDO.category = this.category;
        newDO.description = this.description;
        newDO.expenseAmount = this.expenseAmount;
        newDO.currency = this.currency;
        newDO.payments = Array.from(this.payments.values()); 
        newDO.debts = Array.from(this.debts.values());
        
        return newDO;
    }
    
}