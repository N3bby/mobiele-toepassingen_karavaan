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
    View
}from 'native-base';
import {Trip} from "../domain/Trip";
import  UserListForTripComponent  from "./UserListForTripComponent";
import  CreateExpenseComponent  from "./CreateExpenseComponent";
import '../ServiceWrapper.js';


export default class TripOverviewComponent extends React.Component {

    constructor() {
        super();
        global.tripOverview = this;
        this.UserListForTripComponent = new UserListForTripComponent();
        this.CreateExpenseComponent = new CreateExpenseComponent();
    }

    deleteTrip(id){
        global.service.removeTripById(id);
        global.saveService();
        this.props.navigation.goBack();
        global.homeComponent.forceUpdate();
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
            global.homeComponent.forceUpdate();
        }
        catch (error)
        {
            alert(error);
        }
        
        global.homeComponent.forceUpdate();
    }


    render() {
        
        if(this.UserListForTripComponent.props === undefined) this.UserListForTripComponent.props={};
        this.UserListForTripComponent.props.navigation=this.props.navigation;
        
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
                    <Text note>Expenses</Text>
                    </Body>
                <Right>
                <Button small danger onPress={() => this.deleteTrip(group.id)}>
                <Icon active name="trash" />
                </Button>
                </Right>
                </Header>
            <Content>
            <Body>
            <Grid>
                <Col>
                <Button rounded success onPress={()=> this.props.navigation.navigate("UserOverviewForTrip",{tripId: groupId})}>
                <Icon active name="person"/>
                <Text style={{fontSize:12}}>Add user to trip</Text>
                </Button>
                </Col>
                <Col>
                <Button rounded info onPress={() => this.navigateToExpenseForm(groupId) } >
                <Icon active name="person"/>
                <Text style={{fontSize:12}}>Add Expenses to trip</Text>
                </Button>
                </Col>
                </Grid>
                </Body>
                <Text style={{justifyContent: "center",alignItems: "center"}}>List of expenses</Text>
                    
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
                             <Button danger>
                                 <Icon name="trash" onPress={() => this.removeExpense(groupId, item.id)} />
                             </Button>
                         </Right>
                      </ListItem>
                     ))}
                    
                </List>

                <List style={{ flex: 1, backgroundColor: '#fff' }}>
                {global.service.getParticipantsByTripId(groupId).map((item,index) => (
                    <ListItem key={index} button={true} onPress={() => this.props.navigation.navigate("UserOverview", { groupId: item.id })} avatar>
                    <Body> 
                        <Text>{item.name}</Text>
                    </Body>
                    </ListItem>
                ))}
            </List>
            </Content>
            <Footer>
            <Left style={{margin:5}}>
            <Button success onPress={()=>this.props.navigation.navigate("UserOverviewForTrip",{tripId: groupId})}><Text>Add users</Text></Button>
            </Left>
            <Right style={{margin:5}}>
            <Button info><Text>Add expenses</Text></Button>
            </Right>
            </Footer>
        </Container>
    );
}
}
