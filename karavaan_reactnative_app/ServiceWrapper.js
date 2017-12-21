import { KaravaanService } from "./domain/KaravaanService";
import { Person } from "./domain/Person";
import { Trip } from "./domain/Trip"

import { AsyncStorage } from 'react-native';

global.service = new KaravaanService();

global.saveService = async function()
{
    let currentInstance = global.service;
    
    try
    {
        await AsyncStorage.setItem('service', JSON.stringify(currentInstance.toDataObject()));
    }
    catch (error)
    {
        alert(error);
    }
}

global.loadService = async function()
{
    try
    {
        const jsonService = await AsyncStorage.getItem('service');
        
        if (jsonService !== null)
        {
            global.service = KaravaanService.fromDataObject(JSON.parse(jsonService));
        }
        else
        {
            global.service = new KaravaanService();
        }
    }
    catch (error)
    {
        alert(error);
    }
}