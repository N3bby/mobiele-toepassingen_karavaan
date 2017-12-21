
export class ObserverService {

    constructor(service) {
        this._observedService = service;
        this._personMapObservers = [];
        this._tripMapObservers = [];
        this._tripExpensesObservers = new Map(); //This is a map since every trip has its own array of expenses

        this._applyObserverables()
    }

    _applyObserverables() {

        this._applyObservablePersonMap();
        this._applyObservableTripMap();

    }

    //Applies only for set method (we agreed that people wouldn't be removed?)
    _applyObservablePersonMap() {

        let observerService = this; //So we can access 'this' within the lambda

        this._observedService.personMap.set = (id, person) => {
            Map.prototype.set.apply(observerService._observedService.personMap, [id, person]);
            for(let i = 0; i < observerService._personMapObservers.length; i++) {
                observerService._personMapObservers[i](person);
            }
        };

    }

    //Applies for both set and delete
    _applyObservableTripMap() {

        let observerService = this; //So we can access 'this' within the lambda

        this._observedService.tripMap.set = (id, trip) => {
            Map.prototype.set.apply(observerService._observedService.tripMap, [id, trip]);
            for(let i = 0; i < observerService._tripMapObservers.length; i++) {
                observerService._tripMapObservers[i](trip);
            }
        };

        this._observedService.tripMap.delete = (id) => {
            Map.prototype.delete.apply(observerService._observedService.tripMap, [id]);
            for(let i = 0; i < observerService._tripMapObservers.length; i++) {
                observerService._tripMapObservers[i]();
            }
        };

    }

    addPersonMapObserver(callback) {
        this._personMapObservers.push(callback);
    }

    addTripMapObserver(callback) {
        this._tripMapObservers.push(callback);
    }

    //Bit more complicated than the rest
    addTripExpensesObserver(tripId, callback) {

        let trip = global.service.getTripById(tripId);

        //If the array for this trip is not being observed, add an observer for it
        //And initialize the array
        //Can probably be made a bit shorter by removing the duplicate code
        if(this._tripExpensesObservers.get(tripId) === undefined) {
            //For set
            trip.expenseMap.set = (id, expense) => {
                Map.prototype.set.apply(trip.expenseMap, [id, expense]);
                let expensesMapCallbacksForTrip = observerService._tripExpensesObservers.get(tripId); //Fetch array here to simplify syntax in the next bit
                for (let i = 0; i < expensesMapCallbacksForTrip.length; i++) {
                    expensesMapCallbacksForTrip[i](expense);
                }
            };
            //For delete
            trip.expenseMap.delete = (id, expense) => {
                Map.prototype.delete.apply(trip.expenseMap, [id, expense]);
                let expensesMapCallbacksForTrip = observerService._tripExpensesObservers.get(tripId);
                for (let i = 0; i < expensesMapCallbacksForTrip.length; i++) {
                    expensesMapCallbacksForTrip[i](expense);
                }
            };
            this._tripExpensesObservers.set(tripId, []);
        }

        //Add the callback
        this._tripExpensesObservers.get(tripId).push(callback);

    }

}