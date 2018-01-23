
export class DebtUtility {

    //Combines debts where creditor and debtor match
    static getDebtsForUserCreditor(tripId: number, creditor) {

        //Get all debts
        let debts = DebtUtility._getAllDebtsForTrip(tripId);
        //Filter by creditor and return
        return debts.filter((debt) => debt.creditor.id === creditor.id);

    }

    static getDebtsForUserDebtor(tripId: number, debtor) {

        //Get all debts
        let debts = DebtUtility._getAllDebtsForTrip(tripId);

        //Filter by debtor and return
        return debts.filter((debt) => debt.debtor.id === debtor.id);

    }

    static _getAllDebtsForTrip(tripId: number) {
        //Get all expenses
        let expenses = global.service.getExpensesByTripId(tripId);
        //Extract all debts
        let debts = [];
        for (let expense of expenses) {
            let expenseDebts = global.service.getDebtsByExpenseId(tripId, expense.id);
            for (let debt of expenseDebts) {
                debts.push(debt);
            }
        }
        return debts;
    }

}