import React from 'react';
import {Body, Button, Container, Content, Fab, Header, Icon, Left, Right, Title} from "native-base";
import UserListComponent from "../UserListComponent";

export class TripUserPicker extends React.Component {

    // Properties
    // - returnUser (vis navigation) : function that is called with the selected user

    constructor(props) {
        super(props);
    }

    render() {

        let tripId = this.props.navigation.state.params.tripId;

        let add = (user) => {
            this.props.navigation.state.params.returnUser(user);
            this.props.navigation.goBack();
        };

        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>Pick a user</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content style={{backgroundColor: "white"}}>
                    <UserListComponent navigation={this.props.navigation}
                                       sourceFunc={() => global.service.getParticipantsByTripId(tripId)}
                                       observerFunc={(component) => global.observerService.addTripPersonMapCallback(tripId, () => component.forceUpdate())}
                                       isPicker={true}
                                       pickerFunc={(user) => add(user)}/>
                </Content>
                <Fab postion="bottomRight" style={{backgroundColor: "#5067FF"}}
                     onPress={() => this.props.navigation.navigate("AddUserToTrip", {tripId: tripId})}>
                    <Icon name="md-add"/>
                </Fab>
            </Container>
        );
    }

}

