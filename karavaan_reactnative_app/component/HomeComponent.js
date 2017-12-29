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
} from 'native-base';
import TripsListComponent from "./TripsListComponent";
import UserListComponent from "./UserListComponent";
import {Person} from "../domain/Person";

import '../ServiceWrapper.js';

export default class HomeComponent extends React.Component {

    constructor() {
        super();
    }

    debugClear() {
        global.clearService();
        global.loadService();
        alert("Please reload the app!")
    }

    render() {
        
        let removePerson = (userId) =>
        {
            global.service.removePersonById(userId);
        }
        
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
                    <Right>
                        {__DEV__ ? (
                            <Button transparent onPress={() => this.debugClear()}>
                                <Text>RESET</Text>
                            </Button>
                        ) : <Text/>
                        }
                    </Right>
                </Header>

                <Tabs>
                    <Tab heading="Trips">
                        <TripsListComponent navigation={this.props.navigation}/>
                        <Fab postion="bottomRight" style={{backgroundColor: "#5067FF"}} onPress={() => this.props.navigation.navigate("CreateTrip")}>
                            <Icon name="md-add" />
                        </Fab>
                    </Tab>
                    <Tab heading="Users">
                        <UserListComponent navigation={this.props.navigation}
                                           sourceFunc={() => global.service.persons }
                                           observerFunc={(component) => global.observerService.addPersonMapCallback(() => component.forceUpdate())}
                                           removeUserFunc={removePerson}/>
                        <Fab postion="bottomRight" style={{backgroundColor: "#5067FF"}} onPress={() => this.props.navigation.navigate("CreateUser")}>
                            <Icon name="md-add" />
                        </Fab>
                    </Tab>
                </Tabs>

            </Container>
        );
    }


}