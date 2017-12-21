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
import UserListComponent from "./UserListComponent";
import {Person} from "../domain/Person";

import '../ServiceWrapper.js';

export default class HomeComponent extends React.Component {

    constructor() {
        super();
        //Test data
        global.service.addPerson(new Person(-1, "Levi", "Vandenbempt"));
        global.service.addPerson(new Person(-1, "Surendra", "Sapkota"));
        global.service.addPerson(new Person(-1, "Artus", "Vranken"));
        global.service.addPerson(new Person(-1, "Tim", "Vangilbergen"));
    }

    render() {

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
                        <TripsListComponent navigation={this.props.navigation}/>
                        <Fab postion="bottomRight" style={{ backgroundColor: "#5067FF" }}>
                            <Icon name="md-add" onPress={()=>this.props.navigation.navigate("CreateTrip")}/>
                        </Fab>
                    </Tab>
                    <Tab heading="Users">
                        <UserListComponent navigation={this.props.navigation} userSrcFunc={() => global.service.persons}/>
                        <Fab postion="bottomRight" style={{ backgroundColor: "#5067FF" }}>
                            <Icon name="md-add" onPress={()=>this.props.navigation.navigate("CreateUser")}/>
                        </Fab>
                    </Tab>
                </Tabs>

            </Container>
        );
    }

}