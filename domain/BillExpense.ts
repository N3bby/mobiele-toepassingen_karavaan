import { IExpense } from './IExpense';
import { ExpenseType } from './ExpenseType';
import { Currency } from './Currency';
import { Person } from './Person';
import { Payment } from './Payment';
import { Debt } from './Debt';
import { BillItem } from './BillItem';

export class BillExpense implements IExpense
{
    public id; 
    readonly expenseType : ExpenseType;
    
    category : string;
    description : string;
    expenseAmount : number;
    currency : Currency;
    
    payments : Map<number, Payment>;
    billItems : Map<number, BillItem>;
    
    private idCounter = 0;
    
    constructor(id : number = -1, expenseAmount : number = 100, category : string = "category", description : string = "New split by BillItem Expense.")
    {
        this.id = id; 
        this.expenseAmount = expenseAmount;
        this.category = category; 
        this.description = description;
        
        this.payments = new Map<number, Payment>();
        this.billItems = new Map<number, BillItem>();
        
        this.currency = new Currency("EUR", 1);
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
        
        for (let debt of this.unfilteredDebts.values())
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
        
        for (let billItem of this.billItems.values())
        {
            if (typeof billItem.debtor != 'undefined' ) participantSet.add(billItem.debtor);
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
        throw new Error('Adding participants to a BillExpense is not supported. Add Payments or assign persons to BillItems instead.');
    }
    
    removeParticipant(participantId : number) : number
    {
        throw new Error('Removing participants from a BillExpense is not supported. Remove Payments or debtors from Billitems instead.');
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
        throw new Error('BillExpense does not support adding debts, assign debtors to BillItems instead.');
    }
    
    removeDebt(debtId : number) : number
    {
        throw new Error('BillExpense does not support removing detbs, remove debtors from BillItems instead.');
    }
    
    addBillItem(billItem : BillItem) : number
    {
        if (billItem.id < 0) billItem.id = this.idCounter++;
        
        this.billItems.set(billItem.id, billItem);
        
        return billItem.id;
    }
    
    removeBillItem(billItemId : number) : number
    {
        this.billItems.delete(billItemId);
        return this.billItems.size;
    }
    
    get debts() : Map<number, Debt>
    {
        let newDebtMap = new Map<number, Debt>();
        
        for (let debt of this.unfilteredDebts.values())
        {
            newDebtMap.set(debt.id, debt);
        }
        
        for (let creditor of this.creditByCreditor.keys())
        {
            // Filter out debts that creditors owe to themselves
            for (let debtId of newDebtMap.keys())
            {
                let currentDebt = newDebtMap.get(debtId);
                if (currentDebt.debtor == creditor) newDebtMap.delete(debtId);
            }
        }
        
        // Subtract debts that cancel eachother out
        for (let debtId of newDebtMap.keys())
        {
            let currentDebt = newDebtMap.get(debtId);
            
            for (let otherDebtId of newDebtMap.keys())
            {
                let otherDebt = newDebtMap.get(otherDebtId);
                
                if (currentDebt.creditor == otherDebt.debtor)
                {
                    if (currentDebt.amount > otherDebt.amount)
                    {
                        let newAmount = currentDebt.amount - otherDebt.amount;
                        currentDebt.amount = newAmount;
                        currentDebt.description = currentDebt.debtor.firstName + "owes " + currentDebt.creditor.firstName + " " + currentDebt.amount + " " + this.currency.name;
                        newDebtMap.delete(otherDebtId);
                    }
                    if (currentDebt.amount == otherDebt.amount)
                    {
                        newDebtMap.delete(debtId);
                        newDebtMap.delete(otherDebtId);
                    }
                }
            }
        }
        
        return newDebtMap;
    }
    
    get unfilteredDebts() : Map<number, Debt>
    {
        let newDebtMap = new Map<number, Debt>();
        
        // Calculate the percentage paid by each creditor
        for (let creditor of this.creditByCreditor.keys())
        {
            let paidPercentage = this.creditByCreditor.get(creditor) / this.expenseAmount;
            
            for (let debtor of this.debtByDebtor.keys())
            {
                let amountToPay = this.debtByDebtor.get(debtor) * paidPercentage;
                let description = debtor.firstName + " owes " + creditor.firstName + " " + amountToPay + " " + this.currency.name;
                let newDebt = new Debt(this.idCounter++, debtor, creditor, amountToPay, description);
                newDebtMap.set(newDebt.id, newDebt);
            }
        }
        
        return newDebtMap;
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
        
        for (let billItem of this.billItems.values())
        {
            if (debtMap.has(billItem.debtor)) 
            {
                let newAmount = debtMap.get(billItem.debtor) + billItem.amount;
                debtMap.set(billItem.debtor, newAmount);
            }
            else debtMap.set(billItem.debtor, billItem.amount);
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
    
}