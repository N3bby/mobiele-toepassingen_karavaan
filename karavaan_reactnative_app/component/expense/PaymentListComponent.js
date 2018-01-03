import React from "react";
import {Body, Content, Icon, Left, List, ListItem, Right, Text} from "native-base";

export class PaymentListComponent extends React.Component {

    //Props
    // - tripId
    // - expenseId

    constructor(props) {
        super(props);
        global.observerService.addExpensePaymentMapCallback(this.props.tripId, this.props.expenseId, () => this.forceUpdate());
    }

    render() {

        let expense = global.service.getExpenseById(this.props.tripId, this.props.expenseId);

        //Convert map to array
        let payments = [];
        if(expense._payments !== undefined) payments = Array.from(expense._payments.values());
        if(expense.payments !== undefined) payments = Array.from(expense.payments.values());

        return (
            <Content>
                <List dataArray={payments} renderRow={(payment) =>
                    <ListItem icon>
                        <Left>
                            <Icon name="md-cash"/>
                        </Left>
                        <Body>
                        <Text>{payment.creditor.name}</Text>
                        </Body>
                        <Right>
                            <Text>{payment.amount}</Text>
                        </Right>
                    </ListItem>
                }/>
            </Content>
        );

    }

}