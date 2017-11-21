import { BillItem } from './BillItem';
import { Payment } from './Payment';
import { Debt } from './Debt';
import { Person } from './Person';
import { Currency } from './Currency';
import { Expenses } from './Expenses';

/**
* An Expense is an object that holds information about a certain bill to a thrid party.
* Contained in this information is who paid to the third party (creditors) and who needs to redeem the creditors (debtors).
*/
export interface IExpense
{
    /**
    * The id of the expense.
    */
    id : number;
    
    /**
    *
    */
    readonly expenseType : Expenses;
    
    /**
    * Category of the expense.
    */
    category : string;
    
    /**
    * Description of the expense.
    */
    description : string;
    
    /**
    * The total price for the expense, e.g. what needs to be payed in total to the thrid party.
    */
    expenseAmount : number;
    
    /**
    * The total amount still to be paid to the third party.
    */
    expenseUnpaid : number;
    
    /**
    * The total amound already paid to the third party.
    */
    expensePaid : number;
    
    /**
    * The total amount still to be paid to the creditors.
    */
    amountUnpaid : number;
    
    /**
    * The total amount already paid to the creditors.
    */
    amountPaid : number;
    
    /**
    * The currency associated with this expense.
    */
    currency : Currency;
    
    /**
    * List of all participants for this expense.
    */
    participants : Array<Person>;
    
    /**
    * Adds a new participant to this expense.
    */
    addParticipant(newParticipant : Person);
    
    /**
    * Removes a participant to this expense.
    */
    removeParticipant(participant : Person);
    
    /**
    * Add a payment to this expense.
    */
    addPayment(newPayment : Payment) : number;
    
    /**
    * Add a debt to this expense.
    */
    addDebt(newDebt : Debt) : number;
    
    /**
    * Add a billItem to this expense.
    */
    addBillItem(newBillItem : BillItem) : number;
    
    /**
    * Remove a payment from this expense.
    */
    removePayment(paymentId : number);
    
    /**
    * Remove a debt from this expense.
    */
    removeDebt(debtId : number);
    
    /**
    * Remove a billItem from this expense.
    */
    removeBillItem(billItemId : number);
    
    /**
    * Map containing all payments already done to this expense.
    */
    payments : Map<number, Payment>;
    
    /**
    * Map containing all debts for this expense.
    */
    debts : Map<number, Debt>;
    
    /**
    * Map containgin all billItems for this expense.
    */
    billItems : Map<number, BillItem>;
    
    /**
    * List of people who paid to the third party. (creditors)
    */
    creditors : Array<Person>;
    
    /**
    * List of people who are in debt to the creditors.
    */
    debtors : Array<Person>;
    
    /**
    * A list of all the total debt categorized by the debtor.
    */
    debtByDebtor : Map<Person, number>;
    
    /**
    * A list of all the total amount paid to the third party categorized the creditors.
    */
    creditByCreditor : Map<Person, number>;
}