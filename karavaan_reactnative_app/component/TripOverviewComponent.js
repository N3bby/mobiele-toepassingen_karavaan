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
    Badge
}from 'native-base';
import {Trip} from "../domain/Trip";
import UserListOfTripComponent from "./UserListOfTripComponent";


export default class TripOverviewComponent extends React.Component {

    constructor() {
        super();
        global.tripOverview = this;
        this.UserListOfTripComponent = new UserListOfTripComponent();
    }

    deleteTrip(id){
        global.service.removeTripById(id);
        this.props.navigation.goBack();
        global.homeComponent.forceUpdate();
    }


    render() {
        
        if(this.UserListOfTripComponent.props === undefined) this.UserListOfTripComponent.props={};
        this.UserListOfTripComponent.props.navigation=this.props.navigation;




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
                    <Text note>Activity</Text>
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
                <Button rounded success onPress={()=>this.props.navigation.navigate("UserOverviewOfTrip",{tripId: groupId})}>
                <Icon active name="person"/>
                <Text style={{fontSize:12}}>Add user to trip</Text>
                </Button>
                </Col>
                <Col>
                <Button rounded info>
                <Icon active name="person"/>
                <Text style={{fontSize:12}}>Add Expenses to trip</Text>
                </Button>
                </Col>
                </Grid>
                </Body>
                <ListItem itemHeader first>
                <Text style={{justifyContent: "center",alignItems: "center"}}>List of expenses</Text>
                </ListItem>
                <List style={{padding:5}}>
                {global.service.getParticipantsByTripId(groupId).map((item,index) => (
                    <ListItem key={index} button={true} onPress={() => this.props.navigation.navigate("UserOverview", { groupId: item.id })} avatar>
                        <Left>
                        <Badge primary>
                        <Text>{item.id}</Text>
                      </Badge>                        
                      </Left>    
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
                <Grid>
                    <Col><Button><Text>Settle Up</Text></Button></Col>
                    <Col><Button><Text>Balances</Text></Button></Col>
                    <Col><Button><Text>Users</Text></Button></Col>
                </Grid>
            </Footer>
        </Container>
    );
}
}
