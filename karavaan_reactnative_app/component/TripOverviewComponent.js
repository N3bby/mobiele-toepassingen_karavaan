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
    Center
}from 'native-base';
import {Trip} from "../domain/Trip";
import UserListOfTripComponent from "./UserListOfTripComponent";


export default class TripOverviewComponent extends React.Component {

    constructor() {
        super();
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
                    <Text>Add Person</Text>
                    </Button>
                    </Col>
                    <Col>
                    <Button rounded info>
                    <Icon active name="person"/>
                    <Text>Add Expense</Text>
                    </Button>
                    </Col>
                    </Grid>
                    </Body>
                    <List>
                    {global.service.getParticipantsByTripId(0).map((item) => (
                        <ListItem button={true} onPress={() => this.props.navigation.navigate("UserOverview", { groupId: item.id })} avatar>
                            <Body>
                            <Text>{item.name}</Text>
                            <Text note>{item.firstName}</Text>
                            <Text note>{item.lastName}</Text>                            
                            </Body>
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
