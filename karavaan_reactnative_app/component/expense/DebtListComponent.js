import React from 'react';
import {Content, List, ListItem, Text} from "native-base";

export class DebtListComponent extends React.Component {

    //Props
    // - tripId
    // - expenseId

    constructor(props) {
        super(props);
        global.observerService.addExpenseCallback(this.props.tripId, this.props.expenseId, () => this.forceUpdate());
    }

    render() {

        let expense = global.service.getExpenseById(this.props.tripId, this.props.expenseId);

        //Convert map to array
        let debts = global.service.getDebtsByExpenseId(this.props.tripId, this.props.expenseId);

        return (
            <Content>
                <List dataArray={debts} renderRow={(debt) =>
                    <ListItem>
                        <Text>{debt.debtor.name} owes {debt.creditor.name} {debt.amount}</Text>
                    </ListItem>
                }/>
            </Content>
        );

    }

}