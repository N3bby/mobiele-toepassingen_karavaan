import {
    Body, Button, Container, Content, Form, H3, Header, Icon, Input, Item, Left, List, ListItem, Right, Text,
    Title, View
} from "native-base";
import React from "react";
import CurrencyInputComponent from "../CurrencyInputComponent";

export default class CurrencyEditComponent extends React.Component {

    //Handles its own values, but the onChangeText event is forwarded

    // Properties:    )
    // - tripId (via navigation) : used to determine what trip to load data from
    // - currency : name of currency to edit
    // - onBack (via navigation) : callback when exiting

    constructor(props) {
        super(props);
        this.state = {
            newAmount: 0
        };
    }

    onValueChangeCurrency(value) {
        this.setState({
            newAmount: value
        });
    }

    updateCurrency() {
        let tripId = this.props.navigation.state.params.tripId;
        let trip = global.service.getTripById(tripId);
        let currency = trip.currencies.get(this.props.navigation.state.params.currency);
        try {
            currency.rateComparedToEUR = this.state.newAmount;
            global.saveService();
            this.props.navigation.state.params.onBack();
            this.props.navigation.goBack();
        } catch (e) {
            alert("Something went wrong: " + e);
        }
    }

    resetCurrency() {
        let tripId = this.props.navigation.state.params.tripId;
        let trip = global.service.getTripById(tripId);
        let currency = trip.currencies.get(this.props.navigation.state.params.currency);
        try {
            currency.rateComparedToEUR = global.service.getCurrency(currency.name).rateComparedToEUR;
            global.saveService();
            this.props.navigation.state.params.onBack();
            this.props.navigation.goBack();
        } catch (e) {
            alert("Something went wrong: " + e);
        }
    }

    render() {

        let tripId = this.props.navigation.state.params.tripId;
        let trip = global.service.getTripById(tripId);
        let currency = trip.currencies.get(this.props.navigation.state.params.currency);

        return (
            <Container>

                <Header hasTabs>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                    <Body>
                    <Title style={{marginTop: 3}}>Edit {currency.name}</Title>
                    </Body>
                </Header>

                <Content style={{padding: 10}}>

                    <H3 style={{marginBottom: 10}}>{currency.name}</H3>

                    <Text style={{color: 'rgba(0,0,0,0.7)', marginBottom: 5}}>Old</Text>
                    <Item regular>
                        <Input disabled value={currency.rateComparedToEUR.toFixed(2).toString()}/>
                    </Item>

                    <Text style={{color: 'rgba(0,0,0,0.7)', marginBottom: 5, marginTop: 5}}>New</Text>
                    <Item regular>
                        <CurrencyInputComponent onValueChange={this.onValueChangeCurrency.bind(this)}/>
                    </Item>

                    <View style={{flexDirection: 'row'}}>

                        <Button style={{marginTop: 10}} onPress={this.updateCurrency.bind(this)}>
                            <Text>Update</Text>
                        </Button>

                        <Text style={{flex: 1}}></Text>

                        <Button style={{marginTop: 10}} onPress={this.resetCurrency.bind(this)}>
                            <Text>Reset</Text>
                        </Button>

                    </View>

                </Content>

            </Container>
        );

    }

}