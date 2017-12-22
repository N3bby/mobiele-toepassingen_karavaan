import React from 'react';
import {
    Container,
    Tab,
    List,
    ListItem,
    Content,
    Title,
    Header,
    Body,
    Button,
    Left,
    Right,
    Icon,
    Text,
    Footer,
    Center,
    Thumbnail,
    Badge,
    View,
    H2,
    H3,
    Card,
    CardItem
} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import UserListComponent from "./UserListComponent";
import CreateExpenseComponent from "./CreateExpenseComponent";
import '../ServiceWrapper.js';
import {ExpenseListComponent} from "./ExpenseListComponent";


export class BetterTripOverviewComponent extends React.Component {

    constructor(props) {
        super(props);
        global.tripOverview = this;
        global.observerService.addTripExpensesCallback(this.props.navigation.state.params.groupId, () => {this.forceUpdate()})
    }

    //TODO: Add confirmation dialog with checkbox
    deleteTrip(id) {
        global.service.removeTripById(id);
        global.saveService();
        this.props.navigation.goBack();
    }

    navigateToExpenseForm(tripId) {
        this.props.navigation.navigate("CreateExpenseComponent", {tripId: tripId});
    }

    navigateToUserAdd(tripId) {
        this.props.navigation.navigate("addUserToTrip", {tripId: tripId})
    }

    render() {

        let tripId = this.props.navigation.state.params.groupId;
        let trip = global.service.getTripById(tripId);

        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>{trip.name}</Title>
                    <Subtitle>{trip.description}</Subtitle>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.deleteTrip(trip.id)}>
                            <Icon active name="trash"/>
                        </Button>
                    </Right>
                </Header>



            </Container>
        );
    }
}

