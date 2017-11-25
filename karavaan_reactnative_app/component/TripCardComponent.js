import React, {Component} from 'react';
import Trip from '../domain/Trip';

import {
    Container,
    Header,
    Left,
    Body,
    Icon,
    Text,
    Card,
    CardItem,
    Button
}from 'native-base';

export default class TripsCardComponent extends Component<{}> {

    constructor(trip: Trip) {
        super();
        this._trip = trip;
    }

    render() {
        return (
            <Card>
                <CardItem>
                    <Left>
                        <Icon name='md-cube'/>
                        <Body>
                        <Text>{this._trip.name}</Text>
                        <Text note>{this._trip.description}</Text>
                        </Body>
                    </Left>
                </CardItem>
            </Card>
        );
    }
}
