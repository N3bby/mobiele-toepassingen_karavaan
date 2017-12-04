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
const Items = Picker.Item;
export default class CreateTripComponent extends React.Component {

    constructor(props) {
        super();
        this.state = {
            selected3: "key3"
        };
    }

    onValueChange3(value){
        this.state={
            selected3:value
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
                <Right />
            </Header>
            <Content>
            <Item>
            <Input placeholder='Trip Name'/>
            </Item>
            <Button disabled={true} block info >
            <Text>Participants</Text>
          </Button>
          <Text>//TODO</Text>
          <Button disabled={true} block info >
          <Text>Currency</Text>
        </Button>
            <Picker mode="dropdown">
            </Picker>
          <Picker
          mode="dropdown"
          iosHeader="Your Header"
          selectedValue={this.state.selected3}
          onValueChange={this.onValueChange3.bind(this)}>
          <Item label="Dollar $" value="key0" />
          <Item label="Euro €" value="key1" />
          <Item label="Pound £" value="key2" />
          <Item label="Yen ¥" value="key3" />
        </Picker>
          </Content>
        </Container>
        );
    }
}
//style={{fontSize: 16}}            

