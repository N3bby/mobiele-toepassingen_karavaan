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
    SwipeRow,
    Button,
    View,
    Right,
    Header,
    Title,
    Tabs,
    Fab,
    Badge
}from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import {Person} from "../domain/Person";
import TripOverviewComponent from "./TripOverviewComponent";
import UserListOfTripComponent from "./UserListOfTripComponent";
import HomeComponent from './HomeComponent';

import '../ServiceWrapper.js';

export default class UserListForTripComponent extends React.Component {

    constructor(navigation) {
        super();
        this.userListOfTripComponent = new UserListOfTripComponent();     
    }

    addUserToTrip(id){
        var tripId = this.props.navigation.state.params.tripId;
        global.service.addExistingParticipantToTripById(tripId,id);
        global.saveService();
        this.props.navigation.goBack();
        global.homeComponent.forceUpdate();
    }

    render() {
        if(this.userListOfTripComponent.props === undefined) this.userListOfTripComponent.props = {};
        this.userListOfTripComponent.props.navigation = this.props.navigation;
       
        var tripId = this.props.navigation.state.params.tripId;
        return (
            <Container>
            <Header hasTabs>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ fontSize: 10}}>Add Friends on Trip</Title>
                        </Body>
                        <Right>
                        </Right>
                </Header>

                <Tabs>
                <Tab heading="Users of this trip">
                {this.userListOfTripComponent.render()}
           </Tab>   
                <Tab heading="List of all users">         
                <Content>
                <List>
                    {global.service.getNonParticipantsByTripId(tripId).map((item, index) => (
                        <ListItem key={index} button={true} onPress={() => this.props.navigation.navigate("UserOverview", { groupId: item.id })} avatar>
                            <Body>
                            <Grid>
                            <Col>
                            <Text>
                            <Icon active name="person" style={{padding:5}}/>
                            {item.firstName} {item.lastName}
                            </Text>
                            </Col>
                            <Col> 
                            <Right>
                            <Button success onPress={() => this.addUserToTrip(item.id)}>
                            <Text>Add</Text>
                            </Button>
                            </Right>
                            </Col>
                            </Grid>
                            </Body>
                        </ListItem>
                    ))}
                </List>
            </Content>
            <Fab postion="bottomRight" style={{ backgroundColor: "#5067FF" }}>
            <Icon name="md-add" onPress={()=>this.props.navigation.navigate("CreateUser")}/>
        </Fab>
        </Tab>
           </Tabs>
            </Container>
        );
    }

}

