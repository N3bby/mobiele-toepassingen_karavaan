
export class ObserverService {

    constructor(service) {
        this._observedService = service;
        this._personMapObservers = [];
        this._tripMapObservers = [];
        this._tripExpensesObservers = {}; //This is a map since every trip has its own array of expenses

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

    // addTripExpensesObserver(tripId, callback) {
    //     let trip = global.service.getTripById(tripId);
    //
    //     Map.prototype.set
    //
    // }

}