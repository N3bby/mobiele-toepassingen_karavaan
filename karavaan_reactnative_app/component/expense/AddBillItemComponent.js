import React from "react";
import {Body, Button, Container, Content, Header, Icon, Input, Item, Left, Right, Text, Title, View} from "native-base";
import {TouchableHighlight} from "react-native";
import CurrencyInputComponent from "../CurrencyInputComponent";

export class AddBillItemComponent extends React.Component {

    // Properties
    // - navigation
    // - tripId (by navigation)
    // - expenseId (by navigation)

    constructor(props) {
        super(props);
        this.state = {
            description: "",
            debtorId: undefined,
            amount: 0
        };
    }

    onValueChangeAmount(value) {
        this.setState({
            amount: value,
        });
    }

    onValueChangeDescription(value) {
        this.setState({
            description: value,
        });
    }

    add() {
        let tripId = this.props.navigation.state.params.tripId;
        let expenseId = this.props.navigation.state.params.expenseId;
        let expense = global.service.getExpenseById(tripId, expenseId);

        try {
            if (this.state.debtorId === undefined) {
                throw "You must select a participant";
            }
            if (this.state.amount === 0) {
                throw "Amount may not be 0";
            }
            let convertedAmount = global.service.getTripById(tripId).convertFromActiveCurrency(this.state.amount);
            global.service.addNewBillItemToExpenseById(tripId, expenseId,
                this.state.debtorId, this.state.description, convertedAmount);
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
            this.setState({debtorId: user.id});
            this.forceUpdate();
        };

        this.props.navigation.navigate("TripUserPicker", {
            tripId: tripId,
            returnUser: returnUser.bind(this)
        });
    }

    render() {
        let tripId = this.props.navigation.state.params.tripId;
        let expenseId = this.props.navigation.state.params.expenseId;
        let expense = global.service.getExpenseById(tripId, expenseId);

        return (
            <Container>

                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>New Bill Item</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content>

                    <Item regular>
                        <Input placeholder='Description' placeholderTextColor='green'
                               onChangeText={this.onValueChangeDescription.bind(this)}/>
                    </Item>

                    <Item regular>
                        <TouchableHighlight style={{flex: 1}} onPress={() => this.navigateToPicker()}
                                            underlayColor='rgba(0,0,0,0.2)'>
                            <View pointerEvents='none'>
                                <Input placeholder='Participant' placeholderTextColor='green'
                                       value={this.state.debtorId !== undefined ? global.service.getPersonById(this.state.debtorId).name : ""}
                                       editable={false}/>
                            </View>
                        </TouchableHighlight>
                    </Item>

                    <Item regular>
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