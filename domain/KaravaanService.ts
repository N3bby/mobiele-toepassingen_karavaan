import { Currency } from './Currency';
import { Trip } from './Trip';
import { Person } from './Person';
import { Expense } from './Expense';

export class KaravaanService
{
    private _idCounter : number = 0;
    
    private _currencyMap : Map<string, Currency>;
    private _tripMap : Map<number, Trip>;
    
    constructor()
    {
        this.currencyMap = new Map<string, Currency>();
        this.tripMap = new Map<number, Trip>();
    }
    
    // Getters and Setters
    
    private set idCounter(newIndex : number)
    {
        this._idCounter = newIndex;
    }
    
    private get idCounter() : number
    {
        return this._idCounter;
    }
    
    get currencyMap() : Map<string, Currency>
    {
        return this._currencyMap;
    }
    
    set currencyMap(newCurrencyMap : Map<string, Currency>)
    {
        this._currencyMap = newCurrencyMap;
    }
    
    get currencies() : Array<Currency>
    {
        let currencyList = new Array<Currency>();
        
        for (let currency of this.currencyMap.values())
        {
            currencyList.push(currency);
        }
        
        return currencyList;
    }
    
    get tripMap() : Map<number, Trip>
    {
        return this._tripMap;
    }
    
    set tripMap(newTripMap : Map<number, Trip>)
    {
        this._tripMap = newTripMap;
    }
    
    get trips() : Array<Trip>
    {
        let tripList = new Array<Trip>();
        
        for (let trip of this.tripMap.values())
        {
            tripList.push(trip);
        }
        
        return tripList;
    }
    
    // Methods
    
    addCurrency(newCurrency : Currency) : Currency
    {
        this.currencyMap.set(newCurrency.name, newCurrency);
        return newCurrency;
    }
    
    getCurrency(currencyName : string) : Currency
    {
        return this.currencyMap.get(currencyName);
    }
    
    addNewTrip(name : string) : Trip
    {
        let newTrip = new Trip();
        newTrip.name = name;
        return this.addTrip(newTrip);
    }
    
    private addTrip(newTrip : Trip) : Trip
    {
        // Assign new id to the new trip if it does not have one
        if (newTrip.id < 0) newTrip.id = this.idCounter++;
        
        // Add trip to the tripMap
        this.tripMap.set(newTrip.id, newTrip);
        
        return newTrip;
    }
    
    getTripById(id : number) : Trip
    {
        return this.tripMap.get(id);
    }
    
    addNewParticipantToTripById(tripId : number, firstName : string, lastName : string) : Person
    {
        let newPerson = new Person(this.idCounter++, firstName, lastName);
        let trip = this.getTripById(tripId);
        return this.addParticipantToTrip(trip, newPerson);
    }
    
    private addParticipantToTrip(trip : Trip, person : Person) : Person
    {
        if (person.id < 0) trip.id = this.idCounter++;
        trip.addParticipant(person);
        return person;
    }
    
    getParticipantsByTripId(tripId : number) : Array<Person>
    {
        return this.getTripById(tripId).participants;
    }
    
    getParticipantById(tripId : number, participantId : number) : Person
    {
        for (let participant of this.getTripById(tripId).participants)
        {
            if (participant.id == participantId) return participant;
        }
    }
    
    addNewExpenseByTripId(tripId : number, description : string, category : string) : Expense
    {
        let newExpense = new Expense();
        newExpense.description = description;
        newExpense.category = category;
            
        return this.addExpenseToTrip(this.getTripById(tripId), newExpense);
    }
    
    private addExpenseToTrip(trip : Trip, expense : Expense) : Expense
    {
        if (expense.id < 0) expense.id = this.idCounter++;
        trip.addExpense(expense);
        return expense;
    }
    
    getExpensesByTripId(tripId : number)
    {
        return this.getTripById(tripId).expenses;
    }
    
    getExpenseById(tripId : number, expenseId : number) : Expense
    {
        for (let expense of this.getTripById(tripId).expenses)
        {
            if (expense.id == expenseId) return expense;
        }
    }
    
    addNewDebtToExpenseById(tripId : number, expenseId : number, participantId : number, amount : number) : Expense
    {
        let expense = this.getExpenseById(tripId, expenseId);
        let participant = this.getParticipantById(tripId, participantId);
        
        // Check if expense exists
        if (typeof expense === 'undefined')
        {
            // If it does not, add a new expense
            expense = this.addNewExpenseByTripId(tripId, "New Expense", "Expense");
            expense.id = expenseId;
        }
        
        // Check if this participant already exists
        if (typeof participant === 'undefined')
        {
            // If it does not, add a new participant
            participant = this.addNewParticipantToTripById(tripId, "New Participant", "");
            participant.id = participantId;
        }
        
        expense.addDebt(participant, amount);
        return expense;
    }
    
    getDebtsByExpenseId(tripId : number, expenseId : number) : Map<Person, number>
    {
        return this.getExpenseById(tripId, expenseId).expensePerPerson;
    }
    
    getDebtForParticipantByExpenseId(tripId : number, expenseId : number, participantId : number) : number
    {
        let participant = this.getParticipantById(tripId, participantId);
        return this.getDebtsByExpenseId(tripId, expenseId).get(participant);
    }
}