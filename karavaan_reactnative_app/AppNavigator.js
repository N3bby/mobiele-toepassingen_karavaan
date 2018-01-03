import {StackNavigator} from "react-navigation";

import HomeComponent from "./component/HomeComponent";
import CreateTripComponent from "./component/CreateTripComponent";
import CreateUserComponent from "./component/CreateUserComponent";
import AddUserToTripComponent from "./component/add_user_to/AddUserToTripComponent";
import CreateExpenseComponent from "./component/CreateExpenseComponent";
import {BetterTripOverviewComponent} from "./component/BetterTripOverviewComponent";
import {ExpenseOverviewComponent} from "./component/expense/ExpenseOverviewComponent";
import {AddUserToExpenseComponent} from "./component/add_user_to/AddUserToExpenseComponent";
import {AddUserToPaymentComponent} from "./component/add_user_to/AddUserToPaymentComponent";
import {AddPaymentComponent} from "./component/expense/AddPaymentComponent";

// Add the routes in which you want to be able to use the navigator
// They will only be able to access it if you got there through navigate()
const AppNavigator = StackNavigator({
    Home: {screen: HomeComponent},
    TripOverview: {screen: BetterTripOverviewComponent},
    CreateTrip: {screen: CreateTripComponent},
    CreateUser: {screen: CreateUserComponent},
    CreateExpenseComponent: {screen: CreateExpenseComponent},
    AddUserToTrip: {screen: AddUserToTripComponent},
    ExpenseOverview: {screen: ExpenseOverviewComponent},
    AddUserToExpense: {screen: AddUserToExpenseComponent},
    AddUserToPayment: {screen: AddUserToPaymentComponent},
    AddPayment: {screen: AddPaymentComponent}
}, {
    headerMode: "none",
});
export default AppNavigator;