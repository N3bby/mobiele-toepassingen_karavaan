import * as ExpenseType_1 from "./domain/ExpenseType";

export class ObserverService {

    constructor(service) {
        //Callback array/map initialization
        this._personMapCallbacks = [];
        this._tripMapCallbacks = [];
        this._tripExpensesCallbacks = new Map(); //Array of callbacks per trip
        this._tripPersonMapCallbacks = new Map(); //Array of callbacks per trip

        //Key is {tripId, expenseId}, value is array of callback functions
        this._paymentMapCallbacks = new Map();
        this._participantMapCallbacks = new Map();

        //Apply hooks
        this._applyHooks()
    }

    _applyHooks() {
        this._hookMap(global.service.personMap, this._personMapCallbacks);
        this._hookMap(global.service.tripMap, this._tripMapCallbacks);
    }

    //Add a callback for when a person is added or removed
    addPersonMapCallback(callback) {
        this._personMapCallbacks.push(callback);
    }

    //Add a callback for when a trip is added or removed
    addTripMapCallback(callback) {
        this._tripMapCallbacks.push(callback);
    }

    //Add a callback for when an expense is added or removed from a specific trip
    addTripExpensesCallback(tripId, callback) {

        //Create callback array and hook if still undefined
        if (this._tripExpensesCallbacks.get(tripId) === undefined) {
            this._tripExpensesCallbacks.set(tripId, []);

            //Create hook for the expensesMap of the correct trip
            let trip = global.service.getTripById(tripId);
            this._hookMap(trip.expenseMap, this._tripExpensesCallbacks.get(tripId));
        }
        //Add new callback
        this._tripExpensesCallbacks.get(tripId).push(callback);

    }

    //Add a callback for when a person is added or removed from a specific trip
    addTripPersonMapCallback(tripId, callback) {

        //Create callback array and hook if still undefined
        if (this._tripPersonMapCallbacks.get(tripId) === undefined) {
            this._tripPersonMapCallbacks.set(tripId, []);

            //Create hook for the expensesMap of the correct trip
            let trip = global.service.getTripById(tripId);
            this._hookMap(trip.participantMap, this._tripPersonMapCallbacks.get(tripId));
        }
        //Add new callback
        this._tripPersonMapCallbacks.get(tripId).push(callback);

    }

    addExpensePaymentMapCallback(tripId, expenseId, callback) {

        //Create callback array and hook if still undefined
        let key = {tripId: tripId, expenseId: expenseId};
        if (this._paymentMapCallbacks.get(key) === undefined) {
            this._paymentMapCallbacks.set(key, []);

            //Apply hook
            let expense = global.service.getExpenseById(tripId, expenseId);

            //Some expense types use a different name for their internal payments map.
            //I don't want to break the domain code by refactoring, so I'm checking for all the cases here
            if (expense._payments !== undefined) this._hookMap(expense._payments, this._paymentMapCallbacks.get(key));
            if (expense.payments !== undefined) this._hookMap(expense.payments, this._paymentMapCallbacks.get(key));
        }

        //Add new callback
        this._paymentMapCallbacks.get(key).push(callback);

    }

    addExpenseParticipantMapCallback(tripId, expenseId, callback) {

        //Create callback array and hook if still undefined
        let key = {tripId: tripId, expenseId: expenseId};
        if (this._participantMapCallbacks.get(key) === undefined) {
            this._participantMapCallbacks.set(key, []);

            //Apply hook
            let expense = global.service.getExpenseById(tripId, expenseId);

            //Behaviour for types of expenses is somewhat different
            if(expense.expenseType === ExpenseType_1.ExpenseType.EvenExpense) {
                this._hookMap(expense._debts, this._participantMapCallbacks.get(key))
            } else if(expense.expenseType === ExpenseType_1.ExpenseType.ShareExpense) {
                this._hookMap(expense.payments, this._participantMapCallbacks.get(key))
            } else if(expense.expenseType === ExpenseType_1.ExpenseType.BillExpense) {
                this._hookMap(expense.billItems, this._participantMapCallbacks.get(key));
            }

        }

        //Add new callback
        this._participantMapCallbacks.get(key).push(callback);

    }

    // Hooks the 'set' and 'delete' functions of a map and calls the list of callbacks
    // -------------------------------------------------------------------------------
    // - map : The map of which we should hook functions
    // - callbacks : An array of callback functions, signature: (entityThatWasAddedOrRemoved: object)
    // -------------------------------------------------------------------------------
    _hookMap(map, callbacks) {
        let callbackCallFunction = (args) => callbacks.forEach((callback) => {
            callback(args[0])
        });
        this._hookFunction(map, 'set', callbackCallFunction);
        this._hookFunction(map, 'delete', callbackCallFunction);
    }

    // Hooks the function of an object and calls a given callback
    // ----------------------------------------------------------
    // - object : The object of which you want to hook a function
    // - functionName : The function to hook
    // - callback : Callback function to execute
    // ----------------------------------------------------------
    _hookFunction(object, functionName, callback) {
        //Override function definition (in a closure)
        (function (originalFunction) {
            //Actually override the original function
            object[functionName] = function () {
                //Get the return value of the original function
                let returnValue = originalFunction.apply(this, arguments);
                //Call callback
                callback(arguments, returnValue);
                //Make sure wer also return the return value for functions that have one
                return returnValue;
            };
        }(object[functionName])); //Call the override function
    }

}
