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
    Badge
}from 'native-base';
import {Person} from "../domain/Person";

import '../ServiceWrapper.js';


export default class UserListOfTripComponent extends React.Component {

    constructor(navigation) {
        super();
        global.userListOfTripComponent = this;
    }

    deleteUser(id){
        alert("need to make a function in karavaan service to delete the user from the trip");
    }

    render() {
        var tripId = this.props.navigation.state.params.tripId;
               return (
            <Container>
            <Content>
                <List  style={{ flex: 1, backgroundColor: '#fff' }}>
                {global.service.getParticipantsByTripId(tripId).map((item,index) => (
                    <ListItem key={index} button={true} onPress={() => this.props.navigation.goBack()} avatar>
                    <Body>
                        <Text>
                         {item.name}
                        </Text>
                        </Body>
                    </ListItem>
                ))}
            </List>
            </Content>
            </Container>
        );
    }

}

