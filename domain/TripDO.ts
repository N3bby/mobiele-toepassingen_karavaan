import { Trip } from './Trip';
import { Currency } from './Currency';
import { IExpenseDO } from './IExpenseDO';
import { Person } from './Person';

export class TripDO
{
    id : number; 
    name : string;
    description : string;
    currencies = new Array<any>();
    expenses = new Array<any>();
    participants = new Array<any>();
    date : string;
}