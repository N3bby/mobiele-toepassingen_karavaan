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
