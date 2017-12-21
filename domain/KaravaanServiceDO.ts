import { KaravaanService } from './KaravaanService';
import { Person } from './Person';
import { TripDO } from './TripDO';
import { Currency } from './Currency';

export class KaravaanServiceDO
{
    idCounter : number;
    persons = new Array<any>();
    trips = new Array<any>();
    currencies = new Array<any>();
}