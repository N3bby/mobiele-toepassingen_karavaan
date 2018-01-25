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
import '../ServiceWrapper.js';

export default class TripsListComponent extends React.Component {

    constructor() {
        super();
        global.observerService.addTripMapCallback(() => this.forceUpdate());
    }
    
    navigateToTrip(tripId)
    {
        this.props.navigation.navigate("TripOverview", { tripId: tripId });
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
                                <Text numberOfLines={1}>{item.name}</Text>
                                <Text numberOfLines={1} note>{item.description}</Text>
                                <Text numberOfLines={1} note>{item.activeCurrency}</Text>
                            </Body>
                        </ListItem>
                    ))}
                </List>
            </Content>
        );
    }

}
