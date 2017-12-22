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
    Title
} from 'native-base';
import UserListComponent from "./UserListComponent";
import '../ServiceWrapper.js';

export default class AddUserToTripComponent extends React.Component {

    //Properties
    // - navigation: Navigation object
    // - userSrcFunc: Function that gets the array for users -- see HomeComponent for an example

    constructor() {
        super();
    }

    render() {
       var groupId = this.props.navigation.state.params.tripId;
        return (
            <Container>
            <Header>
            <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-back"/>
            </Button>
        </Left>
        <Body>
        <Title>Add users</Title>
        </Body>
        <Right/>
            </Header>
            <Content style={{backgroundColor:"white"}}>
            <UserListComponent navigation={this.props.navigation} userSrcFunc={() => global.service.getNonParticipantsByTripId(groupId)}/>
           </Content>
            </Container>
        );
    }
}
