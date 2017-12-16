import React from 'react';
import {
    Container,
    Tab,
    List,
    ListItem,
    Content,
    Left,
    Body,
    Icon,
    Text,
    Thumbnail,
    SwipeRow,
    Button,
    View,
    Right,
    Header,
    Title,
    Tabs,
    Fab,
    Badge
}from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import {Person} from "../domain/Person";
import TripOverviewComponent from "./TripOverviewComponent";

export default class UserListOfTripComponent extends React.Component {

    constructor(navigation) {
        super();
        
    }

    addUserToTrip(id){
        var tripId = this.props.navigation.state.params.tripId;
        global.service.addExistingParticipantToTripById(tripId,id);
        alert("persoon id \n idnr: "+id +"\n tripId:"+tripId+"\n successvol toegevoegd");
        this.props.navigation.goBack();
        global.tripOverview.forceUpdate();
    }

    render() {
        var tripId = this.props.navigation.state.params.tripId;

        //TODO Fix the weird touch effect here.
        //Bug report of it can be found here: https://github.com/GeekyAnts/NativeBase/issues/1378
        //Apparently an issue with the last version of NativeBase. Might need to wait for a fix
        return (
            <Container>
            <Header hasTabs>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{ fontSize: 10}}>Add Friends on Trip</Title>
                        </Body>
                        <Right>
                        </Right>
                </Header>

                <Tabs>
                <Tab heading="Users of this trip">
                <List>
                {global.service.getParticipantsByTripId(tripId).map((item,index) => (
                    <ListItem key={index} button={true} onPress={() => this.props.navigation.navigate("UserOverview", { groupId: item.id })} avatar>
                    <Left>
                        <Badge primary>
                        <Text>{item.id}</Text>
                      </Badge>                        
                      </Left>        
                    <Body>
                        <Text>
                         {item.name}
                        </Text>
                        </Body>
                        <Right>
                        <Text note>{new Date().toLocaleString()}</Text>
                        </Right>
                    </ListItem>
                ))}
            </List>
           </Tab>   
                <Tab heading="List of all users">         
                <Content>
                <List>
                    {global.service.persons.map((item, index) => (
                        <ListItem key={index} button={true} onPress={() => this.props.navigation.navigate("UserOverview", { groupId: item.id })} avatar>
                            <Body>
                            <Grid>
                            <Col>
                            <Text>
                            <Icon active name="person" style={{padding:5}}/>
                            {item.firstName} {item.lastName}
                            </Text>
                            </Col>
                            <Col> 
                            <Right>
                            <Button success onPress={() => this.addUserToTrip(item.id)}>
                            <Text>Add</Text>
                            </Button>
                            </Right>
                            </Col>
                            </Grid>
                            </Body>
                        </ListItem>
                    ))}
                </List>
            </Content>
            <Fab postion="bottomRight" style={{ backgroundColor: "#5067FF" }}>
            <Icon name="md-add" onPress={()=>this.props.navigation.navigate("som")}/>
        </Fab>
        </Tab>
           </Tabs>
            </Container>
        );
    }

}

