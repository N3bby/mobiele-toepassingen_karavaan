import React from "react";
import {Body, Button, Content, Icon, Left, List, ListItem, Right, Text} from "native-base";
import {Alert} from "react-native";

export class PaymentListComponent extends React.Component {

    //Props
    // - tripId
    // - expenseId

    constructor(props) {
        super(props);
        global.observerService.addExpenseCallback(this.props.tripId, this.props.expenseId, () => this.forceUpdate());
    }

    removePayment(tripId, expenseId, paymentId) {
        Alert.alert(
            'Delete Payment',
            'Are you sure you want to delete this payment?',
            [
                {
                    text: 'No', onPress: () => {
                    }, style: 'cancel'
                },
                {
                    text: 'Yes', onPress: () => {
                        try {
                            global.service.removePaymentFromExpenseById(tripId, expenseId, paymentId);
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

        let trip = global.service.getTripById(this.props.tripId);
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
                            <Icon style={{color:'rgba(0,0,0,0.7)'}} name="md-cash"/>
                        </Left>
                        <Body>
                        <Text>{payment.creditor.name}</Text>
                        </Body>
                        <Right>
                            <Text>{trip.convertToActiveCurrency(payment.amount).toFixed(2).toString()} {trip.activeCurrency}</Text>
                            <Button transparent onPress={() => this.removePayment(this.props.tripId, expense.id, payment.id)}>
                                <Icon style={{color:'rgba(0,0,0,0.4)'}} name="trash"/>
                            </Button>
                        </Right>
                    </ListItem>
                }/>
            </Content>
        );

    }


}