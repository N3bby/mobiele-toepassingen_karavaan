# Updating UI Automatically

## Problem

We use normal arrays and maps to save entities in our domain.
This makes it so we (and react-native) can't observe changes to them.

Using a little hack (overriding mutation methods) we can now easily do this.

## Using the ObserverService

You'll find a new global variable 'global.observerService'

This object can currently observe changes in tripMap and personMap and will execute a list of callbacks for each of them

The callback will pass the new entity as an argument in case you want to use it.

Example

```
//Some component's constructor
constructor() {
 	 super();
  
  	//With an anonymous function (entity argument ignored here
  	global.observerService.addPersonMapCallback(() => this.forceUpdate())
  
  	//Using another function (with entity argument here
  	global.observerService.addPersonMapCallback(someOtherFunction);
  
}

someOtherFunction(person) {
 	alert(person.firstName);
  	this.forceUpdate();
}
```
