import {KaravaanService} from "./domain/KaravaanService";
import {Person} from "./domain/Person";
import {Trip} from "./domain/Trip"

import {AsyncStorage} from 'react-native';
import {ObserverService} from "./ObserverService";

global.service = new KaravaanService();

global.saveService = async function () {
    let currentInstance = global.service;

    try {
        await AsyncStorage.setItem('service', JSON.stringify(currentInstance.toDataObject()));
    }
    catch (error) {
        alert(error);
    }
}

global.loadService = async function () {
    try {
        const jsonService = await AsyncStorage.getItem('service');

        if (jsonService !== null) {
            global.service = KaravaanService.fromDataObject(JSON.parse(jsonService));
        }
        else {
            global.service = new KaravaanService();
        }
        global.observerService = new ObserverService(global.service);
    }
    catch (error) {
        alert(error);
    }
}

//Can be used if you want to clear out the entire storage (debug purposes only ofc)
global.clearService = async function () {

    try {
        AsyncStorage.clear();
    }
    catch (error) {
        alert(error);
    }

}