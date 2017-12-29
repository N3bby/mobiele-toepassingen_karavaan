import { StackNavigator } from "react-navigation";

import HomeComponent from "./component/HomeComponent";
import CreateTripComponent from "./component/CreateTripComponent";
import CreateUserComponent from "./component/CreateUserComponent";
import addUserToTripComponent from "./component/AddUserToTripComponent";
import CreateExpenseComponent from "./component/CreateExpenseComponent";
import {BetterTripOverviewComponent} from "./component/BetterTripOverviewComponent";

// Add the routes in which you want to be able to use the navigator
// They will only be able to access it if you got there through navigate()
const AppNavigator = StackNavigator({
    Home: { screen: HomeComponent },
    TripOverview: { screen: BetterTripOverviewComponent },
    CreateTrip:{screen:CreateTripComponent},
    CreateUser:{screen:CreateUserComponent},
    CreateExpenseComponent : { screen:CreateExpenseComponent },
    addUserToTrip: {screen:addUserToTripComponent}
}, {
    headerMode: "none",
});
export default AppNavigator;