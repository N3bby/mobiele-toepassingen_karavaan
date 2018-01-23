import React from "react";
import {Body, Button, Content, Icon, Left, List, ListItem, Right, Text, View} from "native-base";
import {Alert} from "react-native";

export class ExpenseListComponent extends React.Component {

    //Properties
    // - tripId : Id of the trip for which to show expenses
    // - navigation

    constructor(props) {
        super(props);
        global.observerService.addTripExpensesCallback(this.props.tripId, () => this.forceUpdate());
    }

    navigateToExpenseOverview(tripId, expenseId) {
        this.props.navigation.navigate("ExpenseOverview", {tripId: tripId, expenseId: expenseId, onChange: () => this.forceUpdate()});
    }

    removeExpense(tripId, expenseId) {
        Alert.alert(
            'Delete Expense',
            'Are you sure you want to delete this expense? All data will be lost',
            [
                {
                    text: 'No', onPress: () => {
                    }, style: 'cancel'
                },
                {
                    text: 'Yes', onPress: () => {
                        try {
                            global.service.removeExpenseFromTripById(tripId, expenseId);
                            global.saveService();
                        }
                        catch (error) {
                            alert(error);
                        }
                    }
                },
            ],
            {cancelable: false}
        );
    }

    render() {

        //Explanation for why we're wrapping all the expenses is the same as in DebtOverviewListComponent:52
        let expenses = global.service.getExpensesByTripId(this.props.tripId);
        let expenseWrappers = [];
        expenses.forEach(e => expenseWrappers.push({value: e}));

        return (
            <Content>
                <List dataArray={expenseWrappers} renderRow={(expense) => (
                    <ListItem button={true} onPress={() => this.navigateToExpenseOverview(this.props.tripId, expense.value.id)} icon>
                        <Left>
                            <Icon style={{color:'rgba(0,0,0,0.7)'}} name="md-cash"/>
                        </Left>
                        <Body>
                        <View style={{flexDirection: 'row'}}>
                            <Text numberOfLines={1} style={{flex: 1}}>{expense.value.description}</Text>
                            <Text style={{
                                marginLeft: 'auto',
                                color:'rgba(0,0,0,0.4)'
                            }}>{expense.value.expenseAmount.toFixed(2).toString()}</Text>
                        </View>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => this.removeExpense(this.props.tripId, expense.value.id)}>
                                <Icon style={{color:'rgba(0,0,0,0.4)'}} name="trash"/>
                            </Button>
                        </Right>
                    </ListItem>
                )}/>
            </Content>
        );
    }

}