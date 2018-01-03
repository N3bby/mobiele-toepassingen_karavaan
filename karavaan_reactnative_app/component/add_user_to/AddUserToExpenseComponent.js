import React from 'react';
import {Body, Button, Container, Content, Fab, Header, Icon, Left, Right, Title} from "native-base";
import UserListComponent from "../UserListComponent";

export class AddUserToExpenseComponent extends React.Component {
    //I can't make a generic version of this as react-native-navigation doesn't allow passing functions as parameters

    constructor(props) {
        super(props);
    }

    render() {

        let tripId = this.props.navigation.state.params.tripId;
        let expenseId = this.props.navigation.state.params.expenseId;

        let addToExpense = (user) => {
            global.service.addParticipantToExpenseById(tripId, expenseId, user.id);
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
                    <Title>Add to expense</Title>
                    </Body>
                    <Right/>
                </Header>
                <Content style={{backgroundColor: "white"}}>
                    <UserListComponent navigation={this.props.navigation}
                                       sourceFunc={() => global.service.getParticipantsByTripId(tripId)}
                                       observerFunc={(component) => global.observerService.addTripPersonMapCallback(tripId, () => component.forceUpdate())}
                                       isPicker={true}
                                       pickerFunc={(user) => addToExpense(user)}/>
                </Content>
                <Fab postion="bottomRight" style={{backgroundColor: "#5067FF"}}
                     onPress={() => this.props.navigation.navigate("AddUserToTrip", {tripId: tripId})}>
                    <Icon name="md-add"/>
                </Fab>
            </Container>
        );
    }

}

