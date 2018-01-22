import React from "react";
import {Body, Button, Content, Form, Item, List, ListItem, Picker, Right, Text, View} from "native-base";
import {DebtUtility} from "../domain_ext/DebtUtility";

export class DebtOverviewListComponent extends React.Component {

    //Props
    //- tripId

    constructor(props) {
        super(props);
        this.state = {
            participant: undefined,
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
    }

    render() {

        let tripId = this.props.tripId;

        let debts = [];

        if (this.state.participant !== undefined) {
            debts = this.state.debtType === "0" ?
                DebtUtility.getDebtsForUserDebtor(tripId, this.state.participant) :
                DebtUtility.getDebtsForUserCreditor(tripId, this.state.participant);
        }

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

                <List dataArray={debts}
                      renderRow={(debt) =>
                          <ListItem>
                              <Body>
                              <Text>
                                  {debt.debtor.name} owes {debt.creditor.name} {debt.amount}
                              </Text>
                              </Body>
                              <Right>
                                  <Button style={{backgroundColor: debt.isPaid ? 'green' : 'red'}} transparent
                                          onPress={() => this.togglePaid(debt)}>
                                      <Text>Test</Text>
                                  </Button>
                              </Right>
                          </ListItem>
                      }/>

            </Content>
        );

    }

}