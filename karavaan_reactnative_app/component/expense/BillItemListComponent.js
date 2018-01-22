import React from "react";
import {Body, Content, Icon, Left, List, ListItem, Right, Text} from "native-base";

export class BillItemListComponent extends React.Component {

    //Props
    // - tripId
    // - expenseId

    constructor(props) {
        super(props);
        global.observerService.addExpenseParticipantMapCallback(this.props.tripId, this.props.expenseId, () => this.forceUpdate());
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
                        </Right>
                    </ListItem>
                }/>
            </Content>
        );

    }

}