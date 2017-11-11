import { Person } from './Person';

export class Expense{
//TODO: npm install typescript-map
private notes:string;
private id:number;
private categories: TSMap<Person,number>();
private expensePerPerson:Person[]
private currency:string; //change type to other
private date:Date;
private receiver:string;
private amount:number;
private expense:Expense;

constructor(notes:string, id:number,categories:TSMap<Person,number>,expensePerPerson:Person[], 
            currency:string,date:Date,receiver:string,amount:number){
                this.notes = notes;
                this.id=id;
                this.categories=categories;
                this.expensePerPerson=expensePerPerson;
                this.currency=currency;
                this.date=date;
                this.receiver=receiver;
                this.amount=amount;
            }

            Expense(expense:Expense){
                this.expense=expense;
            }

            getExpense():Expense{
                return this.expense;
            }

            getNotes():string{
                return this.notes;
            }

            getId():number{
                return this.id;
            }
            
            getCategories():TSMap<Person,number>{
                return this.categories;
            }
            
            getExpensePerPerson():Person[]{
                return this.expensePerPerson;
            }

            getCurrency():string{
                return this.currency;
            }

            getDate():Date{
                return this.date;
            }

            getReceiver():string{
                return this.receiver;
            }

            getAmount():number{
                return this.amount;
            }
}