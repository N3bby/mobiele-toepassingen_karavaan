"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const ExpenseType_1 = require("./ExpenseType");
const Currency_1 = require("./Currency");
const Debt_1 = require("./Debt");
const IExpenseDO_1 = require("./IExpenseDO");
const Payment_1 = require("./Payment");

class BillExpense {
    constructor(id = -1, category = "category", description = "New split by BillItem Expense.") {
        this.expenseType = ExpenseType_1.ExpenseType.BillExpense;
        this.idCounter = 0;
        this.id = id;
        this.category = category;
        this.description = description;
        this.currency = new Currency_1.Currency("EUR", 1);

        this._billItems = new Map();
        this._payments = new Map();
        this._debts = new Map();
    }

    get expenseAmount() {
        return Array.from(this._billItems.values())
            .map(b => b.amount)
            .reduce((p1, p2) => p1 + p2, 0);
    }

    get expenseUnpaid() {
        return this.expenseAmount - this.expensePaid;
    }

    get expensePaid() {
        let paid = 0;
        for (let payment of this._payments.values()) {
            paid += payment.amount;
        }
        return paid;
    }

    get participants() {
        let result = [];
        //Add participants from both BillItems and Payments
        for(let billItem of this._billItems.values()) {
            if (result.indexOf(billItem.debtor) === -1) {
                result.push(billItem.debtor);
            }
        }
        for(let payment of this._payments.values()) {
            if(result.indexOf(payment.creditor) === -1) {
                result.push(payment.creditor);
            }
        }
        return result;
    }

    get participantMap() {
        let newParticipantMap = new Map();
        for (let participant of this.participants) {
            newParticipantMap.set(participant.id, participant);
        }
        return newParticipantMap;
    }

    addParticipant(newParticipant) {
        throw new Error('Adding participants to a BillExpense is not supported.');
    }

    removeParticipant(participantId) {
        throw new Error('Removing participants from a BillExpense is not supported.');
    }

    get payments() {
        return new Map(this._payments);
    }

    addPayment(newPayment) {
        if (newPayment.id < 0)
            newPayment.id = this.idCounter++;
        if (this.expensePaid + newPayment.amount > this.expenseAmount) {
            throw new Error("Can not pay more than the total price of the expense.");
        }
        this._payments.set(newPayment.id, newPayment);
        this.recalculateDebts();
        return newPayment.id;
    }

    removePayment(paymentId) {
        this._payments.delete(paymentId);
        this.recalculateDebts();
        return this._payments.size;
    }

    get billItems() {
        return new Map(this._billItems);
    }

    addBillItem(billItem) {
        if (billItem.id < 0)
            billItem.id = this.idCounter++;
        this._billItems.set(billItem.id, billItem);
        this.recalculateDebts();
        return billItem.id;
    }

    removeBillItem(billItemId) {
        let billItem = this._billItems.get(billItemId);
        if (billItem !== undefined && this.expenseAmount - billItem.amount < this.expensePaid) {
            throw new Error("Cannot remove this. Please remove some payments first.")
        } else {
            this._billItems.delete(billItemId);
            this.recalculateDebts();
            return this._billItems.size;
        }
    }

    get debts() {
        return new Map(this._debts);
    }

    recalculateDebts() {

        this._debts = new Map(); //Reset debts

        let combinedPayments = this.combinedPayments; //In case the user created multiple payment for a single person
        let medialDebts = new Map();

        //Fill debt map with all participants
        this.participants.forEach(p => medialDebts.set(p, 0));

        //Change debt based on BillItems
        for (let billItem of this._billItems.values()) {
            if (medialDebts.has(billItem.debtor)) { //If debtor is already in there, add this amount to his current amount
                medialDebts.set(billItem.debtor, medialDebts.get(billItem.debtor) + billItem.amount);
            } else {
                medialDebts.set(billItem.debtor, billItem.amount);
            }
        }

        //Change debt based on Payments
        for (let payment of Array.from(combinedPayments.values())) {
            medialDebts.set(payment.creditor, medialDebts.get(payment.creditor) - payment.amount);
        }

        //Next bit is the same for all expense types

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

        for(let medialDebt of medialDebts.values()) {
            //Debts cannot be resolved, show no debts (the user is most likely creating the expense atm)
            if(medialDebt !== 0) {
                this._debts = new Map();
            }
        }

    }

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

    toDataObject() {
        let newDO = new IExpenseDO_1.IExpenseDO();
        newDO.id = this.id;
        newDO.idCounter = this.idCounter;
        newDO.expenseType = this.expenseType;
        newDO.category = this.category;
        newDO.description = this.description;
        newDO.expenseAmount = this.expenseAmount;
        newDO.currency = this.currency;
        newDO.payments = Array.from(this._payments.values());
        newDO.billItems = Array.from(this._billItems.values());
        newDO.debts = Array.from(this._debts.values());
        return newDO;
    }
}

exports.BillExpense = BillExpense;
