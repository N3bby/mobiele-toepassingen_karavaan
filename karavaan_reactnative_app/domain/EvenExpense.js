"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const Debt_1 = require("./Debt");
const Currency_1 = require("./Currency");
const Payment_1 = require("./Payment");
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
     * @param {string} [category="category"] - The category of the new EvenExpense.
     * @param {string} [description="New Evenly divided Expense"] - The description of the new EvenExpense.
     *
     * @class EvenExpense
     */
    constructor(id = -1, category = "category", description = "New Evenly divided Expense.") {
        this.expenseType = ExpenseType_1.ExpenseType.EvenExpense;
        this.idCounter = 0;
        this.id = id;
        this.category = category;
        this.description = description;
        this.currency = new Currency_1.Currency("EUR", 1);

        this._participants = new Map();
        this._payments = new Map();
        this._debts = new Map();
    }

    /**
     * Get or set the total amount (price) of the EvenExpense. This is the amount that needs to be paid to a third party.
     *
     * @returns {number} The total amount (price) of the EvenExpense.
     */
    get expenseAmount() {
        return Array.from(this._payments.values())
            .map(p => p.amount)
            .reduce((p1, p2) => p1 + p2, 0);
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
     * Get a list of participants for this expense. This list consists of both creditors and debtors.
     *
     * @returns {Array<Person>} The Array of participants for this EvenExpense.
     */
    get participants() {
        return Array.from(this.participantMap.values());
    }

    /**
     * Get a Map of participants for this expense. This list consists of both creditors and debtors.
     *
     * @returns {Map<number, Person>} A Map of all the participants, where the keys are the IDs of the participants and the values the Person instances.
     */
    get participantMap() {
        return new Map(this._participants);
    }

    /**
     * Add a participant to the expense. Under the hood, this will add a new debt and evenly distribute the amountUnpaid.
     *
     * @param {Person} newParticipant - The participant that should be added to this EvenExpense.
     */
    addParticipant(newParticipant) {
        if (!(this.participants.indexOf(newParticipant) > -1)) { //If participant is not in map
            this._participants.set(newParticipant.id, newParticipant);
            this.recalculateDebts();
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
        this._participants.delete(participantId);
        this.recalculateDebts();
        return this.participants.length;
    }

    /**
     * Get a Map of Payments maintained by this EvenExpense, where the keys are the IDs of the Payments and the values are the Payment instances.
     *
     * @returns {Map<number, Payment>} A Map containing all Payments maintained by this EvenExpense.
     */
    get payments() {
        return new Map(this._payments);
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
        this.addParticipant(newPayment.creditor);
        this.payments.set(newPayment.id, newPayment);
        this.recalculateDebts();
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
        this.recalculateDebts();
        return this.payments.size;
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
        return new Map(this._debts);
    }

    /**
     * Recalculates the debts of this expense.
     * Note, this is not an optimal solution, but I created a method that is somewhat generic
     * You will find some of this code in the other expenses as well
     * It could be a good idea to extract this stuff into separate methods if you're refactoring this :)
     */
    recalculateDebts() {

        this._debts = new Map(); //Reset debts

        let combinedPayments = this.combinedPayments; //In case the user created multiple payment for a single person
        let amountToPay = this.expenseAmount / this.participants.length;
        let medialDebts = new Map();

        //Fill debt map with all participants and how much they need to pay
        this.participants.forEach(p => medialDebts.set(p, amountToPay));

        //Calculate the debt for each participant
        //Debt to expense = amountToPay - amountPayed
        for (let participant of this.participants) {
            let combinedPayment = combinedPayments.get(participant);
            if (combinedPayment !== undefined) {
                medialDebts.set(participant, medialDebts.get(participant) - combinedPayment.amount);
            }
        }

        //Sort debt map (from lowest debt (or due) to highest debt).
        //Can't really sort a map, so create an array of keys sorted by their values
        let sortedKeys = Array.from(medialDebts.keys());
        sortedKeys.sort((k1, k2) => medialDebts.get(k1) - medialDebts.get(k2));

        //Create actual debts
        let lowerIndex = 0; //Lowest debt
        let upperIndex = sortedKeys.length - 1; //Highest debt

        while (upperIndex > lowerIndex) {

            let lowerDebt = medialDebts.get(sortedKeys[lowerIndex]);
            let upperDebt = medialDebts.get(sortedKeys[upperIndex]);

            let newDebt = new Debt_1.Debt(this.idCounter++, sortedKeys[upperIndex], sortedKeys[lowerIndex]);

            if (upperDebt > Math.abs(lowerDebt)) {
                newDebt.amount = Math.abs(lowerDebt); //Set debt amount
                medialDebts.set(sortedKeys[lowerIndex], 0); //Satisfy debt value in medialDebts for creditor
                medialDebts.set(sortedKeys[upperIndex], upperDebt - Math.abs(lowerDebt)); //Decrease debt value in medialDebts for debtor
                lowerIndex++; //Increment lowerIndex
            } else if (upperDebt < Math.abs(lowerDebt)) {
                newDebt.amount = upperDebt;
                medialDebts.set(sortedKeys[lowerIndex], lowerDebt + upperDebt); //Increase debt value in medialDebts for creditor
                medialDebts.set(sortedKeys[upperIndex], 0); //Satisfy debt value in medialDebts for debtor
                upperIndex--; //Decrement upperIndex
            } else { //upperDebt === lowerDebt
                newDebt.amount = upperDebt;
                //Satisfy both debts
                medialDebts.set(sortedKeys[lowerIndex], 0);
                medialDebts.set(sortedKeys[upperIndex], 0);
                //Change both index pointers
                lowerIndex++;
                upperIndex--;
            }

            //Add debt to debt list
            this._debts.set(newDebt.id, newDebt);

        }

    }

    /**
     * Get a map of payments where they are combined based on their creditor
     */
    get combinedPayments() {

        let combinedPayments = new Map();

        //You need to clone the objects everywhere to prevent modifying data in the original payment map
        for (let payment of Array.from(this.payments.values())) {
            if (combinedPayments.has(payment.creditor)) {
                //If it already is in there, add amount to existing value
                //No need to clone again here since we're already working on a cloned object
                combinedPayments.get(payment.creditor).amount += payment.amount;
            } else {
                //Add new payment (needs to be a copy)
                combinedPayments.set(payment.creditor, new Payment_1.Payment(-1, payment.creditor, payment.amount));
            }
        }

        return combinedPayments;

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
