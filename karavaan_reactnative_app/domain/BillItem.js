"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Person_1 = require("./Person");
/**
* A BillItem is an entry from any sort of bill, like a receipt or a sales ticket.
* A BillItem contains an ID, a debtor (who should pay the BillItem) and the amount of the item.
*/
class BillItem {
    /**
    * Initialise a new BillItem.
    *
    * @param {number} [id=-1] - The ID of the new BillItem.
    * @param {Person} [debtor=new Person()] - The debtor of the new BillItem.
    * @param {number} [amount=0] = The price of the new BillItem.
    *
    * @class BillItem
    */
    constructor(id = -1, debtor = new Person_1.Person(), amount = 0) {
        this.id = id;
        this.debtor = debtor;
        this.amount = amount;
    }
    /**
    * Get or set the ID of the BillItem.
    *
    * @returns {number} The ID of the BillItem.
    */
    get id() {
        return this._id;
    }
    set id(newId) {
        this._id = newId;
    }
    /**
    * Get or set the debtor of the BillItem.
    *
    * @returns {Person} The Person instance that owes the debt.
    */
    get debtor() {
        return this._debtor;
    }
    set debtor(newDebtor) {
        this._debtor = newDebtor;
    }
    /**
    * Get or set the amount (price) of the BillItem.
    *
    * @returns {number} The amount (price) of the BillItem.
    */
    get amount() {
        return this._amount;
    }
    set amount(newAmount) {
        this._amount = newAmount;
    }
}
exports.BillItem = BillItem;
