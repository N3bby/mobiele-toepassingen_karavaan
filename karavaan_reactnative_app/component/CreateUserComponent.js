import React, {Component} from 'react';
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
import { KaravaanService } from '../domain/KaravaanService';
import '../ServiceWrapper.js';

export default class CreateUserComponent extends React.Component {

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
        // if (this.state.firstName.length === 0 || this.state.lastName.length === 0)
        // {
        //     alert("Please enter the details.");
        // } else if(this.state.firstName.length > 30 || this.state.lastName.length > 30) {
        //     alert("Name or First Name is too long. (max 30)")
        // }
        // else
        // {
            global.service.addNewPerson(this.state.firstName,this.state.lastName);
            global.saveService();
            this.props.navigation.goBack();
        //}
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
                    <Input placeholder='First Name' placeholderTextColor='green' value={this.state.firstName} onChangeText={this.onValueChangeFName.bind(this)} maxLength={30} />
                </Item>
                <Item regular>
                     <Input placeholder='Last Name' placeholderTextColor='green' value={this.state.LastName} onChangeText={this.onValueChangeLName.bind(this)} maxLength={30} />
                 </Item>

                <Button success style={{ alignSelf: "center", margin:10 }} onPress={() => this.add()}>
                    <Text> Create </Text>
                </Button>

            </Content>

        </Container>
        );
    }
}

