import React from "react";
import {Body, Button, Content, Icon, Left, List, ListItem, Right, Text} from "native-base";
import {Alert} from "react-native";

export class ShareListComponent extends React.Component {

    //Props
    // - tripId
    // - expenseId

    constructor(props) {
        super(props);
        global.observerService.addExpenseCallback(this.props.tripId, this.props.expenseId, () => this.forceUpdate());
    }

    removeDebt(tripId, expenseId, debtId) {
        Alert.alert(
            'Delete Share',
            'Are you sure you want to delete this share?',
            [
                {
                    text: 'No', onPress: () => {
                    }, style: 'cancel'
                },
                {
                    text: 'Yes', onPress: () => {
                        try {
                            global.service.removeDebtFromExpenseById(tripId, expenseId, debtId);
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

        let expense = global.service.getExpenseById(this.props.tripId, this.props.expenseId);

        //Convert map to array
        let debts = [];
        if(expense.debts !== undefined) debts = Array.from(expense.debts.values());

        return (
            <Content>
                <List dataArray={debts} renderRow={(debt) =>
                    <ListItem icon>
                        <Left>
                            <Icon style={{color:'rgba(0,0,0,0.7)'}} name="md-cash"/>
                        </Left>
                        <Body>
                        <Text>{debt.debtor.name}</Text>
                        </Body>
                        <Right>
                            <Text>{debt.amount.toFixed(2).toString()}</Text>
                            <Button transparent onPress={() => this.removeDebt(this.props.tripId, expense.id, debt.id)}>
                                <Icon style={{color:'rgba(0,0,0,0.4)'}} name="trash"/>
                            </Button>
                        </Right>
                    </ListItem>
                }/>
            </Content>
        );

    }


}