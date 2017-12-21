import React from 'react';
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
    Thumbnail,
    Right,
    Button,
    Fab
}from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import '../ServiceWrapper.js';

export default class TripsListComponent extends React.Component {

    constructor() {
        super();
        global.observerService.addTripMapObserver(() => this.forceUpdate());
    }
    
    navigateToTrip(itemId : number)
    {
        global.tripId = itemId;
        this.props.navigation.navigate("TripOverview", { groupId: itemId });
    }

    render() {
        //TODO Fix the weird touch effect here.
        //Bug report of it can be found here: https://github.com/GeekyAnts/NativeBase/issues/1378
        //Apparently an issue with the last version of NativeBase. Might need to wait for a fix
        return (
            <Content>
                <List>
                    {global.service.trips.map((item, index) => (
                        <ListItem key={index} button={true} onPress={ () => this.navigateToTrip(item.id) } avatar>
                            <Left>
                                <Thumbnail small source={require('../images/house.jpg')}/>
                            </Left>
                            <Body>
                            <Text>{item.name}</Text>
                            <Text note>{item.description}</Text>
                            <Text note>{item.currencies.map(c => c.name).join(', ')}</Text>                            
                            </Body>
                        </ListItem>
                    ))}
                </List>
            </Content>
        );
    }

}
