import React, {Component} from 'react';
import { Platform } from "react-native";
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
}from 'native-base';
import {Trip} from "../domain/Trip";
import HomeComponent from './HomeComponent';
import { Currency } from '../domain/Currency';
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

    onValueChange(value){
        this.setState({
            selected1:value
        });
    }
    onValueChangeTripName(value){
      this.setState({
          tripName:value
      });
  }
  onValueChangeTripDescription(value){
    this.setState({
        tripDescription:value
    });
}



    add(){
      var currency = this.state.slected1;
      global.service.addNewTrip(this.state.tripName, this.state.tripDescription);
      global.saveService();
      this.props.navigation.goBack();
      global.homeComponent.forceUpdate();
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
                <Right />
            </Header>
            <Content>

            
            <Item regular>
            <Input placeholder='Trip Name' placeholderTextColor='green' value={this.state.tripName} onChangeText={this.onValueChangeTripName.bind(this)} />
          </Item>

          <Item regular>
          <Input placeholder='Trip Description' placeholderTextColor='green' value={this.state.tripDescription} onChangeText={this.onValueChangeTripDescription.bind(this)} />
          </Item>

        <Button
          success
          style={{ alignSelf: "center", margin:10 }}
          onPress={() => this.add()}
        ><Text> Create </Text></Button>
         </Content>
        </Container>
        );
    }
}
//style={{fontSize: 16}}            

