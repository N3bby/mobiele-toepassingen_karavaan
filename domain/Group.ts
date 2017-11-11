import { Expense } from './Expense';
import { Person } from './Person';
import {Currency} from './Currency';
class Group {
    private name:string;
    private id:number;
    private startDate:Date;
    private currency:Currency
    private expense: Expense[];
    private participants: Person[];
    private group:Group;

    constructor(name:string, id:number, startDate:Date, currency:Currency,expense:Expense[],
                participants:Person[]){
                    this.name=name;
                    this.id=id;
                    this.startDate=startDate;
                    this.currency=currency;
                    this.expense=expense;
                    this.participants=participants;
                }

                Group(group:Group){
                    this.group=group;
                }

                getName():string{
                    return this.name;
                }

                getId():number{
                    return this.id;
                }
                
                getStartDate():Date{
                    return this.startDate;
                }

                getCurrency():Currency{
                    return this.currency;
                }

                getExpense():Expense[]{
                    return this.expense;
                }

                getParticipants():Person[]{
                    return this.participants;
                }

                getGroup():Group{
                    return this.group;
                }



}