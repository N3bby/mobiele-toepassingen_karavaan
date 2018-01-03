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
import UserListComponent from "../UserListComponent";
import '../../ServiceWrapper.js';

export default class AddUserToTripComponent extends React.Component {
    //I can't make a generic version of this as react-native-navigation doesn't allow passing functions as parameters

    constructor() {
        super();
    }

    render() {

        let tripId = this.props.navigation.state.params.tripId;

        let addToTrip = (user) => {
            global.service.addExistingParticipantToTripById(tripId, user.id);
            global.saveService();
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
                    <Title>Add to trip</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content style={{backgroundColor: "white"}}>
                    <UserListComponent sourceFunc={() => global.service.getNonParticipantsByTripId(tripId)}
                                       observerFunc={(component) => global.observerService.addPersonMapCallback(() => component.forceUpdate())}
                                       isPicker={true}
                                       pickerFunc={(user) => addToTrip(user)}/>

                </Content>
                <Fab postion="bottomRight" style={{backgroundColor: "#5067FF"}} onPress={() => this.props.navigation.navigate("CreateUser")}>
                    <Icon name="md-add" />
                </Fab>
            </Container>
        );
    }
}
