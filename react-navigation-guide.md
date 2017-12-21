# react-navigation

## Navigation object
In order to navigate to a new screen, we need acces to a navigation object.

This navigation object is injected into your react component if you instantiate that component through react-navigation calls (into this.props.navigation)

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

## Passing parameters

Passing parameters is pretty easy
Can be done like in the example

```
render() {

    	return (
    	<Container>
        	<SomeComponent prop1={"somestring"} prop2={2} navigation={this.props.navigation)/>
        </Container>
    );
}
```

Each property will be available in the child component using 'this.props.*'

Note that properties aren't available for use in the constructor unless you specify it like this:
```
constructor(props) {
	super(props)l
	//You can use this.props.* here now
}
```
