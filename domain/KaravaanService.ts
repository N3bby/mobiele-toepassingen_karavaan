import { Currency } from './Currency';
import { Trip } from './Trip';
import { Person } from './Person';
import { IExpense } from './IExpense';
import { CurrencyService } from './CurrencyService';
import { Expenses } from './Expenses';
import { EvenExpense } from './EvenExpense';
import { Debt } from './Debt';

export class KaravaanService
{
    private _idCounter : number = 0;
    
    private _tripMap : Map<number, Trip>;
    private _currencyService : CurrencyService;
    
    constructor()
    {
        this.tripMap = new Map<number, Trip>();
        this.currencyService = new CurrencyService();
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
    
    private get currencyService() : CurrencyService
    {
        return this._currencyService;
    }
    
    private set currencyService(newCurrencyService : CurrencyService)
    {
        this._currencyService = newCurrencyService;
    }
    
    get currencies() : Array<Currency>
    {
        let currencyList = new Array<Currency>();
        let currencyMap = this.currencyService.currencies;
         
        for (let currency of currencyMap.values())
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
    
    getCurrency(currencyName : string) : Currency
    {
        return this.currencyService.currencies.get(currencyName);
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
    
    addNewExpenseByTripId(tripId : number, expenseType : Expenses, description : string, category : string) : IExpense
    {
        let newExpense;
        
        if (expenseType == Expenses.EvenExpense)
        {
            newExpense = new EvenExpense();
        }
        newExpense.description = description;
        newExpense.category = category;
            
        return this.addExpenseToTrip(this.getTripById(tripId), newExpense);
    }
    
    private addExpenseToTrip(trip : Trip, expense : IExpense) : IExpense
    {
        if (expense.id < 0) expense.id = this.idCounter++;
        trip.addExpense(expense);
        return expense;
    }
    
    getExpensesByTripId(tripId : number) : Array<IExpense>
    {
        return this.getTripById(tripId).expenses;
    }
    
    getExpenseById(tripId : number, expenseId : number) : IExpense
    {
        for (let expense of this.getTripById(tripId).expenses)
        {
            if (expense.id == expenseId) return expense;
        }
    }
    
    addNewDebtToExpenseById(tripId : number, expenseId : number, participantId : number, amount : number) : IExpense
    {
        let expense = this.getExpenseById(tripId, expenseId);
        let participant = this.getParticipantById(tripId, participantId);
        
        // Check if expense exists
        if (typeof expense === 'undefined')
        {
            // If it does not, add a new expense
            expense = this.addNewExpenseByTripId(tripId, Expenses.ShareExpense, "New Expense", "Expense");
            expense.id = expenseId;
        }
        
        // Check if this participant already exists
        if (typeof participant === 'undefined')
        {
            // If it does not, add a new participant
            participant = this.addNewParticipantToTripById(tripId, "New Participant", "");
            participant.id = participantId;
        }
        
        // Create debt and add to trip
        let newDebt = new Debt();
        expense.addDebt(newDebt);
        return expense;
    }
    
    getDebtsByExpenseId(tripId : number, expenseId : number) : Map<Person, number>
    {
        return this.getExpenseById(tripId, expenseId).debtByDebtor;
    }
    
    getDebtForParticipantByExpenseId(tripId : number, expenseId : number, participantId : number) : number
    {
        let participant = this.getParticipantById(tripId, participantId);
        return this.getDebtsByExpenseId(tripId, expenseId).get(participant);
    }
}