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

    navigateToExpenseOverview(tripId, expenseId) {
        // TODO
    }

    removeExpense(tripId, expenseId) {
        global.service.removeExpenseFromTripById(tripId, expenseId);
        global.saveService();
    }


    render() {

        var groupId = this.props.navigation.state.params.groupId;
        var group = global.service.getTripById(groupId);

        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>{group.name}</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.deleteTrip(group.id)}>
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
                            <Text>{group.description}</Text>
                            </Body>
                        </CardItem>
                    </Card>

                    <Card style={{marginBottom:0}}>
                        <CardItem header>
                            <H3>Expenses</H3>
                        </CardItem>
                    </Card>

                    <View style={{ backgroundColor: 'white'}}>
                        {/* TODO: Move this to a seperate component */}
                        <List dataArray={global.service.getExpensesByTripId(groupId)} renderRow={(expense) => (
                                <ListItem key={expense.id} button={false}
                                          onPress={() => this.navigateToExpenseOverview(expense.id)} icon>
                                    <Left>
                                        <Icon name="cash"/>
                                    </Left>
                                    <Body>
                                        <View style={{flexDirection: 'row'}}>
                                            <Text numberOfLines={1} style={{flex:1}}>{expense.description}</Text>
                                            <Text style={{marginLeft: 'auto', fontWeight:'bold', fontSize: 17}}>{expense.expenseAmount}</Text>
                                        </View>
                                    </Body>
                                    <Right>
                                        <Button transparent onPress={() => this.removeExpense(groupId, expense.id)}>
                                            <Icon name="trash"/>
                                        </Button>
                                    </Right>
                                </ListItem>
                            )}/>
                    </View>

                    <Card style={{marginBottom:0, marginTop: 10}}>
                        <CardItem header>
                            <H3>Participants</H3>
                        </CardItem>
                    </Card>

                    <View style={{backgroundColor:'white'}}>
                    <UserListComponent navigation={this.props.navigation}
                                       sourceFunc={() => global.service.getTripById(groupId).participants}
                                       observerFunc={(component) => global.observerService.addTripPersonMapCallback(groupId, () => component.forceUpdate())}/>
                    </View>

                </Content>

                <Footer>
                    <Left style={{margin: 5}}>
                        <Button success
                                onPress={() => this.props.navigation.navigate("addUserToTrip", {tripId: groupId})}><Text>Add
                            users</Text></Button>
                    </Left>
                    <Right style={{margin: 5}}>
                        <Button info onPress={() => this.navigateToExpenseForm(groupId)}><Text>Add
                            expenses</Text></Button>
                    </Right>
                </Footer>

            </Container>
        );
    }
}

