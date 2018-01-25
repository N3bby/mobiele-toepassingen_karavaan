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
    CardItem, Subtitle, Tabs,
    Fab, Picker, Item
} from 'native-base';
import UserListComponent from "./UserListComponent";
import CreateExpenseComponent from "./CreateExpenseComponent";
import '../ServiceWrapper.js';
import {ExpenseListComponent} from "./ExpenseListComponent";
import {Alert, Platform} from "react-native";
import * as ExpenseType_1 from "../domain/ExpenseType";
import {DebtOverviewListComponent} from "./DebtOverviewListComponent";


export class BetterTripOverviewComponent extends React.Component {


    constructor(props) {
        super(props);
        global.tripOverview = this;
        global.observerService.addTripExpensesCallback(this.props.navigation.state.params.tripId, () => {
            this.forceUpdate()
        });
        this.state = {
            activeCurrency: global.service.getTripById(this.props.navigation.state.params.tripId).activeCurrency
        };

        this.descriptionTitleHeight = 0;
        this.descriptionTextHeight = 0;

    }

    //TODO: Add confirmation dialog with checkbox
    deleteTrip(id) {
        Alert.alert(
            'Delete Trip',
            'Are you sure you want to delete this trip? All data will be lost',
            [
                {
                    text: 'No', onPress: () => {
                    }, style: 'cancel'
                },
                {
                    text: 'Yes', onPress: () => {
                        try {
                            global.service.removeTripById(id);
                            global.saveService();
                            this.props.navigation.goBack();
                        }
                        catch (error) {
                            alert(error);
                        }
                    }
                },
            ],
            {cancelable: false}
        );
    }

    navigateToExpenseForm(tripId) {
        this.props.navigation.navigate("CreateExpenseComponent", {tripId: tripId});
    }

    navigateToUserAdd(tripId) {
        this.props.navigation.navigate("AddUserToTrip", {tripId: tripId})
    }

    onValueChangeCurrency(value) {
        this.setState({
            activeCurrency: value
        });
        let tripId = this.props.navigation.state.params.tripId;
        let trip = global.service.getTripById(tripId);
        try {
            trip.activeCurrency = value;
            global.saveService();
        } catch (e) {
            alert("Something went wrong: " + e);
        }
    }

    navigateEditCurrencies() {
        let tripId = this.props.navigation.state.params.tripId;
        this.props.navigation.navigate("CurrencyPicker", {
            tripId: tripId,
            onPick: () => {
                this.forceUpdate();
                this.props.navigation.state.params.onBack();
                //Not actually correct, but idk how to intercept an actual goBack event
                //Just updating when something changes that should be reflected in parent works too
                //This is becoming a huge mess of spaghetti-code though
                //Rip my career as a js dev (not that I'd want to be one)
            }
        });
    }

    render() {

        let tripId = this.props.navigation.state.params.tripId;
        let trip = global.service.getTripById(tripId);

        //Trying to mimic a header-like style here so it blends in
        //Taken from: https://github.com/GeekyAnts/NativeBase/blob/master/src/theme/variables/platform.js
        let platform = Platform.OS;
        let bgColor = platform === "ios" ? "#F8F8F8" : "#3F51B5";
        let textColor = platform === "ios" ? "#000" : "#fff";

        //This entire thing is to have the description view have the right height
        //I couldn't find out to get this working with regular styling
        let descriptionViewHeight = this.descriptionTextHeight + this.descriptionTitleHeight + 10;
        let that = this;
        let onLayoutDescriptionText = (event) => {
            if (that.descriptionTextHeight === 0) {
                that.descriptionTextHeight = event.nativeEvent.layout.height;
                that.forceUpdate();
            }
        };
        let onLayoutDescriptionTitle = (event) => {
            if (that.descriptionTitleHeight === 0) {
                that.descriptionTitleHeight = event.nativeEvent.layout.height;
                that.forceUpdate();
            }
        };

        let removePerson = (userId) => {
            global.service.removeParticipantById(tripId, userId);
            global.saveService();
        };

        return (
            <Container>

                <Header hasTabs>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                    <Body>
                    <Title style={{marginTop:3}}>{trip.name}</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.navigateEditCurrencies()}>
                            <Icon active style={{color:'rgba(255,255,255,0.8)', marginRight: 12}} name='md-create'/>
                        </Button>
                        <Text style={{color:'rgba(255,255,255,0.8)', fontSize: 16, marginBottom: 9, marginRight: 5, fontWeight:'bold'}}>{trip.activeCurrency}</Text>
                        <Button transparent onPress={() => this.deleteTrip(trip.id)}>
                            <Icon active name="trash"/>
                        </Button>
                    </Right>
                </Header>

                <View style={{height: descriptionViewHeight, backgroundColor: bgColor, padding: 10, paddingTop: 0}}>
                    {/*<Title onLayout={onLayoutDescriptionTitle} style={{*/}
                        {/*marginBottom: 5,*/}
                        {/*color: textColor,*/}
                        {/*marginLeft: 0,*/}
                        {/*fontSize: 18,*/}
                        {/*textAlign: 'left'*/}
                    {/*}}>Description</Title>*/}
                    <Text onLayout={onLayoutDescriptionText}
                          style={{color: textColor, fontSize: 15, marginLeft: 0}}>{trip.description}</Text>
                </View>

                <Tabs>
                    <Tab heading="Expenses">
                        <ExpenseListComponent navigation={this.props.navigation} tripId={tripId}/>
                        <Fab postion="bottomRight" style={{backgroundColor: "#5067FF"}}
                             onPress={() => this.navigateToExpenseForm(tripId)}>
                            <Icon name="md-add"/>
                        </Fab>
                    </Tab>
                    <Tab heading="Participants">
                        <UserListComponent sourceFunc={() => global.service.getTripById(tripId).participants}
                                           observerFunc={(component) => global.observerService.addTripPersonMapCallback(tripId, () => component.forceUpdate())}
                                           removeUserFunc={removePerson}/>
                        <Fab postion="bottomRight" style={{backgroundColor: "#5067FF"}}
                             onPress={() => this.navigateToUserAdd(tripId)}>
                            <Icon name="md-add"/>
                        </Fab>
                    </Tab>
                    <Tab heading="Debts">
                        <DebtOverviewListComponent tripId={tripId}/>
                    </Tab>
                </Tabs>

            </Container>
        );
    }

}

