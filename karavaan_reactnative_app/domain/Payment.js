"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Person_1 = require("./Person");
/**
* A Payment is an object that stores information about a payment that a creditor of an IExpense has done to a thrid party.
*/
class Payment {
    /**
    * Initialise a new Payment.
    *
    * @param {number} [id=-1] - The ID of the new Payment.
    * @param {Person} [creditor=new Person()] - The creditor of the new Payment.
    * @param {number} [amount=0] - The amount this creditor has paid to the third party.
    *
    * @class Payment
    */
    constructor(id = -1, creditor = new Person_1.Person(), amount = 0) {
        this.id = id;
        this.creditor = creditor;
        this.amount = amount;
    }
    /**
    * Get or set the ID of the Payment.
    *
    * @returns {number} The ID of the Payment.
    */
    get id() {
        return this._id;
    }
    set id(newId) {
        this._id = newId;
    }
    /**
    * Get or set the creditor of this Payment.
    *
    * @rturns {Person} The creditor of this payment.
    */
    get creditor() {
        return this._creditor;
    }
    set creditor(newCreditor) {
        this._creditor = newCreditor;
    }
    /**
    * Get or set the amount that the creditor of this Payment has paid the third party.
    *
    * @returns {number} The amount that the creditor of this Payment has paid the third party.
    */
    get amount() {
        return this._amount;
    }
    set amount(newAmount) {
        this._amount = newAmount;
    }
}
exports.Payment = Payment;
