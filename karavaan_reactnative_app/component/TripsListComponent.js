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
    Button
}from 'native-base';
import {Trip} from "../domain/Trip";
import { Col, Row, Grid } from "react-native-easy-grid";
export default class TripsListComponent extends React.Component {

    constructor(navigation) {
        super();
        //Some test data
        global.service.addNewTrip("SomeTrip", "Some description for the trip");
        global.service.addNewTrip("SomeTrip", "Some description for the trip");
        global.service.addNewTrip("SomeTrip", "Some description for the trip");
        global.service.addNewTrip("SomeTrip", "Some description for the trip");
        global.service.addNewTrip("SomeTrip", "Some description for the trip");
        global.service.addNewTrip("SomeTrip", "Some description for the trip");
    }
    deleteTrip(id){
        global.service.removeTripById(id);
        //this.props.navigation.goBack();
        global.homeComponent.forceUpdate();
    }


    render() {

        //TODO Fix the weird touch effect here.
        //Bug report of it can be found here: https://github.com/GeekyAnts/NativeBase/issues/1378
        //Apparently an issue with the last version of NativeBase. Might need to wait for a fix
        return (
            <Content>
                <List>
                    {global.service.trips.map((item, index) => (
                        <ListItem key={index} button={true} onPress={() => this.props.navigation.navigate("TripOverview", { groupId: item.id })} avatar>
                            <Left>
                                <Thumbnail small source={require('../images/house.jpg')}/>
                            </Left>
                            <Body>
                            <Grid>
                            <Col>
                            <Text>{item.name}</Text>
                            <Text note>{item.description}</Text>
                            <Text note>{item.currencies.map(c => c.name).join(', ')}</Text>
                            </Col>
                            <Col style={{width:50}}> 
                            <Right>
                            <Button small danger onPress={() => this.deleteTrip(item.id)}>
                            <Icon active name="trash" />
                            </Button>
                            </Right>
                            </Col>
                            </Grid>
                            </Body>
                        </ListItem>
                    ))}
                </List>
            </Content>
        );
    }

}
