import { BillItem } from './BillItem';
import { Payment } from './Payment';
import { Debt } from './Debt';
import { Person } from './Person';
import { Currency } from './Currency';
import { ExpenseType } from './ExpenseType';

/**
* An Expense is an object that holds information about a certain bill to a thrid party.
* Contained in this information is who paid to the third party (creditors) and who needs to redeem the creditors (debtors).
*
* @interface IExpense
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
    readonly expenseType : ExpenseType;
    
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
    * Map of all participants for this expense.
    */
    participantMap : Map<number, Person>;
    
    /**
    * Adds a new participant to this expense.
    *
    * @param {Person} newParticipant - The participant that should be added to this IExpense.
    */
    addParticipant(newParticipant : Person);
    
    /**
    * Removes a participant to this expense.
    *
    * @param {number} participantId - The ID of the participant that needs to be removed from this IExpense.
    * @returns {number} The amount of participants participating to this IExpense after removal.
    */
    removeParticipant(participantId : number) : number;
    
    /**
    * Add a payment to this expense.
    *
    * @param {Payment} newPayment - The payment that should be added to this IExpense.
    * @returns {number} newPayment - The ID of the payment that is added.
    */
    addPayment(newPayment : Payment) : number;
    
    /**
    * Add a debt to this expense.
    *
    * @param {Debt} newDebt - Add a new Debt to this IExpense.
    * @returns {number} The ID of the Debt that is added.
    */
    addDebt(newDebt : Debt) : number;
    
    /**
    * Add a billItem to this expense.
    *
    * @param {BillItem} newBillItem - The new BillItem that should be added to this IExpense.
    * @returns {number} The ID of the BillItem that is added.
    */
    addBillItem(newBillItem : BillItem) : number;
    
    /**
    * Remove a payment from this expense.
    *
    * @param {number} paymentId - The ID of the Payment that needs to be removed from this IExpense.
    * @returns {number} The amount of the Payments maintained by this IExpense after removal.
    */
    removePayment(paymentId : number) : number;
    
    /**
    * Remove a debt from this expense.
    *
    * @param {number} debtId - The ID of the Debt that needs to be removed from this IExpense.
    * @returns {number} The amount of Debts maintained by this IExpense after removal.
    */
    removeDebt(debtId : number) : number;
    
    /**
    * Remove a billItem from this expense.
    *
    * @param {number} billItemId - The ID of the BillItem that needs to be removed from this IExpense.
    * @returns {number} The amount of the BillItems that are maintained by this IExpense after removal.
    */
    removeBillItem(billItemId : number) : number;
    
    /**
    * Map containing all payments already done to a thrid party.
    *
    * @returns {Map<number, Payment>} A Map containing all the payments of this IExpense, where the keys are the IDs of the Payments.
    */
    payments : Map<number, Payment>;
    
    /**
    * Map containing all debts for this IExpense, with all illogical debts filtered out (like debts that creditors owe themselves).
    *
    * @returns {Map<number, Debt>} A Map containing all the debts for this IExpense, where the keys are the IDs of the Debts.
    */
    debts : Map<number, Debt>;
    
    /**
    * Map containing all debts for this IExpense.
    *
    * @returns {Map<number, Debt>} A Map containing all the debts for this IExpense, where the keys are the IDs of the Debts.
    */
    unfilteredDebts : Map<number, Debt>;
    
    /**
    * Map containgin all billItems for this IExpense.
    *
    * @returns {Map<number, BillItem} A Map containing all the BillItems for this IExpense, where the keys are the IDs of the BillItems.
    */
    billItems : Map<number, BillItem>;
    
    /**
    * List of people who paid to the third party, and thus own credit. (creditors)
    *
    * @returns {Array<Person>} An Array containing this IExpenses creditors.
    */
    creditors : Array<Person>;
    
    /**
    * List of people who are in debt to the creditors.
    *
    * @returns {Array<Person>} An Array containing this IExpenses debtors.
    */
    debtors : Array<Person>;
    
    /**
    * A list of all the total debt categorized by the debtor.
    *
    * @returns {Map<Person, number>} A Map containing all the debtors of this IExpense, where the keys are the debtors Person instances, and the values are the total amount of their debts.
    */
    debtByDebtor : Map<Person, number>;
    
    /**
    * A list of all the total amount paid to the third party categorized the creditors.
    *
    * @returns {Map<Person, number>} A Map containing all the creditors of this IExpense, where the keys are the creditors Person instances, and the values are the total amount of their payments.
    */
    creditByCreditor : Map<Person, number>;
}