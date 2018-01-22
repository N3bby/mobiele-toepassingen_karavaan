import {StackNavigator} from "react-navigation";

import HomeComponent from "./component/HomeComponent";
import CreateTripComponent from "./component/CreateTripComponent";
import CreateUserComponent from "./component/CreateUserComponent";
import AddUserToTripComponent from "./component/add_user_to/AddUserToTripComponent";
import CreateExpenseComponent from "./component/CreateExpenseComponent";
import {BetterTripOverviewComponent} from "./component/BetterTripOverviewComponent";
import {ExpenseOverviewComponent} from "./component/expense/ExpenseOverviewComponent";
import {TripUserPicker} from "./component/add_user_to/TripUserPicker";
import {AddPaymentComponent} from "./component/expense/AddPaymentComponent";
import {AddBillItemComponent} from "./component/expense/AddBillItemComponent";

// Add the routes in which you want to be able to use the navigator
// They will only be able to access it if you got there through navigate()
const AppNavigator = StackNavigator({
    Home: {screen: HomeComponent},
    TripOverview: {screen: BetterTripOverviewComponent},
    CreateTrip: {screen: CreateTripComponent},
    CreateUser: {screen: CreateUserComponent},
    CreateExpenseComponent: {screen: CreateExpenseComponent},
    ExpenseOverview: {screen: ExpenseOverviewComponent},
    AddUserToTrip: {screen: AddUserToTripComponent},
    TripUserPicker: {screen: TripUserPicker},
    AddPayment: {screen: AddPaymentComponent},
    AddBillItem: {screen: AddBillItemComponent}
}, {
    headerMode: "none",
});
export default AppNavigator;