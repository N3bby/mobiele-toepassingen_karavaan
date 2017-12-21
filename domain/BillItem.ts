import { Person } from './Person';

/**
* A BillItem is an entry from any sort of bill, like a receipt or a sales ticket.  
* A BillItem contains an ID, a description, a debtor (who should pay the BillItem) and the amount of the item.
*/
export class BillItem
{
    id: number;
    description: string;
    debtor: Person;
    amount: number;
    
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
    constructor(id : number = -1, description : string = "", debtor : Person = new Person(), amount : number = 0)
    {
        this.id = id;
        this.description = description;
        this.debtor = debtor;
        this.amount = amount;
    }
}