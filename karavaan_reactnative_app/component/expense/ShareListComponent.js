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

    removeShare(tripId, expenseId, shareId) {
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
                            global.service.removeBillItemFromExpenseById(tripId, expenseId, shareId);
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
        let shares = [];
        if(expense.debts !== undefined) shares = Array.from(expense.billItems.values());

        return (
            <Content>
                <List dataArray={shares} renderRow={(share) =>
                    <ListItem icon>
                        <Left>
                            <Icon style={{color:'rgba(0,0,0,0.7)'}} name="md-cash"/>
                        </Left>
                        <Body>
                        <Text>{share.debtor.name}</Text>
                        </Body>
                        <Right>
                            <Text>{trip.convertToActiveCurrency(share.amount).toFixed(2).toString()} {trip.activeCurrency}</Text>
                            <Button transparent onPress={() => this.removeShare(this.props.tripId, expense.id, share.id)}>
                                <Icon style={{color:'rgba(0,0,0,0.4)'}} name="trash"/>
                            </Button>
                        </Right>
                    </ListItem>
                }/>
            </Content>
        );

    }


}