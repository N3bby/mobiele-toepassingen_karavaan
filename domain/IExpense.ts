import { BillItem } from './BillItem';
import { Payment } from './Payment';
import { Person } from './Person';

export class IExpense
{
    private _id : number;
    private _billItems : Map<number, BillItem>;
    private _payments : Map<number, Payment>;
}