import React from "react";
import CurrencyInputComponent from "../CurrencyInputComponent";
import {Body, Button, Container, Content, Header, Icon, Input, Item, Left, Right, Text, Title, View} from "native-base";
import {TouchableHighlight} from "react-native";

export class AddPaymentComponent extends React.Component {

    // Properties
    // - navigation
    // - tripId (by navigation)
    // - expenseId (by navigation)

    constructor(props) {
        super(props);
        this.state = {
            creditorId: undefined,
            amount: 0
        };
    }

    onValueChangeAmount(value) {
        this.setState({
            amount: value,
        });
    }

    onValueChangeCreditor(value) {
        this.setState({
            creditorId: value,
        });
    }

    add() {
        let tripId = this.props.navigation.state.params.tripId;
        let expenseId = this.props.navigation.state.params.expenseId;
        let expense = global.service.getExpenseById(tripId, expenseId);
        try {
            if(this.state.creditorId === undefined) {
                throw "You must select a participant";
            }
            if(this.state.amount === 0) {
                throw "Amount may not be 0";
            }
            global.service.addNewPaymentToExpenseById(tripId, expenseId,
                this.state.creditorId, this.state.amount);
            global.saveService();
            this.props.navigation.goBack();
        } catch (e) {
            alert(e);
        }
    }

    navigateToPicker() {

        let tripId = this.props.navigation.state.params.tripId;
        let expenseId = this.props.navigation.state.params.expenseId;

        let returnUser = (user) => {
            this.setState({creditorId: user.id});
            this.forceUpdate();
        };

        this.props.navigation.navigate("AddUserToPayment", {
            tripId: tripId,
            expenseId: expenseId,
            returnUser: returnUser.bind(this)
        });
    }

    render() {

        let tripId = this.props.navigation.state.params.tripId;
        let expenseId = this.props.navigation.state.params.expenseId;
        let expense = global.service.getExpenseById(tripId, expenseId);

        let participants = [];
        if (expense._participants !== undefined) participants = expense._participants;
        if (expense.participants !== undefined) participants = expense.participants;

        return (
            <Container>

                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>New Payment</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content>

                    <Item regular>
                        <TouchableHighlight style={{flex:1}} onPress={() => this.navigateToPicker()}>
                            <Input placeholder='Participant' placeholderTextColor='green' value={this.state.creditorId !== undefined ? global.service.getPersonById(this.state.creditorId).name : ""} disabled/>
                        </TouchableHighlight>
                    </Item>

                    <Item style={{marginLeft:10}} regular>
                        <CurrencyInputComponent onValueChange={this.onValueChangeAmount.bind(this)}/>
                    </Item>

                    <Button success style={{alignSelf: "center", margin: 10}} onPress={() => this.add()}>
                        <Text>Create</Text>
                    </Button>

                </Content>

            </Container>
        );
    }

}