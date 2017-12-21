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
import { ExpenseType } from '../domain/ExpenseType';
import '../ServiceWrapper.js';

 const PickerItem = Picker.Item;
export default class CreateExpenseComponent extends React.Component {

    constructor(props) {
      super(props);
        this.state = {
          selectedExpenseType: ExpenseType.EvenExpense,
          expenseDescription: "",
          expenseCategory: "",
        };
      }
    
      onValueChangeExpenseDescription(value){
        this.setState({
            expenseDescription:value
        });
      }

      onValueChangeExpenseCategory(value) {
          this.setState({
              expenseCategory: value;
          });
      }


    add()
    {
      var currency = this.state.slected1;
      var a = Math.floor(Math.random()*1000);
      const trip = new Trip(a,this.state.tripName,this.state.tripDescription,new Currency(this.state.selected1,1));
      global.service.addTrip(trip);
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
          <Input placeholder='Expense Description' placeholderTextColor='green' value={this.state.expenseDescription} onChangeText={this.onValueChangeExpenseDescription.bind(this)} />
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