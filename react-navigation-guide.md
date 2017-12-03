# react-navigation
## Intro
Due to the way our project is set up, we have to do some weird things to get navigation working. This document will cover some conventions.

## Navigation object
In order to navigate to a new screen, we need acces to a navigation object.

This navigation object is injected into your react component if you instantiate that component through react-navigation calls (into this.props.navigation)

Also note that you cannot use this object inside the constructor of a component since it's injected later.

A good example of this is our HomeComponent which is instantiated by the AppNavigator

## New routes

### Creating a route

In order to be able to navigate to a screen, it must be added to the AppNavigator.

Upon opening this file, you will be greeted by the following code:

```
const AppNavigator = StackNavigator({
    Home: { screen: HomeComponent },
    TripOverview: { screen: TripOverviewComponent },
}, {
    headerMode: "none",
});
```

To add a new route ('Something' in this case), do the following

```
const AppNavigator = StackNavigator({
    Home: { screen: HomeComponent },
    TripOverview: { screen: TripOverviewComponent },
    Something: { screen: SomethingComponent },
}, {
    headerMode: "none",
});
```

### Navigation

You can then navigate to the new page using
```
this.props.navigation.navigate("Something");
```

Going back to the previous page is also possible
```
this.props.navigation.goBack();
```

Passing parameters through navigate calls is something that we still need to research

## Passing navigation object to child components

Since child components are instantiated by our own code, react-navigation will not inject the navigation object into them.

I propose this method to fix that problem:

```
render() {

	var someChildComponent = new someChildComponent();
    if(someChildComponent.props === undefined) someChildComponent.props = {};
    someChildComponent.props.navigation = this.props.navigation;

	return (
    	<Container>
        	{someChildComponent.render()}
        </Container>
    );
}
```

You can also do the instantiation of the object in the constructor (see example HomeComponent)


Passing the navigation object will always have to be done in the render method I'm afraid.