const EvenExpense_1 = require("../EvenExpense");
const Payment_1 = require("../Payment");
const Person_1 = require("../Person");

function test_even_expense_debts() {

    let expense = new EvenExpense_1.EvenExpense(5, "cat", "test");

    let person1 = new Person_1.Person(1, "Person 1", "");
    let person2 = new Person_1.Person(2, "Person 2", "");
    let person3 = new Person_1.Person(3, "Person 3", "");

    let payment1 = new Payment_1.Payment(-1, person1, 2);
    let payment2 = new Payment_1.Payment(-1, person2, 4);
    let payment3 = new Payment_1.Payment(-1, person3, 9);

    expense.addPayment(payment1);
    expense.addPayment(payment2);
    expense.addPayment(payment3);

    // let payments = Array.from(expense.payments.values());
    // payments.forEach(p => console.log(p.creditor.firstName + " payed " + p.amount.toFixed(2)));

    console.log("Debts");
    let debts = Array.from(expense.debts.values());
    debts.forEach(d => console.log(d.debtor.firstName + " owes " + d.creditor.firstName + " " + d.amount.toFixed(2)));

    console.log(expense.expenseAmount)

}

test_even_expense_debts();