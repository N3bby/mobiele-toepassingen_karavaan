"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Person_1 = require("./Person");
/**
* A BillItem is an entry from any sort of bill, like a receipt or a sales ticket.
* A BillItem contains an ID, a description, a debtor (who should pay the BillItem) and the amount of the item.
*/
class BillItem {
    /**
    * Initialise a new BillItem.
    *
    * @param {number} [id=-1] - The ID of the new BillItem.
    * @param {string} [description=""] - The description of the new BillItem.
    * @param {Person} [debtor=new Person()] - The debtor of the new BillItem.
    * @param {number} [amount=0] = The price of the new BillItem.
    *
    * @class BillItem
    */
    constructor(id = -1, description = "", debtor = new Person_1.Person(), amount = 0) {
        this.id = id;
        this.description = description;
        this.debtor = debtor;
        this.amount = amount;
    }
}
exports.BillItem = BillItem;
