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
import UserListForTripComponent from "./UserListForTripComponent";
import '../ServiceWrapper.js';


export default class TripOverviewComponent extends React.Component {

    constructor() {
        super();
        global.tripOverview = this;
        this.UserListForTripComponent = new UserListForTripComponent();
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


    render() {
        
        if(this.UserListForTripComponent.props === undefined) this.UserListForTripComponent.props={};
        this.UserListForTripComponent.props.navigation=this.props.navigation;




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
                    <Text note>Expenses</Text>
                    </Body>
                <Right>
                <Button small danger onPress={() => this.deleteTrip(group.id)}>
                <Icon active name="trash" />
                </Button>
                </Right>
            </Header>
            <Content>
                <List>
                {global.service.getParticipantsByTripId(groupId).map((item,index) => (
                    <ListItem key={index} button={true} onPress={() => this.props.navigation.navigate("UserOverview", { groupId: item.id })} avatar>
                    <Body>
                        <Text>{item.name}</Text>
                        </Body>
                        <Right>
                        <Text note>{new Date().toLocaleString()}</Text>
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
            <Button info><Text>Add expenses</Text></Button>
            </Right>
            </Footer>
        </Container>
    );
}
}
