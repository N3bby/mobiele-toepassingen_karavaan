
export class ObserverService {

    constructor(service) {
        this._observedService = service;
        this._personMapObservers = [];
        this._tripMapObservers = [];

        this._applyObserverable()
    }

    _applyObserverable() {

        let observerService = this; //So we can access 'this' within the lambda

        //personMap
        this._observedService.personMap.set = (id, person) => {
            Map.prototype.set.apply(observerService._observedService.personMap, [id, person]);
            for(let i = 0; i < observerService._personMapObservers.length; i++) {
                observerService._personMapObservers[i](person);
            }
        };

        //tripMap
        this._observedService.tripMap.set = (id, trip) => {
            Map.prototype.set.apply(observerService._observedService.tripMap, [id, trip]);
            for(let i = 0; i < observerService._tripMapObservers.length; i++) {
                observerService._tripMapObservers[i](trip);
            }
        }

    }

    addPersonMapObserver(callback) {
        this._personMapObservers.push(callback);
    }

    addTripMapObserver(callback) {
        this._tripMapObservers.push(callback);
    }

}