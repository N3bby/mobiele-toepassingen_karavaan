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
    Badge
}from 'native-base';
import {Person} from "../domain/Person";

export default class UserListOfTripComponent extends React.Component {

    constructor(navigation) {
        super();
        //global.userListOfTripComponent = this;
    }
    render() {
        var tripId = this.props.navigation.state.params.tripId;
               return (
            <Container>
            <Content>
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
            </Content>
            </Container>
        );
    }

}

