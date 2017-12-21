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
}
exports.Payment = Payment;
