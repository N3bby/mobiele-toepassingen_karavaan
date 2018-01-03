import React from "react";
import {Body, Button, Content, Icon, Left, List, ListItem, Right, Text, View} from "native-base";

export class ExpenseListComponent extends React.Component {

    //Properties
    // - tripId : Id of the trip for which to show expenses
    // - navigation

    constructor(props) {
        super(props);
        global.observerService.addTripExpensesCallback(this.props.tripId, () => this.forceUpdate());
    }

    navigateToExpenseOverview(tripId, expenseId) {
        this.props.navigation.navigate("ExpenseOverview", {tripId: tripId, expenseId: expenseId});
    }

    removeExpense(tripId, expenseId) {
        global.service.removeExpenseFromTripById(tripId, expenseId);
        global.saveService();
    }

    render() {
        return (
            <Content>
                <List dataArray={global.service.getExpensesByTripId(this.props.tripId)} renderRow={(expense) => (
                    <ListItem key={expense.id} button={false}
                              onPress={() => this.navigateToExpenseOverview(this.props.tripId, expense.id)} icon>
                        <Left>
                            <Icon name="cash"/>
                        </Left>
                        <Body>
                        <View style={{flexDirection: 'row'}}>
                            <Text numberOfLines={1} style={{flex: 1}}>{expense.description}</Text>
                            <Text style={{
                                marginLeft: 'auto',
                                fontWeight: 'bold',
                                fontSize: 17
                            }}>{expense.expenseAmount}</Text>
                        </View>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => this.removeExpense(this.props.tripId, expense.id)}>
                                <Icon name="trash"/>
                            </Button>
                        </Right>
                    </ListItem>
                )}/>
            </Content>
        );
    }

}