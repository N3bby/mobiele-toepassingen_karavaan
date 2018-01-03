"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Debt_1 = require("./Debt");
const Currency_1 = require("./Currency");
const ExpenseType_1 = require("./ExpenseType");
const IExpenseDO_1 = require("./IExpenseDO");
/**
* An EvenExpense is an expense where the debt gets evenly divided by participant.
* First, the total expenseAmount needs to be set, then it is possible to add payments and after that it is possible to add participants for debt calculation.
*
* It is not possible to add BillItems to an EvenExpense, only add payments and participants.
* It is not possible to add Debts to an EvenExpense, only add payments and participants.
*/
class EvenExpense {
    /**
    * Initialise a new EvenExpense.
    *
    * @param {number} [id=-1] - The ID of the new EvenExpense.
    * @param {number} [expenseAmount=100] - The expenseAmount of the new EvenExpense.
    * @param {string} [category="category"] - The category of the new EvenExpense.
    * @param {string} [description="New Evenly divided Expense"] - The description of the new EvenExpense.
    *
    * @class EvenExpense
    */
    constructor(id = -1, expenseAmount = 100, category = "category", description = "New Evenly divided Expense.") {
        /**
        * Get the type of this IExpense.
        *
        * @returns {ExpenseType} The type of this IExpense.
        */
        this.expenseType = ExpenseType_1.ExpenseType.EvenExpense;
        this.idCounter = 0;
        this.currency = new Currency_1.Currency("EUR", 1);
        this._payments = new Map();
        this._debts = new Map();
        this.id = id;
        this.expenseAmount = expenseAmount;
        this.category = category;
        this.description = description;
    }
    /**
    * Get or set the ID of the EvenExpense.
    *
    * @returns {number} The ID of the EvenExpense.
    */
    get id() {
        return this._id;
    }
    set id(newId) {
        this._id = newId;
    }
    /**
    * Get or set the category of the EvenExpense.
    *
    * @returns {string} The category of the EvenExpense.
    */
    get category() {
        return this._category;
    }
    set category(newCategory) {
        this._category = newCategory;
    }
    /**
    * Get or set the description of the EvenExpense.
    *
    * @returns {string} The description of the EvenExpense.
    */
    get description() {
        return this._description;
    }
    set description(newDescription) {
        this._description = newDescription;
    }
    /**
    * Get or set the total amount (price) of the EvenExpense. This is the amount that needs to be paid to a third party.
    *
    * @returns {number} The total amount (price) of the EvenExpense.
    */
    get expenseAmount() {
        return this._expenseAmount;
    }
    set expenseAmount(newExpenseAmount) {
        this._expenseAmount = newExpenseAmount;
        this.recalculateDividedDebt();
    }
    /**
    * Get the amount of what has not been paid yet to the third party. This goes down when a new Payment is added.
    *
    * @returns {number} The total amount that still needs to be paid to the third party.
    */
    get expenseUnpaid() {
        let amountToPay = this.expenseAmount;
        for (let payment of this.payments.values()) {
            amountToPay -= payment.amount;
        }
        return amountToPay;
    }
    /**
    * Get the amount of what has already been paid to the third party by creditors. This goes down when a Payment is removed.
    *
    * @returns {number} The total amount that has already been paid to the third party by creditors.
    */
    get expensePaid() {
        return this.expenseAmount - this.expenseUnpaid;
    }
    /**
    * Get the total amount that still needs to be paid to creditors by debtors.
    *
    * @returns {number} The amount that still needs to be paid by creditors.
    */
    get amountUnpaid() {
        return this.expenseAmount - this.amountPaid;
    }
    /**
    * Get the total amount that has already been paid to creditors by debtors.
    *
    * @returns {number} The amount that has already been paid to creditors by debtors.
    */
    get amountPaid() {
        let amountAlreadyPaid = 0;
        for (let debt of this.unfilteredDebts.values()) {
            amountAlreadyPaid += debt.amount;
        }
        return amountAlreadyPaid;
    }
    /**
    * Get or set the Currency that is associated with this EvenExpense.
    *
    * @returns {Currency} The Currency that has is associated with this EvenExpense.
    */
    get currency() {
        return this._currency;
    }
    set currency(newCurrency) {
        this._currency = newCurrency;
    }
    /**
    * Get a list of participants for this expense. This list consists of both creditors and debtors.
    *
    * @returns {Array<Person>} The Array of participants for this EvenExpense.
    */
    get participants() {
        let participantSet = new Set();
        for (let payment of this.payments.values()) {
            participantSet.add(payment.creditor);
        }
        for (let debt of this.unfilteredDebts.values()) {
            participantSet.add(debt.debtor);
        }
        return Array.from(participantSet);
    }
    /**
    * Get a Map of participants for this expense. This list consists of both creditors and debtors.
    *
    * @returns {Map<number, Person>} A Map of all the participants, where the keys are the IDs of the participants and the values the Person instances.
    */
    get participantMap() {
        let newParticipantMap = new Map();
        for (let participant of this.participants) {
            newParticipantMap.set(participant.id, participant);
        }
        return newParticipantMap;
    }
    /**
    * Add a participant to the expense. Under the hood, this will add a new debt and evenly distribute the amountUnpaid.
    *
    * @param {Person} newParticipant - The participant that should be added to this EvenExpense.
    */
    addParticipant(newParticipant) {
        if (!(this.participants.indexOf(newParticipant) > -1)) {
            let newDebt = new Debt_1.Debt(this.idCounter++, newParticipant);
            this.unfilteredDebts.set(newDebt.id, newDebt);
            this.recalculateDividedDebt();
        }
    }
    /**
    * This method will calculate the Debts in this EvenExpense instance. This is done each time some information is added, like a new Payment, instead of everytime a list of Debts is requested.
    * This is done to save device battery power.
    */
    recalculateDividedDebt() {
        if (this._payments.size > 0) {
            let newDebts = new Map();
            // Add debts for all payments
            for (let creditor of this.creditByCreditor.keys()) {
                let paidPercentage = this.creditByCreditor.get(creditor) / this.expensePaid;
                // Calculate new Debt for payment for all participants based on paidPercentage
                for (let participant of this.participants) {
                    let amountPerParticipant = this.expensePaid / this.participants.length;
                    let amountPerParticipantForThisPayment = amountPerParticipant * paidPercentage;
                    let debtDescription = participant.firstName + " owes " + creditor.firstName + " " + amountPerParticipantForThisPayment.toFixed(2) + "% of total payment of " + this.expensePaid + ".";
                    let newDebt = new Debt_1.Debt(this.idCounter++, participant, creditor, amountPerParticipantForThisPayment, debtDescription);
                    newDebts.set(newDebt.id, newDebt);
                }
            }
            this._debts = newDebts;
        }
    }
    /**
    * Remove a participant from the list of debtors. Removing a participant that paid does not work with this method, use removePayment first.
    *
    * @param {number} participantId - The ID of the participant that needs to be removed.
    *
    * @returns {number} The amount of participants maintained by this EvenExpense.
    */
    removeParticipant(participantId) {
        let participant = this.participantMap.get(participantId);
        for (let debtId of this.unfilteredDebts.keys()) {
            let currentDebt = this.unfilteredDebts.get(debtId);
            if (currentDebt.debtor == participant)
                this.unfilteredDebts.delete(debtId);
        }
        this.recalculateDividedDebt();
        return this.participants.length;
    }
    /**
    * Get a Map of Payments maintained by this EvenExpense, where the keys are the IDs of the Payments and the values are the Payment instances.
    *
    * @returns {Map<number, Payment>} A Map containing all Payments maintained by this EvenExpense.
    */
    get payments() {
        return this._payments;
    }
    /**
    * Add a new Payment. Debt gets recalculated.
    *
    * @param {Payment} newPayment - The payment to be added to this EvenExpense.
    *
    * @throws Will throw an Error when the total amount of Payments exceeds the expenseAmount.
    *
    * @returns {number} The ID of the newly Payment.
    */
    addPayment(newPayment) {
        if (newPayment.id < 0)
            newPayment.id = this.idCounter++;
        if (this.expensePaid + newPayment.amount > this.expenseAmount) {
            throw new Error("Can not pay more than the total price of the expense.");
        }
        this.payments.set(newPayment.id, newPayment);
        this.recalculateDividedDebt();
        return newPayment.id;
    }
    /**
    * Remove a payment. Debt gets recalculated.
    *
    * @param {number} paymentId - The ID of the Payment that needs to be removed.
    *
    * @returns {number} - The amount of Payments still maintained by this EvenExpense after removal.
    */
    removePayment(paymentId) {
        this.payments.delete(paymentId);
        this.recalculateDividedDebt();
        return this.payments.size;
    }
    /**
    * Manually adding a Debt to an EvenExpense is not possible. Add participants instead.
    *
    * @throws Will always throw an Error, because EvenExpense does not support manually adding Debts.
    */
    addDebt(newDebt) {
        throw new Error("EvenExpense does not support adding debts, add participants or payments instead.");
    }
    /**
    * Manually removing a Debt from an EvenExpense is not possible. Remove participants and/or Payments instead.
    *
    * @throws Will always throw an Error, because EvenExpense does not support manually removing Debts.
    */
    removeDebt(debtId) {
        throw new Error("EvenExpense does not support removing debts, remove participants or payments instead.");
    }
    /**
    * Add a BillItem. EvenExpense does not support BillItems. Will throw an Error.
    *
    * @throws Will always throw an Error, because EvenExpense does not support BillItems.
    */
    addBillItem(billItem) {
        throw new Error("EvenExpense does not support adding billItems.");
    }
    /**
    * Remove a BillItem. EvenExpense does not support BillItems. Will throw an Error.
    *
    * @throws Will always throw an Error, because EvenExpense does not support BillItems.
    */
    removeBillItem(billItemId) {
        throw new Error("EvenExpense does not support removing billItems.");
    }
    /**
    * Get a Map of Debts maintained by this EvenExpense, where the keys are the IDs of the Debts and the values are the Debt instances.
    *
    * @returns {Map<number, Debt>} A Map containing all Debts maintained by this EvenExpense.
    */
    get debts() {
        let newDebts = new Map();
        for (let debt of this.unfilteredDebts.values()) {
            newDebts.set(debt.id, debt);
        }
        // Subtract debts that cancel eachother out
        for (let debtId of newDebts.keys()) {
            let currentDebt = newDebts.get(debtId);
            for (let otherDebtId of newDebts.keys()) {
                let otherDebt = newDebts.get(otherDebtId);
                if (currentDebt.creditor === otherDebt.debtor) {
                    if (currentDebt.amount > otherDebt.amount) {
                        let newAmount = currentDebt.amount - otherDebt.amount;
                        currentDebt.amount = newAmount;
                        currentDebt.description = currentDebt.debtor.firstName + " owes " + currentDebt.creditor.firstName + " " + newAmount.toFixed(2) + " of " + this.expenseAmount + ".";
                        newDebts.delete(otherDebt.id);
                    }
                    if (currentDebt.amount === otherDebt.amount) {
                        newDebts.delete(currentDebt.id);
                        newDebts.delete(otherDebt.id);
                    }
                }
            }
        }
        // Remove debts that creditors owe to themselves
        for (let debtId of newDebts.keys()) {
            let currentDebt = newDebts.get(debtId);
            if (currentDebt.creditor == currentDebt.debtor)
                newDebts.delete(debtId);
        }
        return newDebts;
    }
    get unfilteredDebts() {
        return this._debts;
    }
    /**
    * Get a Map of BillItems maintained by this EvenExpense, where the keys are the IDs of the BillItems and the values are the Debt instances. Will throw an Error, BillItems are not supported by EvenExpense.
    *
    * @throws Will always throw an Error, EvenExpense does not support BillItems.
    */
    get billItems() {
        throw new Error("EvenExpense does not support billItems.");
    }
    /**
    * Get a Map of creditors maintained by this EvenExpense, where the keys are the IDs of the creditors and the values are the Person instances.
    *
    * @returns {Map<number, Person>} A Map containing all creditors maintained by this EvenExpense.
    */
    get creditors() {
        let creditorSet = new Set();
        for (let payment of this.payments.values()) {
            creditorSet.add(payment.creditor);
        }
        return Array.from(creditorSet);
    }
    /**
    * Get a Map of debtors maintained by this EvenExpense, where the keys are the IDs of the debtors and the values are the Person instances.
    *
    * @returns {Map<number, Person>} A Map containing all debtors maintained by this EvenExpense.
    */
    get debtors() {
        let debtorSet = new Set();
        for (let debt of this.debts.values()) {
            debtorSet.add(debt.debtor);
        }
        return Array.from(debtorSet);
    }
    /**
    * Get a Map of all the total debt categorized by the debtor.
    *
    * @returns {Map<Person, number>} A Map containing all the debtors of this EvenExpense, where the keys are the debtors Person instances, and the values are the total amount of their debts.
    */
    get debtByDebtor() {
        let debtMap = new Map();
        for (let debt of this.debts.values()) {
            if (debtMap.has(debt.debtor)) {
                let newAmount = debtMap.get(debt.debtor) + debt.amount;
                debtMap.set(debt.debtor, newAmount);
            }
            else
                debtMap.set(debt.debtor, debt.amount);
        }
        return debtMap;
    }
    /**
    * A list of all the total amount paid to the third party categorized the creditors.
    *
    * @returns {Map<Person, number>} A Map containing all the creditors of this ExpenseExpense, where the keys are the creditors Person instances, and the values are the total amount of their payments.
    */
    get creditByCreditor() {
        let creditMap = new Map();
        /**
        * Add whatever the creditor paid already.
        */
        for (let payment of this.payments.values()) {
            if (creditMap.has(payment.creditor)) {
                let newAmount = creditMap.get(payment.creditor) + payment.amount;
                creditMap.set(payment.creditor, newAmount);
            }
            else
                creditMap.set(payment.creditor, payment.amount);
        }
        return creditMap;
    }
    /**
    * Converts the Expense to a DataObject.
    *
    * @returns {IExpenseDO} - The DataObject representing this Expense.
    */
    toDataObject() {
        let newDO = new IExpenseDO_1.IExpenseDO();
        newDO.id = this.id;
        newDO.idCounter = this.idCounter;
        newDO.expenseType = this.expenseType;
        newDO.category = this.category;
        newDO.description = this.description;
        newDO.expenseAmount = this.expenseAmount;
        newDO.currency = this.currency;
        newDO.participants = this.participants;
        newDO.payments = Array.from(this.payments.values());
        return newDO;
    }
}
exports.EvenExpense = EvenExpense;
