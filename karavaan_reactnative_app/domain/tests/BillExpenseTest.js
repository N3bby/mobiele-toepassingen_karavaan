const EvenExpense_1 = require("../BillExpense");
const Payment_1 = require("../Payment");
const Person_1 = require("../Person");
const BillItem_1 = require("../BillItem");

//This test is manual, change the code below to test different cases.
//Run with node
function test_even_expense_debts() {

    let expense = new EvenExpense_1.BillExpense(5, 11, "cat", "test");

    let person1 = new Person_1.Person(1, "Person 1", "");
    let person2 = new Person_1.Person(2, "Person 2", "");
    let person3 = new Person_1.Person(3, "Person 3", "");

    let payment1 = new Payment_1.Payment(-1, person1, 3);
    let payment2 = new Payment_1.Payment(-1, person3, 8);

    let billItem1 = new BillItem_1.BillItem(-1, "Item 1", person1, 4);
    let billItem2 = new BillItem_1.BillItem(-1, "Item 2", person2, 2);
    let billItem3 = new BillItem_1.BillItem(-1, "Item 3", person2, 5);

    expense.addBillItem(billItem1);
    expense.addBillItem(billItem2);
    expense.addBillItem(billItem3);

    expense.addPayment(payment1);
    expense.addPayment(payment2);

    // Array.from(expense.billItems.values()).forEach(b => console.log(b.description + " " + b.amount.toFixed(2)));

    console.log("Debts");
    let debts = Array.from(expense.debts.values());
    debts.forEach(d => console.log(d.debtor.firstName + " owes " + d.creditor.firstName + " " + d.amount.toFixed(2)));

}

test_even_expense_debts();