import React from 'react';
import {
    Container,
    Header,
    Title,
    Button,
    Left,
    Right,
    Body,
    Icon,
    Text,
    Tabs,
    Tab,
    FooterTab,
    Footer,
    Fab,
    navigation
}from 'native-base';
import TripsListComponent from "./TripsListComponent";
import CreateTripComponent from "./CreateTripComponent";
import CreateUserComponent from "./CreateUserComponent";
import UserListComponent from "./UserListComponent";
import UserListForTripComponent from "./UserListForTripComponent";

import '../ServiceWrapper.js';

export default class HomeComponent extends React.Component {

    constructor() {
        super();
        //this will force the home component to re render everythings.
        global.homeComponent = this;
        //Instantiating component to prevent re-instantiating it every render (and thus reloading the domain)
        this.tripsListComponent = new TripsListComponent();
        this.createTripComponent = new CreateTripComponent();
        this.CreateUserComponent = new CreateUserComponent();
        this.UserListComponent   = new UserListComponent();
        this.UserListForTripComponent = new UserListForTripComponent();
    }

    render() {

        //Passing the navigation object to child component
        //This cannot be done in the constructor because the navigation property is not injected yet then
        if(this.tripsListComponent.props === undefined) this.tripsListComponent.props = {};
        this.tripsListComponent.props.navigation = this.props.navigation;

        if(this.createTripComponent.props === undefined)this.createTripComponent.props={};
        this.createTripComponent.props.navigation=this.props.navigation;

        if(this.CreateUserComponent.props===undefined)this.CreateUserComponent.props={};
        this.CreateUserComponent.props.navigation=this.props.navigation;

        if(this.UserListComponent.props === undefined) this.UserListComponent.props={};
        this.UserListComponent.props.navigation = this.props.navigation;

        if(this.UserListForTripComponent.props === undefined) this.UserListForTripComponent.props={};
        this.UserListForTripComponent.props.navigation=this.props.navigation;

        return (
            <Container>

                <Header hasTabs>
                    <Left>
                        <Button transparent>
                            <Icon name='menu'/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>Karavaan App</Title>
                    </Body>
                    <Right/>

                </Header>

                <Tabs>
                    <Tab heading="Trips">
                        {this.tripsListComponent.render()}
                        <Fab postion="bottomRight" style={{ backgroundColor: "#5067FF" }}>
                            <Icon name="md-add" onPress={()=>this.props.navigation.navigate("CreateTrip")}/>
                        </Fab>
                    </Tab>
                    <Tab heading="Users">
                    {this.UserListComponent.render()}
                    <Fab postion="bottomRight" style={{ backgroundColor: "#5067FF" }}>
                        <Icon name="md-add" onPress={()=>this.props.navigation.navigate("CreateUser")}/>
                    </Fab>
                    </Tab>
                    <Tab heading="Activity">
                        <Text>Activity</Text>
                    </Tab>
                </Tabs>
            </Container>
        );
    }

}