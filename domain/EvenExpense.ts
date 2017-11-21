import { IExpense } from './IExpense';
import { Debt } from './Debt';
import { Payment } from './Payment';
import { BillItem } from './BillItem';
import { Person } from './Person';
import { Currency } from './Currency';
import { Expenses } from './Expenses';

/**
* An EvenExpense is an expense where the debt gets evenly divided by participant.
* First, the total expenseAmount needs to be set, then it is possible to add payments and after that it is possible to add participants for debt calculation.
*/
export class EvenExpense implements IExpense
{
    readonly expenseType = Expenses.EvenExpense;
    
    private _id : number;
    private _category : string;
    private _description : string;
    private _expenseAmount : number;
    private _currency : Currency;
    
    private _payments : Map<number, Payment>;
    private _debts : Map<number, Debt>;
    
    private idCounter = 0;
    
    constructor(id : number = -1, expenseAmount : number = 100, category : string = "category", description : string = "New Evenly divided Expense.")
    {
        this.currency = new Currency("EUR", 1);
        this._payments = new Map<number, Payment>();
        this._debts = new Map<number, Debt>();
        
        this.id = id;
        this.expenseAmount = expenseAmount;
        this.category = category;
        this.description = description;
    }
    
    get id() : number
    {
        return this._id;
    }
    
    set id(newId : number)
    {
        this._id = newId;
    }
    
    get category() : string
    {
        return this._category;
    }
    
    set category(newCategory : string)
    {
        this._category = newCategory;
    }
    
    get description() : string
    {
        return this._description;
    }
    
    set description(newDescription : string)
    {
        this._description = newDescription;
    }
    
    get expenseAmount() : number
    {
        return this._expenseAmount;
    }
    
    set expenseAmount(newExpenseAmount : number)
    {
        this._expenseAmount = newExpenseAmount;
        this.recalculateDividedDebt();
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
    
    get amountUnpaid() : number
    {
        return this.expenseAmount - this.amountPaid;
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
    
    get currency() : Currency
    {
        return this._currency;
    }
    
    set currency(newCurrency : Currency)
    {
        this._currency = newCurrency;
    }
    
    /**
    * Get a list of participants for this expense. This list includes creditors and debtors.
    */
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
    
    /**
    * Add a participant to the expense. Under the hood, this will add a new debt and evenly distribute the amountUnpaid.
    */
    addParticipant(newParticipant : Person)
    {
        if (!(this.participants.indexOf(newParticipant) > -1))
        {
            let newDebt = new Debt(this.idCounter++, newParticipant);
            this.debts.set(newDebt.id, newDebt);
            this.recalculateDividedDebt();
        }
    }
    
    private recalculateDividedDebt()
    {
        if (this._payments.size > 0)
        {
            let newDebts = new Map<number, Debt>();


            // Add debts for all payments
            for (let payment of this.payments.values())
            {
                let paidPercentage = payment.amount / this.expensePaid;

                // Calculate new Debt for payment for all participants based on paidPercentage
                for (let participant of this.participants)
                {
                    let amountPerParticipant = this.expensePaid / this.participants.length;
                    let amountPerParticipantForThisPayment = amountPerParticipant * paidPercentage;
                    let debtDescription = participant.firstName + " owes " + payment.creditor.firstName + " " + amountPerParticipantForThisPayment.toFixed(2) + "% of total payment of " + this.expensePaid + ".";
                    let newDebt = new Debt(this.idCounter++, participant, payment.creditor, amountPerParticipantForThisPayment, debtDescription);
                    newDebts.set(newDebt.id, newDebt);
                }
            }

            // Remove debts that creditors owe to themselves
            for (let debtId of newDebts.keys())
            {
                let currentDebt = newDebts.get(debtId);
                if (currentDebt.creditor == currentDebt.debtor) newDebts.delete(debtId);
            }

            // Subtract debts that cancel eachother out
            for (let debtId of newDebts.keys())
            {
                let currentDebt = newDebts.get(debtId);

                for (let otherDebtId of newDebts.keys())
                {
                    let otherDebt = newDebts.get(otherDebtId);

                    if (currentDebt.creditor === otherDebt.debtor)
                    {
                        if (currentDebt.amount > otherDebt.amount)
                        {
                            let newAmount = currentDebt.amount - otherDebt.amount;
                            currentDebt.amount = newAmount;
                            currentDebt.description = currentDebt.debtor.firstName + " owes " + currentDebt.creditor.firstName + " " + newAmount.toFixed(2) + " of " + this.expenseAmount + ".";
                            newDebts.delete(otherDebt.id);
                        }
                        if (currentDebt.amount === otherDebt.amount)
                        {
                            newDebts.delete(currentDebt.id);
                            newDebts.delete(otherDebt.id);
                        }
                    }
                }

            }

            this._debts = newDebts;
        }
    }
    
    /**
    * Remove a participant from the list of debtors. Removing a participant that paid does not work with this method, use removePayment first.
    */
    removeParticipant(participant : Person)
    {
        for (let debtId of this.debts.keys())
        {
            let currentDebt = this.debts.get(debtId);
            if (currentDebt.debtor == participant) this.debts.delete(debtId);
        }
        
        this.recalculateDividedDebt();
    }
    
    get payments() : Map<number, Payment>
    {
        return this._payments;
    }
    
    /**
    * Add a payment. Debt gets recalculated.
    */
    addPayment(newPayment : Payment) : number
    {
        if (newPayment.id < 0) newPayment.id = this.idCounter++;
        
        if (this.expensePaid + newPayment.amount > this.expenseAmount)
        {
            throw new Error("Can not pay more than the total price of the expense.");
        }
        
        this.payments.set(newPayment.id, newPayment);
        this.recalculateDividedDebt();
        
        return newPayment.id;
    }
    
    /**
    * Remove a payment. Debt gets recalculated.
    */
    removePayment(paymentId : number)
    {
        this.payments.delete(paymentId);
    }
    
    addDebt(newDebt : Debt) : number
    {
        throw new Error("EvenExpense does not support adding debts, add participants or payments instead.");
    }
    
    removeDebt(debtId : number)
    {
        throw new Error("EvenExpense does not support removing debts, remove participants or payments instead.")
    }
    
    
    addBillItem(billItem : BillItem) : number
    {
        throw new Error("EvenExpense does not support adding billItems.");
    }
    
    removeBillItem(billItemId : number)
    {
        throw new Error("EvenExpense does not support removing billItems.");
    }
    
    get debts() : Map<number, Debt>
    {
        return this._debts;
    }
    
    get billItems() : Map<number, BillItem>
    {
        throw new Error("EvenExpense does not support billItems.");
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
        
        /**
        * Add whatever the creditor paid already.
        */ 
        for (let debt of this.debts.values())
        {
            if (creditMap.has(debt.creditor))
            {
                let newAmount = creditMap.get(debt.creditor) + debt.amount;
                creditMap.set(debt.creditor, newAmount);
            }
            else creditMap.set(debt.creditor, debt.amount);
        }
        
        return creditMap;
    }
}