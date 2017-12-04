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
    Fab
}from 'native-base';
import TripsListComponent from "./TripsListComponent";
import CreateTripComponent from "./CreateTripComponent";

export default class HomeComponent extends React.Component {

    constructor() {
        super();
        //Instantiating component to prevent re-instantiating it every render (and thus reloading the domain)
        this.tripsListComponent = new TripsListComponent();
        this.createTripComponent = new CreateTripComponent();
    }

    render() {

        //Passing the navigation object to child component
        //This cannot be done in the constructor because the navigation property is not injected yet then
        if(this.tripsListComponent.props === undefined) this.tripsListComponent.props = {};
        this.tripsListComponent.props.navigation = this.props.navigation;

        if(this.createTripComponent.props === undefined)this.createTripComponent.props={};
        this.createTripComponent.props.navigation=this.props.navigation;

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
                        <Text>Users</Text>
                    </Tab>
                    <Tab heading="Activity">
                        <Text>Activity</Text>
                    </Tab>
                </Tabs>
            </Container>
        );
    }

}