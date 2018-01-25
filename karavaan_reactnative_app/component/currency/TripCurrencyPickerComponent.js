import {
    Body, Button, Container, Content, Header, Icon, Input, Left, List, ListItem, Right, Text,
    Title
} from "native-base";
import React from "react";
import CurrencyInputComponent from "../CurrencyInputComponent";

export default class TripCurrencyPickerComponent extends React.Component {

    //Handles its own values, but the onChangeText event is forwarded

    // Properties:
    // - onPick (via navigation) : Callback to execute when user picked a currency
    // - tripId (via navigation) : used to determine what trip to load data from

    constructor(props) {
        super(props);

    }

    navigateEditCurrency(currency) {
        let tripId = this.props.navigation.state.params.tripId;
        this.props.navigation.navigate("EditCurrency", {
            tripId: tripId,
            currency: currency.name,
            onBack: () => this.forceUpdate()
        });
    }

    onPick(currency) {
        let tripId = this.props.navigation.state.params.tripId;
        let trip = global.service.getTripById(tripId);
        try {
            trip.activeCurrency = currency.name;
            this.props.navigation.state.params.onPick();
            global.saveService();
            this.props.navigation.goBack();
        } catch (e) {
            alert("Problem occurred: " + e)
        }
    }

    render() {

        let tripId = this.props.navigation.state.params.tripId;
        let trip = global.service.getTripById(tripId);

        //For correct auto-update again. Fuck react-native
        let currencies = Array.from(trip.currencies.values());
        let currencyWrappers = [];
        currencies.forEach(c => currencyWrappers.push({value: c}));

        return (
            <Container>

                <Header hasTabs>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                    <Body>
                    <Title style={{marginTop: 3}}>Currencies</Title>
                    </Body>
                </Header>

                <Content style={{backgroundColor: 'white'}}>
                    <List dataArray={currencyWrappers}
                          renderRow={(currency) =>
                              <ListItem style={{flexDirection: 'row'}}>
                                  <Text style={{flex: 1}}>1 {currency.value.name} = {currency.value.rateComparedToEUR} EUR</Text>
                                  {currency.value.name !== 'EUR' &&
                                  <Button transparent onPress={() => this.navigateEditCurrency(currency.value)}>
                                      <Text>Edit</Text>
                                  </Button>
                                  }
                                  <Button transparent onPress={() => this.onPick(currency.value)}>
                                      <Text>Choose</Text>
                                  </Button>
                              </ListItem>
                          }>
                    </List>
                </Content>

            </Container>
        );

    }

}