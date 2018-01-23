import React from "react";
import {Body, Button, Content, Form, Item, List, ListItem, Picker, Right, Text, View} from "native-base";
import {DebtUtility} from "../domain_ext/DebtUtility";
import {Debt} from "../domain/Debt";

export class DebtOverviewListComponent extends React.Component {

    //Props
    //- tripId

    constructor(props) {
        super(props);
        let tripParticipants = global.service.getParticipantsByTripId(this.props.tripId);
        this.state = {
            participant: tripParticipants.length !== 0 ? tripParticipants[0] : undefined,
            debtType: "0"
        };
    }

    onParticipantChange(value) {
        this.setState({
            participant: value
        });
        this.forceUpdate();
    }

    onTypeChange(value) {
        this.setState({
            debtType: value
        });
        this.forceUpdate();
    }

    togglePaid(debt) {
        debt.isPaid = !debt.isPaid;
        global.saveService();
        this.forceUpdate();
    }

    render() {

        let tripId = this.props.tripId;

        let debts = [];

        if (this.state.participant !== undefined) {
            debts = this.state.debtType === "0" ?
                DebtUtility.getDebtsForUserDebtor(tripId, this.state.participant) :
                DebtUtility.getDebtsForUserCreditor(tripId, this.state.participant);
        }

        //React-native only updates a List when the array changes (reference removed/added/changed)
        //We can't pass the normal debt array since the references would always be the same.
        //So we're wrapping the debts in an object. This ensures that the references are different each time forceUpdate is called
        let debtWrappers = [];
        debts.forEach(d => debtWrappers.push({value: d}));

        return (
            <Content>

                <Form>
                    <View style={{flexDirection: 'row'}}>
                        <Picker iosHeader="User"
                                mode="dropdown"
                                placeholder="Select user"
                                selectedValue={this.state.participant}
                                onValueChange={this.onParticipantChange.bind(this)}
                                style={{flex: 2}}>
                            {global.service.getParticipantsByTripId(tripId).map((item, index) => (
                                <Item label={item.name} value={item}/>
                            ))}
                        </Picker>
                        <Picker iosHeader="Type"
                                mode="dropdown"
                                placeholder="Select type"
                                selectedValue={this.state.debtType}
                                onValueChange={this.onTypeChange.bind(this)}
                                style={{flex: 1}}>
                            <Item label="Owes" value="0"/>
                            <Item label="Is owed" value="1"/>
                        </Picker>
                    </View>
                </Form>

                <List dataArray={debtWrappers}
                      renderRow={(debt) =>
                          <ListItem>
                              <Body>
                              <Text>{debt.value.debtor.name} owes {debt.value.creditor.name} {debt.value.amount}</Text>
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