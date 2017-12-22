
export class ObserverService {

    constructor(service) {
        //Callback array/map initialization
        this._personMapCallbacks = [];
        this._tripMapCallbacks = [];
        this._tripExpensesCallbacks = new Map(); //Array of callbacks per trip
        this._tripPersonMapCallbacks = new Map(); //Array of callbacks per trip

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

        //Add the callback to our callback map. Create array if still undefined for this map
        if(this._tripExpensesCallbacks.get(tripId) === undefined) {
            this._tripExpensesCallbacks.set(tripId, []);
        }
        this._tripExpensesCallbacks.get(tripId).push(callback);

        //Create hook for the expensesMap of the correct trip
        let trip = global.service.getTripById(tripId);
        this._hookMap(trip.expenseMap, this._tripExpensesCallbacks.get(tripId));

    }

    //Add a callback for when a person is added or removed from a specific trip
    addTripPersonMapCallback(tripId, callback) {

        //Add the callback to our callback map. Create array if still undefined for this map
        if(this._tripPersonMapCallbacks.get(tripId) === undefined) {
            this._tripPersonMapCallbacks.set(tripId, []);
        }
        this._tripPersonMapCallbacks.get(tripId).push(callback);

        //Create hook for the personMap of the correct trip
        let trip = global.service.getTripById(tripId);
        this._hookMap(trip.participantMap, this._tripPersonMapCallbacks.get(tripId));

    }

    // Hooks the 'set' and 'delete' functions of a map and calls the list of callbacks
    // -------------------------------------------------------------------------------
    // - map : The map of which we should hook functions
    // - callbacks : An array of callback functions, signature: (entityThatWasAddedOrRemoved: object)
    // -------------------------------------------------------------------------------
    _hookMap(map, callbacks) {
        let callbackCallFunction = (args) => callbacks.forEach((callback) => {callback(args[0])});
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
        (function(originalFunction) {
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
