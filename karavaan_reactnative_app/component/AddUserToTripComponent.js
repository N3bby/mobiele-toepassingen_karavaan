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
    Fab
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
        let tripId = this.props.navigation.state.params.tripId;

        let that = this;
        let tryAddToTripFunction = (user) => {
            let tripId = that.props.navigation.state.params.tripId;
            global.service.addExistingParticipantToTripById(tripId, user.id);
            global.saveService();
            this.props.navigation.goBack();
        };
        
        let removePerson = (userId) =>
        {
            global.service.removePersonById(userId);
            global.saveService();
        }

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
                <Content style={{backgroundColor: "white"}}>
                    <UserListComponent navigation={this.props.navigation}
                                       sourceFunc={() => global.service.getNonParticipantsByTripId(tripId)}
                                       observerFunc={(component) => global.observerService.addPersonMapCallback(() => component.forceUpdate())}
                                       isPicker={true}
                                       pickerFunc={tryAddToTripFunction}
                                       removeUserFunc={removePerson}/>

                </Content>
                <Fab postion="bottomRight" style={{backgroundColor: "#5067FF"}} onPress={() => this.props.navigation.navigate("CreateUser")}>
                    <Icon name="md-add" />
                </Fab>
            </Container>
        );
    }
}
