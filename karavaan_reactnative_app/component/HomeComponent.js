import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';
import {StyleSheet} from 'react-native';
import  {CreateTripComponent} from './CreateTripComponent'
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

export default class HomeComponent extends Component<{}> {

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
                        <TripsListComponent/>
                        <Fab postion="bottomRight" style={{ backgroundColor: "#5067FF" }}>
                            <Icon name="md-add"/>
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