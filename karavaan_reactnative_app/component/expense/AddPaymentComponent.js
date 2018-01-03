import React from "react";
import CurrencyInputComponent from "../CurrencyInputComponent";
import {Body, Button, Container, Content, Header, Icon, Input, Item, Left, Right, Text, Title, View,Picker,Form} from "native-base";
import {TouchableHighlight} from "react-native";
import {Platform} from "react-native";
const PickerItem = Picker.Item;
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
            //don't know how to pass id to of user to variable creditorID 
            if(this.state.creditorId === undefined) {
                throw "You must select a participant";
            }
            if(this.state.amount === 0) {
                throw "Amount may not be 0";
            }
            global.service.addNewPaymentToExpenseById(tripId, expenseId,
                this.state.creditorId, this.state.amount);
                console.warn(creditorId);
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
                            <View pointerEvents='none'>
                                <Input placeholder='Participant' placeholderTextColor='green' value={this.state.creditorId !== undefined ? global.service.getPersonById(this.state.creditorId).name : ""} editable={false}/>
                            </View>
                        </TouchableHighlight>
                    </Item>

                {/*<Item style={{marginLeft:10}} regular>*/}
                {/*<Form style={{margin: 5}}>*/}
                        {/*<Picker iosHeader="Select one"*/}
                                {/*placeholder="Choose the participant"*/}
                                {/*renderHeader={backAction =>*/}
                                    {/*<Header style={{backgroundColor: 'green'}}>*/}
                                        {/*<Left>*/}
                                            {/*<Button transparent onPress={backAction}>*/}
                                                {/*<Icon name="arrow-back" style={{color: "#fff"}}/>*/}
                                            {/*</Button>*/}
                                        {/*</Left>*/}
                                        {/*<Body style={{flex: 3}}>*/}
                                        {/*<Title style={{color: "#fff"}}>Choose the participant</Title>*/}
                                        {/*</Body>*/}
                                        {/*<Right/>*/}
                                    {/*</Header>}*/}
                                {/*mode="dropdown"*/}
                                {/*style={{width: Platform.OS === "ios" ? undefined : 200}}*/}
                                {/*selectedValue={this.state.creditorId}*/}
                                {/*onValueChange={this.onValueChangeCreditor.bind(this)}>*/}
                                {/*{(global.service.getParticipantsByExpenseId(tripId,expenseId)).map((item, index) => (*/}
                                    {/*<Item style={{marginLeft:10}} regular  key={item.name} label={item.name} value={item.name}/>*/}
                                {/*))}*/}
                    {/*</Picker>*/}
                    {/*</Form>*/}
                    {/*</Item>*/}

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