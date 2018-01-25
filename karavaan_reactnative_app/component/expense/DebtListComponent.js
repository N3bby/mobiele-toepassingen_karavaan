import React from 'react';
import {Body, Button, Content, List, ListItem, Right, Text} from "native-base";

export class DebtListComponent extends React.Component {

    //Props
    // - tripId
    // - expenseId

    constructor(props) {
        super(props);
        global.observerService.addExpenseCallback(this.props.tripId, this.props.expenseId, () => this.forceUpdate());
    }

    togglePaid(debt) {
        debt.isPaid = !debt.isPaid;
        global.saveService();
        this.forceUpdate();
    }

    render() {

        let trip = global.service.getTripById(this.props.tripId);
        let expense = global.service.getExpenseById(this.props.tripId, this.props.expenseId);

        //Convert map to array
        let debts = global.service.getDebtsByExpenseId(this.props.tripId, this.props.expenseId);
        let debtWrappers = [];
        debts.forEach(d => debtWrappers.push({value: d}));

        return (
            <Content>
                <List dataArray={debtWrappers} renderRow={(debt) =>
                    <ListItem style={{height:50}}>
                        <Body>
                        <Text style={{marginLeft: 0}}>{debt.value.debtor.name} owes {debt.value.creditor.name} {trip.convertToActiveCurrency(debt.value.amount).toFixed(2)}</Text>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => this.togglePaid(debt.value)}>
                                <Text style={{color:'rgba(0,0,0,0.7)'}}>{debt.value.isPaid ? "Undo" : "Pay"}</Text>
                            </Button>
                        </Right>
                    </ListItem>
                }/>
            </Content>
        );

    }

}