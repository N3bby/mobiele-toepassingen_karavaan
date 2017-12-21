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
    Col,
    Grid,
    Center,
    Thumbnail,
    Badge,
    View,
    H2
}from 'native-base';
import {Trip} from "../domain/Trip";

import  CreateExpenseComponent  from "./CreateExpenseComponent";
import '../ServiceWrapper.js';


export default class TripOverviewComponent extends React.Component {

    constructor() {
        super();
        global.tripOverview = this;
        this.CreateExpenseComponent = new CreateExpenseComponent();
    }

    deleteTrip(id){
        global.service.removeTripById(id);
        global.saveService();
        this.props.navigation.goBack();
    }

    goToHome(){
       // this.props.navigation.navigate("Home");
        //global.homeComponent.forceUpdate();
    }
    
    navigateToExpenseForm(tripId)
    {
        this.props.navigation.navigate("CreateExpenseComponent", {tripId : tripId});
    }
    
    navigateToExpenseOverview(tripId, expenseId)
    {
        // TODO
    }
    
    removeExpense(tripId, expenseId)
    {
        try
        {
            global.service.removeExpenseFromTripById(tripId, expenseId);
            global.saveService();
        }
        catch (error)
        {
            alert(error);
        }
    }


    render() {

        if(this.CreateExpenseComponent.props === undefined) this.CreateExpenseComponent.props={};
        this.CreateExpenseComponent.props.navigation=this.props.navigation;

        var groupId = this.props.navigation.state.params.groupId;
        var group = global.service.getTripById(groupId);

        return (
        <Container>
            <Header>
                <Left>
                    <Button transparent onPress={()=> this.props.navigation.goBack()}>
                        <Icon name="arrow-back"/>
                    </Button>
                </Left>
                <Body>
                    <Title>{group.name}</Title>
                    <Text note>{group.description}</Text>
                    </Body>
                <Right>
                <Button small danger onPress={() => this.deleteTrip(group.id)}>
                <Icon active name="trash" />
                </Button>
                </Right>
                </Header>
            <Content>
                <H2 style={{margin: 5}}>List of expenses</H2>
                    
                <List>
                    
                    {global.service.getExpensesByTripId(groupId).map((item, index) => (
                     
                     <ListItem key={index} button={true} onPress={() => this.navigateToExpenseOverview(item.id)}>
                         <Left>
                             <Icon name="cash" />
                         </Left>
                         <Body>
                             <Text>{item.description}</Text>
                             <Text>{item.expenseAmount}</Text>
                         </Body>
                         <Right>
                             <Button danger onPress={() => this.removeExpense(groupId, item.id)} >
                                 <Icon name="trash" />
                             </Button>
                         </Right>
                      </ListItem>
                     ))}
                    
                </List>
            </Content>
            <Footer>
            <Left style={{margin:5}}>
            <Button success onPress={()=>this.props.navigation.navigate("UserOverviewForTrip",{tripId: groupId})}><Text>Add users</Text></Button>
            </Left>
            <Right style={{margin:5}}>
            <Button info onPress={() => this.navigateToExpenseForm(groupId)}><Text>Add expenses</Text></Button>
            </Right>
            </Footer>
        </Container>
    );
}
}

