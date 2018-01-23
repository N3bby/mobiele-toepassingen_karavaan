import React from "react";
import {Body, Button, Content, Icon, Left, List, ListItem, Right, Text} from "native-base";
import {Alert} from "react-native";

export class BillItemListComponent extends React.Component {

    //Props
    // - tripId
    // - expenseId

    constructor(props) {
        super(props);
        global.observerService.addExpenseCallback(this.props.tripId, this.props.expenseId, () => this.forceUpdate());
    }

    removeBillItem(tripId, expenseId, billItemId) {
        Alert.alert(
            'Delete Payment',
            'Are you sure you want to delete this bill item?',
            [
                {
                    text: 'No', onPress: () => {
                    }, style: 'cancel'
                },
                {
                    text: 'Yes', onPress: () => {
                        try {
                            global.service.removeBillItemFromExpenseById(tripId, expenseId, billItemId);
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
        let billItems = [];
        if(expense.billItems !== undefined) billItems = Array.from(expense.billItems.values());

        return (
            <Content>
                <List dataArray={billItems} renderRow={(billItem) =>
                    <ListItem icon>
                        <Left>
                            <Icon name="md-clipboard"/>
                        </Left>
                        <Body>
                        <Text>{billItem.description} - {billItem.debtor.firstName}</Text>
                        </Body>
                        <Right>
                            <Text>{billItem.amount.toFixed(2).toString()}</Text>
                            <Button transparent onPress={() => this.removeBillItem(this.props.tripId, expense.id, billItem.id)}>
                                <Icon style={{color:'rgba(0,0,0,0.4)'}} name="trash"/>
                            </Button>
                        </Right>
                    </ListItem>
                }/>
            </Content>
        );

    }

}