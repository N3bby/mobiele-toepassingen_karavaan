import React, {Component} from 'react';
import {Platform} from "react-native";
import {
    Container,
    Tab,
    List,
    ListItem,
    Content,
    Title,
    Header,
    Body,
    Button,
    Left,
    Right,
    Icon,
    Item,
    Input,
    Subtitle,
    Text,
    Form,
    Picker
} from 'native-base';
import {Trip} from "../domain/Trip";
import HomeComponent from './HomeComponent';
import {Currency} from '../domain/Currency';
import '../ServiceWrapper.js';

const PickerItem = Picker.Item;
export default class CreateTripComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected1: "EUR",
            tripName: "",
            tripDescription: ""
        };
    }

    onValueChange(value) {
        this.setState({
            selected1: value
        });
    }

    onValueChangeTripName(value) {
        this.setState({
            tripName: value
        });
    }

    onValueChangeTripDescription(value) {
        this.setState({
            tripDescription: value
        });
    }


    add() {
        if (this.state.tripName.length == 0 || this.state.tripName.length > 30) {
            alert("TripName should be between 1 and 30 characters.");
        } else if (this.state.tripDescription.length == 0 || this.state.tripDescription.length > 100) {
            alert("TripDescription should be between 1 and 100 characters.");
        } else {
            var currency = this.state.selected1;
            if (currency.length != 0) {
                global.service.addNewTrip(this.state.tripName, this.state.tripDescription, currency);
            } else {
                //let curr = global.service.getCurrency("EUR");
                //let trip = new Trip(-1,this.state.tripName,this.state.tripDescription,curr);
                //global.service.addTrip(trip);
                global.service.addNewTrip(this.state.tripName, this.state.tripDescription);
            }
            global.saveService();
            this.props.navigation.goBack();
        }
    }

    render() {
        return (

            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>New Trip</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content>


                    <Item regular>
                        <Input placeholder='Trip Name' placeholderTextColor='green' value={this.state.tripName}
                               onChangeText={this.onValueChangeTripName.bind(this)}/>
                    </Item>

                    <Item regular>
                        <Input placeholder='Trip Description' placeholderTextColor='green'
                               value={this.state.tripDescription}
                               onChangeText={this.onValueChangeTripDescription.bind(this)}/>
                    </Item>


                    <Form style={{margin: 5}}>
                        <Picker iosHeader="Select one"
                                placeholder="Choose the currency"
                                renderHeader={backAction =>
                                    <Header style={{backgroundColor: 'green'}}>
                                        <Left>
                                            <Button transparent onPress={backAction}>
                                                <Icon name="arrow-back" style={{color: "#fff"}}/>
                                            </Button>
                                        </Left>
                                        <Body style={{flex: 3}}>
                                        <Title style={{color: "#fff"}}>Choose the currency</Title>
                                        </Body>
                                        <Right/>
                                    </Header>}
                                mode="dropdown"
                                style={{width: Platform.OS === "ios" ? undefined : 200}}
                                selectedValue={this.state.selected1}
                                onValueChange={this.onValueChange.bind(this)}
                        >
                            {(global.service.currencies).map((item, index) => (
                                <Item key={item.name} label={item.name} value={item.name}/>
                            ))}
                        </Picker>
                    </Form>


                    <Button
                        success
                        style={{alignSelf: "center", margin: 10}}
                        onPress={() => this.add()}
                    ><Text> Create </Text></Button>
                </Content>
            </Container>
        );
    }
}
//style={{fontSize: 16}}            

