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
 const PickerItem = Picker.Item;
export default class CreateTripComponent extends React.Component {

    constructor(props) {
      super(props);
        this.state = {
          selected1: "key4",
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
      //new Trip(a,this.state.tripName,this.state.tripDescription);
      global.service.addNewTrip(a,this.state.tripName,this.state.tripDescription);
      this.props.navigation.goBack();
      global.homeComponent.forceUpdate();
    }

    render() {
        return (
            <Container>
            <Header>
                <Left>
                    <Button transparent>
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
            <PickerItem label="€ Euro" value="key0" />
            <PickerItem label="$ Dollar" value="key1" />
            <PickerItem label="£ Pound" value="key2" />
            <PickerItem label="￥Yen" value="key3" />
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

