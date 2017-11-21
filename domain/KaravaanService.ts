import { Currency } from './Currency';
import { Trip } from './Trip';
import { Person } from './Person';
import { IExpense } from './IExpense';
import { CurrencyService } from './CurrencyService';
import { ExpenseType } from './Expenses';
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
    
    /**
    * Set the idCounter, which is responsible for handling ID assignment in the KaravaanService.
    * @param {number} newIndex - The new starting ID.
    */
    private set idCounter(newIndex : number)
    {
        this._idCounter = newIndex;
    }
    
    /**
    * Get the idCounter, which is responsible for handling ID assignment in the KaravaanService.
    * @returns {number} The currenct ID.
    */
    private get idCounter() : number
    {
        return this._idCounter;
    }
    
    /**
    * Get the CurrencyService, which is used for retrieving a list of currencies.
    * @returns {CurrencyService} The current CurrencyService.
    */
    private get currencyService() : CurrencyService
    {
        return this._currencyService;
    }
    
    /**
    * Set the CurrencyService, which is used for retrieving a list of currencies.
    * @param {CurrencyService} newCurrencyService - The new CurrencyService.
    */
    private set currencyService(newCurrencyService : CurrencyService)
    {
        this._currencyService = newCurrencyService;
    }
    
    /**
    * Get an Array of the currencies.
    * @returns {Array<Currency>} An Array of currencies.
    */
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
    
    /**
    * Get a Map of the Trips that this KaravaanService contains.
    * @returns {Map<number, Trip>} A Map of all the Trips.
    */
    get tripMap() : Map<number, Trip>
    {
        return this._tripMap;
    }
    
    /**
    * Set the Map of Trips that this KaravaanService contains.
    * @param {Map<number, Trip>} newTripMap - The new map containing all the Trips.
    */
    set tripMap(newTripMap : Map<number, Trip>)
    {
        this._tripMap = newTripMap;
    }
    
    /**
    * Get an Array of all the Trips.
    * @returns {Array<Trip>} An Array containing all the Trips.
    */
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
    
    /**
    * Get a currency from the CurrencyService.
    * @param {string} currencyName - The name of the desired currency.
    * @returns {Currency} The currency returned by the CurrencyService.
    */
    getCurrency(currencyName : string) : Currency
    {
        return this.currencyService.currencies.get(currencyName);
    }
    
    /**
    * Add a new Trip by name.
    * @param {string} name - The name of the Trip to be created.
    * @returns {Trip} The created Trip, with all properties set to the default values and an ID assigned by the KaravaanService.
    */
    addNewTrip(name : string) : Trip
    {
        let newTrip = new Trip();
        newTrip.name = name;
        return this.addTrip(newTrip);
    }
    
    /**
    * Add a trip by object, which can be used to replace trips after updating properties.
    * @param {Trip} newTrip - The Trip object to be added or updated.
    * @returns {Trip} The added Trip, with an assigned ID if it didn't have one already.
    */
    private addTrip(newTrip : Trip) : Trip
    {
        // Assign new id to the new trip if it does not have one
        if (newTrip.id < 0) newTrip.id = this.idCounter++;
        
        // Add trip to the tripMap
        this.tripMap.set(newTrip.id, newTrip);
        
        return newTrip;
    }
    
    /**
    * Get a trip by its ID.
    * @param {number} id - The id of the desired Trip.
    * @returns {Trip} The desired trip, or 'undefined' if none was found.
    */
    getTripById(id : number) : Trip
    {
        return this.tripMap.get(id);
    }
    
    /**
    * Add a new participant to the Trip by using the Trips ID.
    * @param {number} tripId - The ID of the Trip this participant has to be added to.
    * @param {string} firstName - The first name of the participant to be added.
    * @param {string} lastName - The last name of the participant to be added.
    * @returns {Person} The newly created and added participant, with a new ID assigned to it.
    */
    addNewParticipantToTripById(tripId : number, firstName : string, lastName : string) : Person
    {
        let newPerson = new Person(this.idCounter++, firstName, lastName);
        let trip = this.getTripById(tripId);
        return this.addParticipantToTrip(trip, newPerson);
    }
    
    /**
    * Add a participant to a Trip by using objects.
    * @param {Trip} trip - The Trip where the participant should be added to.
    * @param {Person} person - The Person object that needs to be added to the Trip.
    * @returns {Person} The person object, with an assigned ID if it didn't have one yet.
    */
    private addParticipantToTrip(trip : Trip, person : Person) : Person
    {
        if (person.id < 0) trip.id = this.idCounter++;
        trip.addParticipant(person);
        return person;
    }
    
    /**
    * Get an Array of all the participants for a given Trip by using the Trips ID.
    *
    * @param {number} tripId - The ID of the desired Trip.
    *
    * @returns {Array<Person>} An Array containing all the participants for Trip with given ID.
    */
    getParticipantsByTripId(tripId : number) : Array<Person>
    {
        return this.getTripById(tripId).participants;
    }
    
    /**
    * Get a single participant from a Trip by using the participants ID and the Trips ID.
    *
    * @param {number} tripId - The ID of the Trip.
    * @param {number} participantId - The ID of the desired participant.
    *
    * @returns {Person} The desired participant.
    */
    getParticipantById(tripId : number, participantId : number) : Person
    {
        for (let participant of this.getTripById(tripId).participants)
        {
            if (participant.id == participantId) return participant;
        }
        
        // No participants found
        throw new Error("Participant with id " + participantId + " does not exist for Trip with id " + tripId);
    }
    
    /**
    * Add a new Expense to a Trip by using the Trips ID and specifying the Expenses information.
    *
    * @param {number} tripId - The ID of the Trip this Expense needs to be added to.
    * @param {ExpenseType} expenseType - The ExpenseType of the Expense. Types can be found in the ExpenseType enumeration.
    * @param {string} description - The description for the Expense.
    * @param {string} category - The category for the Expense.
    *
    * @returns {IExpense} The newly created IExpense of given ExpenseType.
    */
    addNewExpenseByTripId(tripId : number, expenseType : ExpenseType, description : string, category : string) : IExpense
    {
        let newExpense;
        
        switch(expenseType)
        {
            case ExpenseType.EvenExpense:
                newExpense = new EvenExpense();
            break;
        }
        
        newExpense.description = description;
        newExpense.category = category;
            
        return this.addExpenseToTrip(this.getTripById(tripId), newExpense);
    }
    
    /**
    * Add an IExpense to a Trip by using objects.
    *
    * @param {Trip} trip - The Trip this IExpense should be added to.
    * @param {IExpense} expense - The IExpense to add to the Trip.
    *
    * @returns {IExpense} The newly added IExpense, with an assigned ID if it didn't have one already.
    */
    private addExpenseToTrip(trip : Trip, expense : IExpense) : IExpense
    {
        if (expense.id < 0) expense.id = this.idCounter++;
        trip.addExpense(expense);
        return expense;
    }
    
    /**
    * Get an Array of IExpenses by the ID of the Trip this IExpenses belong to.
    *
    * @param {number} tripId - The ID of the Trip.
    *
    * @returns {Array<IExpense>} An Array containing all of the IExpenses for Trip with given ID.
    */
    getExpensesByTripId(tripId : number) : Array<IExpense>
    {
        return this.getTripById(tripId).expenses;
    }
    
    /**
    * Get an IExpense by its ID and the ID of the Trip it belongs to.
    * 
    * @param {number} tripId - The ID of the Trip this IExpense belongs to.
    * @param {number} expenseId - The ID of the desired IExpense.
    *
    * @returns {IExpense} The desired IExpense.
    */
    getExpenseById(tripId : number, expenseId : number) : IExpense
    {
        for (let expense of this.getTripById(tripId).expenses)
        {
            if (expense.id == expenseId) return expense;
        }
    }
    
    /**
    * Add a Debt to a certain IExpense by using its ID, the ID of the Trip it belongs to and the ID of the participant whose debt this is.
    * This method will throw an Error when no IExpense with given ID is found.
    * This method will throw an Error when no participant with given ID is found.
    *
    * @param {number} tripId - The ID of the Trip the IExpense belongs to.
    * @param {number} expenseId - The ID of the IExpense this Debt should be added to.
    * @param {number} participantId - The ID of the participant this debt belongs to. This will be the debtor in this newly created Debt object.
    * @param {number} amount - The amount of the Debt.
    * 
    * @returns {Debt} The newly created and added Debt, with an ID assigned to it.
    */
    addNewDebtToExpenseById(tripId : number, expenseId : number, participantId : number, amount : number) : IExpense
    {
        let expense = this.getExpenseById(tripId, expenseId);
        let participant = this.getParticipantById(tripId, participantId);
        
        // Check if expense exists
        if (typeof expense === 'undefined')
        {
            // If it does not, throw an Error
            throw new Error("Expense with id " + expenseId + " does not exist.");
            
        }
        
        // Check if this participant already exists
        if (typeof participant === 'undefined')
        {
            // If it does not, throw an Error
            throw new Error("Participant with id " + participantId + " does not exist in current Trip.");
        }
        
        // Create debt and add to trip
        let newDebt = new Debt();
        newDebt.debtor = participant;
        newDebt.amount = amount;
        expense.addDebt(newDebt);
        return expense;
    }
    
    /**
    * Get an Array of Debts by the ID of the IExpense it belongs to and the ID of the Trip the IExpense belongs to.
    *
    * @param {number} tripId - The ID of the Trip.
    * @param {number} expenseId - The ID of the IExpense.
    *
    * @returns {Array<Debt>} An Array of all debts of this IExpense.
    */
    getDebtsByExpenseId(tripId : number, expenseId : number) : Array<Debt>
    {
        return Array.from(this.getExpenseById(tripId, expenseId).debts.values());
    }
    
    /**
    * Get an Array of all the Debts of a certain participant by using its ID, the ID of the IExpense these Debts belong to and the ID of the Trip this IExpense belongs to.
    *
    * @param {number} tripId - The ID of the Trip this IExpense belongs to.
    * @param {number} expenseId - The ID of the IExpense these Debts belong to.
    * @param {number} participantId - The ID of the participant these Debts belong to.
    *
    * @param {Array<Debt>} An Array with the Debts for this participant.
    */
    getDebtsForParticipantByExpenseId(tripId : number, expenseId : number, participantId : number) : Array<Debt>
    {
        let expense = this.getExpenseById(tripId, expenseId);
        let participant = this.getParticipantById(tripId, participantId);
        
        let debtList = new Array<Debt>();
        
        for (let debt of expense.debts.values())
        {
            if (debt.debtor === participant) debtList.push(debt);
        }
        
        return debtList;
    }
}