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
} from 'native-base';
import '../ServiceWrapper.js';

export default class TripsListComponent extends React.Component {

    constructor() {
        super();
        global.observerService.addTripMapCallback(() => this.forceUpdate());
    }

    navigateToTrip(tripId) {
        this.props.navigation.navigate("TripOverview", {
            tripId: tripId,
            onBack: () => this.forceUpdate()
        });
    }

    render() {

        //TODO Fix the weird touch effect here.
        //Bug report of it can be found here: https://github.com/GeekyAnts/NativeBase/issues/1378
        //Apparently an issue with the last version of NativeBase. Might need to wait for a fix

        let tripWrappers = [];
        global.service.trips.forEach(t => tripWrappers.push({value: t}));

        return (
            <Content>
                <List dataArray={tripWrappers}
                      renderRow={trip =>
                          <ListItem key={trip.value.id} button={true} onPress={() => this.navigateToTrip(trip.value.id)} avatar>
                              <Left>
                                  <Thumbnail small source={require('../images/house.jpg')}/>
                              </Left>
                              <Body>
                              <Text numberOfLines={1}>{trip.value.name}</Text>
                              <Text numberOfLines={1} note>{trip.value.description}</Text>
                              <Text numberOfLines={1} note>{trip.value.activeCurrency}</Text>
                              </Body>
                          </ListItem>
                      }>
                </List>
            </Content>
        );
    }

}
