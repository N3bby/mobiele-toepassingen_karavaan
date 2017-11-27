import React, {Component} from 'react';
import {
    Container,
    Tab,
    List,
    ListItem,
    Content,
    Left,
    Body,
    Icon,
    Text,
    Thumbnail
}from 'native-base';
import {View, TouchableHighlight} from 'react-native';
import {Trip} from "../domain/Trip";

export default class TripsListComponent extends Component<{}> {

    constructor() {
        super();
        //TODO Fetch trips from service
        this._trips = [];
        this._trips.push(new Trip(3, "TestGroup", "This is a group"));
        this._trips.push(new Trip(3, "TestGroup", "This is a group"));
        this._trips.push(new Trip(3, "TestGroup", "This is a group"));
        this._trips.push(new Trip(3, "TestGroup", "This is a group"));
        this._trips.push(new Trip(3, "TestGroup", "This is a group"));
        this._trips.push(new Trip(3, "TestGroup", "This is a group"));
        this._trips.push(new Trip(3, "TestGroup", "This is a group"));
        this._trips.push(new Trip(3, "TestGroup", "This is a group"));
        this._trips.push(new Trip(3, "TestGroup", "This is a group"));
        this._trips.push(new Trip(3, "TestGroup", "This is a group"));
        this._trips.push(new Trip(3, "TestGroup", "This is a group"));
        this._trips.push(new Trip(3, "TestGroup", "This is a group"));
    }

    handleGroupClick(id) {
    }

    render() {

        //TODO Fix the weird touch effect here.
        //Bug report of it can be found here: https://github.com/GeekyAnts/NativeBase/issues/1378
        //Apparently an issue with the last version of NativeBase. Might need to wait for a fix
        return (
            <Content>
                <List>
                    {this._trips.map((item, index) => (
                        <ListItem key={index} button={true} onPress={() => this.handleGroupClick(item.id)} avatar>
                            <Left>
                                <Thumbnail small source={require('../images/house.jpg')}/>
                            </Left>
                            <Body>
                            <Text>{item.name}</Text>
                            <Text note>{item.description}</Text>
                            </Body>
                        </ListItem>
                    ))}
                </List>
            </Content>
        );
    }

}
