import * as ExpenseType_1 from "./domain/ExpenseType";

export class ObserverService {

    constructor(service) {
        //Callback array/map initialization
        this._personMapCallbacks = [];
        this._tripMapCallbacks = [];
        this._tripExpensesCallbacks = new Map(); //Array of callbacks per trip
        this._tripPersonMapCallbacks = new Map(); //Array of callbacks per trip

        //Key is {tripId, expenseId}, value is array of callback functions
        this._expenseCallbacks = new Map();

        //Key is 'id'
        this._arbitraryCallbacksIdCounter = 0;
        this._arbitraryCallbacks = new Map();

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

    //Binds to everything from expense
    addExpenseCallback(tripId, expenseId, callback) {

        //Create callback array and hook if still undefined
        let key = {tripId: tripId, expenseId: expenseId};
        if (this._expenseCallbacks.get(key) === undefined) {
            this._expenseCallbacks.set(key, []);

            let expense = global.service.getExpenseById(tripId, expenseId);

            this._hookMap(expense._payments, this._expenseCallbacks.get(key));
            if(expense._participants !== undefined) this._hookMap(expense._participants, this._expenseCallbacks.get(key));
            if(expense._billItems !== undefined) this._hookMap(expense._billItems, this._expenseCallbacks.get(key));

        }

        //Add new callback
        this._expenseCallbacks.get(key).push(callback);

    }

    //Arbitrary callbacks, for when you can't pass stuff by reference through a navigation action ;)
    //Returns callback id
    addArbitraryCallback(callback) {
        let id = this._arbitraryCallbacksIdCounter++;
        this._arbitraryCallbacks.set(id, callback);
        return id;
    }

    getArbitraryCallback(id) {
        return this._arbitraryCallbacks.get(id);
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
