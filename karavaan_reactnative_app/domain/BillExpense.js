"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExpenseType_1 = require("./ExpenseType");
const Currency_1 = require("./Currency");
const Debt_1 = require("./Debt");
const IExpenseDO_1 = require("./IExpenseDO");
class BillExpense {
    constructor(id = -1, expenseAmount = 100, category = "category", description = "New split by BillItem Expense.") {
        this.expenseType = ExpenseType_1.ExpenseType.BillExpense;
        this.idCounter = 0;
        this.id = id;
        this.expenseAmount = expenseAmount;
        this.category = category;
        this.description = description;
        this.payments = new Map();
        this.billItems = new Map();
        this.currency = new Currency_1.Currency("EUR", 1);
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
        for (let debt of this.unfilteredDebts.values()) {
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
        for (let billItem of this.billItems.values()) {
            if (typeof billItem.debtor != 'undefined')
                participantSet.add(billItem.debtor);
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
        throw new Error('Adding participants to a BillExpense is not supported. Add Payments or assign persons to BillItems instead.');
    }
    removeParticipant(participantId) {
        throw new Error('Removing participants from a BillExpense is not supported. Remove Payments or debtors from Billitems instead.');
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
        throw new Error('BillExpense does not support adding debts, assign debtors to BillItems instead.');
    }
    removeDebt(debtId) {
        throw new Error('BillExpense does not support removing detbs, remove debtors from BillItems instead.');
    }
    addBillItem(billItem) {
        //TODO Add this in the typescript too
        //Fixes issue with being able to add billitems so you go over total expense amount
        let totalBillItemValue = 0;
        Array.from(this.billItems.values()).forEach((b) => totalBillItemValue += b.amount);
        if(totalBillItemValue + billItem.amount > this.expenseAmount) throw new Error("Can not add bill items more than the total price of the expense.");

        if (billItem.id < 0)
            billItem.id = this.idCounter++;
        this.billItems.set(billItem.id, billItem);
        return billItem.id;
    }
    removeBillItem(billItemId) {
        this.billItems.delete(billItemId);
        return this.billItems.size;
    }
    get debts() {
        let newDebtMap = new Map();
        for (let debt of this.unfilteredDebts.values()) {
            newDebtMap.set(debt.id, debt);
        }
        for (let creditor of this.creditByCreditor.keys()) {
            // Filter out debts that creditors owe to themselves
            for (let debtId of newDebtMap.keys()) {
                let currentDebt = newDebtMap.get(debtId);
                if (currentDebt.debtor == creditor)
                    newDebtMap.delete(debtId);
            }
        }
        // Subtract debts that cancel eachother out
        for (let debtId of newDebtMap.keys()) {
            let currentDebt = newDebtMap.get(debtId);
            for (let otherDebtId of newDebtMap.keys()) {
                let otherDebt = newDebtMap.get(otherDebtId);
                if (currentDebt.creditor == otherDebt.debtor) {
                    if (currentDebt.amount > otherDebt.amount) {
                        let newAmount = currentDebt.amount - otherDebt.amount;
                        currentDebt.amount = newAmount;
                        currentDebt.description = currentDebt.debtor.firstName + "owes " + currentDebt.creditor.firstName + " " + currentDebt.amount + " " + this.currency.name;
                        newDebtMap.delete(otherDebtId);
                    }
                    if (currentDebt.amount == otherDebt.amount) {
                        newDebtMap.delete(debtId);
                        newDebtMap.delete(otherDebtId);
                    }
                }
            }
        }
        return newDebtMap;
    }

    get unfilteredDebts() {
        let newDebtMap = new Map();
        // Calculate the percentage paid by each creditor
        for (let creditor of this.creditByCreditor.keys()) {
            let paidPercentage = this.creditByCreditor.get(creditor) / this.expenseAmount;
            for (let debtor of this.debtByDebtor.keys()) {
                let amountToPay = this.debtByDebtor.get(debtor) * paidPercentage;
                let description = debtor.firstName + " owes " + creditor.firstName + " " + amountToPay + " " + this.currency.name;
                let newDebt = new Debt_1.Debt(this.idCounter++, debtor, creditor, amountToPay, description);
                newDebtMap.set(newDebt.id, newDebt);
            }
        }
        return newDebtMap;
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
    //Gives a map with debtor and what they have to pay for all their bill items
    get debtByDebtor() {
        let debtMap = new Map();
        for (let billItem of this.billItems.values()) {
            if (debtMap.has(billItem.debtor)) {
                let newAmount = debtMap.get(billItem.debtor) + billItem.amount;
                debtMap.set(billItem.debtor, newAmount);
            }
            else
                debtMap.set(billItem.debtor, billItem.amount);
        }
        return debtMap;
    }
    //Gives a map with creditor and what they payed (from payments)
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
        newDO.billItems = Array.from(this.billItems.values());
        return newDO;
    }
}
exports.BillExpense = BillExpense;
