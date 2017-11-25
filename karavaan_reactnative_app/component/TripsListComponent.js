import React, {Component} from 'react';
import {
    Container,
    Tab,
    List,
    ListItem,
    Content
}from 'native-base';
import TripCardComponent from "./TripCardComponent";
import {Trip} from "../domain/Trip";

export default class TripsListComponent extends Component<{}> {

    constructor() {
        super();
        //TODO Fetch trips from service
        this._trips = [];
        this._trips.push(new TripCardComponent(new Trip(3, "TestGroup", "This is a group")));
        this._trips.push(new TripCardComponent(new Trip(3, "TestGroup", "This is a group")));
        this._trips.push(new TripCardComponent(new Trip(3, "TestGroup", "This is a group")));
        this._trips.push(new TripCardComponent(new Trip(3, "TestGroup", "This is a group")));
        this._trips.push(new TripCardComponent(new Trip(3, "TestGroup", "This is a group")));
        this._trips.push(new TripCardComponent(new Trip(3, "TestGroup", "This is a group")));
        this._trips.push(new TripCardComponent(new Trip(3, "TestGroup", "This is a group")));
        this._trips.push(new TripCardComponent(new Trip(3, "TestGroup", "This is a group")));
        this._trips.push(new TripCardComponent(new Trip(3, "TestGroup", "This is a group")));
        this._trips.push(new TripCardComponent(new Trip(3, "TestGroup", "This is a group")));
        this._trips.push(new TripCardComponent(new Trip(3, "TestGroup", "This is a group")));
        this._trips.push(new TripCardComponent(new Trip(3, "TestGroup", "This is a group")));
    }

    handleGroupClick(id) {

    }

    render() {

        return (
            <Content>
                <List>
                    {this._trips.map((item, index) => (
                        <ListItem key={index} button={true} onPress={this.handleGroupClick(item._trip.id)}>
                            {item.render()}
                        </ListItem>
                    ))}
                </List>
            </Content>
        );
    }

}
