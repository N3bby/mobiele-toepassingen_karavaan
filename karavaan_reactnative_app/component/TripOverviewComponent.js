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


export default class TripOverviewComponent extends React.Component {

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
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.deleteTrip(trip.id)}>
                            <Icon active name="trash"/>
                        </Button>
                    </Right>
                </Header>

                <Content>

                    <Card>
                        <CardItem header>
                            <H3>Description</H3>
                        </CardItem>
                        <CardItem>
                            <Body>
                            <Text>{trip.description}</Text>
                            </Body>
                        </CardItem>
                    </Card>

                    <Card style={{marginBottom:0}}>
                        <CardItem header>
                            <H3>Expenses</H3>
                        </CardItem>
                    </Card>

                    <View style={{ backgroundColor: 'white'}}>
                        <ExpenseListComponent tripId={tripId}/>
                    </View>

                    <Card style={{marginBottom:0, marginTop: 10}}>
                        <CardItem header>
                            <H3>Participants</H3>
                        </CardItem>
                    </Card>

                    <View style={{backgroundColor:'white'}}>
                    <UserListComponent navigation={this.props.navigation}
                                       sourceFunc={() => global.service.getTripById(tripId).participants}
                                       observerFunc={(component) => global.observerService.addTripPersonMapCallback(tripId, () => component.forceUpdate())}
                                       removeUserFunc={global.service.removePersonById}/>
                    </View>

                </Content>

                <Footer>
                    <Left style={{margin: 5}}>
                        <Button success
                                onPress={() => this.props.navigation.navigate("addUserToTrip", {tripId: tripId})}><Text>Add
                            users</Text></Button>
                    </Left>
                    <Right style={{margin: 5}}>
                        <Button info onPress={() => this.navigateToExpenseForm(tripId)}><Text>Add
                            expenses</Text></Button>
                    </Right>
                </Footer>

            </Container>
        );
    }
}

