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
      var a = Math.floor(Math.random()*1000);
      const trip = new Trip(a,this.state.tripName,this.state.tripDescription,new Currency(this.state.selected1,1));
      global.service.addTrip(trip);
      this.props.navigation.goBack();
      global.homeComponent.forceUpdate();
      console.log(trip);
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

          <Form style={{margin:5}}>
          <Picker
            renderHeader={backAction =>
              <Header style={{ backgroundColor: 'green' }}>
                <Left>
                  <Button transparent onPress={backAction}>
                    <Icon name="arrow-back" style={{ color: "#fff" }} />
                  </Button>
                </Left>
                <Body style={{ flex: 3 }}>
                  <Title style={{ color: "#fff" }}>Choose the currency</Title>
                </Body>
                <Right />
              </Header>}
            mode="dropdown"
            style={{ width: Platform.OS === "ios" ? undefined : 200 }}
            selectedValue={this.state.selected1}
            onValueChange={this.onValueChange.bind(this)}
          >
            <PickerItem label="€ Euro" value="EUR" />
            <PickerItem label="$ Dollar" value="USD" />
            <PickerItem label="£ Pound" value="GBP" />
            <PickerItem label="￥Yen" value="YEN" />
            <PickerItem label="Choose the currency" value="key4"/>
          </Picker>
        </Form>

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

