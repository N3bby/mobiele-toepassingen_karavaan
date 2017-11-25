"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Person_1 = require("./Person");
/**
* A Debt is an object that keeps track of how much a Person owes another Person.
* A Debt consists of an ID, a debtor, a creditor, an amount, a description and an "isPaid" flag/boolean that conveys if the Debt has been paid or not.
*/
class Debt {
    /**
    * Initialise a new Debt.
    *
    * @param {number} [id=-1] - The ID of the new Debt.
    * @param {Person} [debtor=new Person()] - The debtor of the Debt. (e.g.: Who needs to pay?)
    * @param {Person} [creditor=new Person()] - The creditor of the Debt. (e.g.: Who needs to be paid?)
    * @param {number} [amount=0] - The amount of the Debt. (e.g.: How much needs to be paid?)
    * @param {string} [description=""] - The description of the Debt. (e.g.: What needs to be paid?)
    * @param {boolean} [isPaid=false] - The boolean to keep track of the "paystate" of the Debt. (e.g.: Has it been paid already?)
    *
    * @class Debt
    */
    constructor(id = -1, debtor = new Person_1.Person(), creditor = new Person_1.Person(), amount = 0, description = "New Debt.", isPaid = false) {
        this.id = id;
        this.debtor = debtor;
        this.creditor = creditor;
        this.amount = amount;
        this.description = description;
        this.isPaid = isPaid;
    }
    /**
    * Get or set the ID of the Debt.
    *
    * @returns {number} The ID of the Debt.
    */
    get id() {
        return this._id;
    }
    set id(newId) {
        this._id = newId;
    }
    /**
    * Get or set the debtor of the Debt.
    *
    * @returns {Person} The debtor of the Debt.
    */
    get debtor() {
        return this._debtor;
    }
    set debtor(newDebtor) {
        this._debtor = newDebtor;
    }
    /**
    * Get or set the creditor of the Debt.
    *
    * @returns {Person} The creditor of the Debt.
    */
    get creditor() {
        return this._creditor;
    }
    set creditor(newCreditor) {
        this._creditor = newCreditor;
    }
    /**
    * Get or set the amount (price) of the Debt.
    *
    * @returns {number} The amount (price) of the Debt.
    */
    get amount() {
        return this._amount;
    }
    set amount(newAmount) {
        this._amount = newAmount;
    }
    /**
    * Get or set the description of the Debt.
    *
    * @returns {string} The description of the Debt.
    */
    get description() {
        return this._description;
    }
    set description(newDescription) {
        this._description = newDescription;
    }
    /**
    * Check if the Debt has been paid, or update wether the Debt has been paid or not.
    *
    * @returns {boolean} The state of payment. (e.g.: Has the debt already been paid, true or false?)
    */
    get isPaid() {
        return this._isPaid;
    }
    set isPaid(newPaidState) {
        this._isPaid = newPaidState;
    }
}
exports.Debt = Debt;
