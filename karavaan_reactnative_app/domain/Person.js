"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
* A Person is a class that holds information about a participant to a Trip.
* For example, a Person can be added as a participant to IExpenses, as a creditor or as a debtor.
*/
class Person {
    /**
    * Initialise a new Person.
    *
    * @param {number} [id=-1] - The ID of the new Person.
    * @param {string} [firstName=""] - The first name of the new Person.
    * @param {string} [lastName=""] - The last name of the new Person.
    *
    * @class Person
    */
    constructor(id = -1, firstName = "", lastName = "") {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    /**
    * Get the full name of the Person, created from the firstName and lastName members.
    *
    * @returns {string} The full name of the Person.
    */
    get name() {
        return this.firstName + " " + this.lastName;
    }
}
exports.Person = Person;
