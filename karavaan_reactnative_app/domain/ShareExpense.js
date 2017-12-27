"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExpenseType_1 = require("./ExpenseType");
const IExpenseDO_1 = require("./IExpenseDO");
class ShareExpense {
    constructor(id = -1, expenseAmount = 100, category = "A new category", description = "A new SharedExpense where participants enter their own debts.") {
        this.expenseType = ExpenseType_1.ExpenseType.ShareExpense;
        this.idCounter = 0;
        this.id = id;
        this.expenseAmount = expenseAmount;
        this.category = category;
        this.description = description;
        this.payments = new Map();
        this.debts = new Map();
    }
    get expenseUnpaid() {
        let amountToPay = this.expenseAmount;
        for (let payment of this.payments.values()) {
            amountToPay -= payment.amount;
        }
        return amountToPay;
    }
    get expensePaid() {
        return this.expenseAmount - this.expenseUnpaid;
    }
    get amountPaid() {
        let amountAlreadyPaid = 0;
        for (let debt of this.debts.values()) {
            amountAlreadyPaid += debt.amount;
        }
        return amountAlreadyPaid;
    }
    get amountUnpaid() {
        return this.expenseAmount - this.amountPaid;
    }
    get participants() {
        let participantSet = new Set();
        for (let payment of this.payments.values()) {
            participantSet.add(payment.creditor);
        }
        for (let debt of this.debts.values()) {
            participantSet.add(debt.debtor);
        }
        return Array.from(participantSet);
    }
    get participantMap() {
        let newParticipantMap = new Map();
        for (let participant of this.participants) {
            newParticipantMap.set(participant.id, participant);
        }
        return newParticipantMap;
    }
    addParticipant(newParticipant) {
        throw new Error('Adding participants to a ShareExpense is not supported. Add debts instead.');
    }
    removeParticipant(participantId) {
        throw new Error('Removing participants from a ShareExpense is not supported. Remove debts instead.');
    }
    addPayment(newPayment) {
        if (newPayment.id < 0)
            newPayment.id = this.idCounter++;
        if (this.expensePaid + newPayment.amount > this.expenseAmount) {
            throw new Error("Can not pay more than the total price of the expense.");
        }
        this.payments.set(newPayment.id, newPayment);
        return newPayment.id;
    }
    removePayment(paymentId) {
        this.payments.delete(paymentId);
        return this.payments.size;
    }
    addDebt(newDebt) {
        if (newDebt.id < 0)
            newDebt.id = this.idCounter++;
        this.debts.set(newDebt.id, newDebt);
        return newDebt.id;
    }
    removeDebt(debtId) {
        this.debts.delete(debtId);
        return this.debts.size;
    }
    get unfilteredDebts() {
        return this.debts;
    }
    addBillItem(billItem) {
        throw new Error("Adding BillItems is not supported by ShareExpense.");
    }
    removeBillItem(billItemId) {
        throw new Error('Removing BillItems is not supported by ShareExpense.');
    }
    get billItems() {
        throw new Error("BillItems are not supported by ShareExpense.");
    }
    get creditors() {
        let creditorSet = new Set();
        for (let payment of this.payments.values()) {
            creditorSet.add(payment.creditor);
        }
        return Array.from(creditorSet);
    }
    get debtors() {
        let debtorSet = new Set();
        for (let debt of this.debts.values()) {
            debtorSet.add(debt.debtor);
        }
        return Array.from(debtorSet);
    }
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
    get creditByCreditor() {
        let creditMap = new Map();
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
    toDataObject() {
        let newDO = new IExpenseDO_1.IExpenseDO();
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
exports.ShareExpense = ShareExpense;
