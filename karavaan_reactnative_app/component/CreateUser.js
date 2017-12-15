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
import { Person } from '../domain/Person';
export default class CreateTripComponent extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        firstName:"",
        lastName:""
      };
      }

    onValueChangeFName(value){
      this.setState({
          firstName:value,
      });
  }
  onValueChangeLName(value){
    this.setState({
        lastName:value,
    });
}



    add(){
      var a = Math.floor(Math.random()*1000);
      //const person = new Person()
      //global.service.add()
      this.props.navigation.goBack();
      global.homeComponent.forceUpdate();
      //console.log(trip);
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
                <Title>New User</Title> 
                </Body>
                <Right />
            </Header>
            <Content>

            
            <Item regular>
            <Input placeholder='First Name' placeholderTextColor='green' value={this.state.firstName} onChangeText={this.onValueChangeFName.bind(this)} />
          </Item>

          <Item regular>
          <Input placeholder='Last Name' placeholderTextColor='green' value={this.state.LastName} onChangeText={this.onValueChangeLName.bind(this)} />
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

