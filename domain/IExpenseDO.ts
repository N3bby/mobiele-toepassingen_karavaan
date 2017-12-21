import { ExpenseType } from './ExpenseType';
import { Currency } from './Currency';
import { Person } from './Person';
import { Payment } from './Payment';
import { BillItem } from './BillItem';
import { Debt } from './Debt';

export class IExpenseDO
{
    id: number;
    expenseType : any;
    category : string;
    description : string;
    expenseAmount : number;
    
    currency: any;
    participants = Array<any>();
    payments = Array<any>();
    billItems = Array<any>();
    debts = Array<any>();
    
    idCounter : number;
}