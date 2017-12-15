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
    Grid
}from 'native-base';
import {Trip} from "../domain/Trip";

export default class TripOverviewComponent extends React.Component {

    constructor() {
        super();
    }

    deleteTrip(id){
        global.service.removeTripById(id);
        this.props.navigation.goBack();
        global.homeComponent.forceUpdate();
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
                    <Button small danger onPress={() => this.deleteTrip(group.id)}>
                    <Icon active name="trash" />
                    </Button>
                    </Right>
                </Header>
                <Content>
                    <Text>Activity</Text>
                    <List>
                        <ListItem>
                            <Text>Test</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Test</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Test</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Test</Text>
                        </ListItem>
                    </List>
                </Content>
                <Footer>
                    <Grid>
                        <Col><Button><Text>Settle Up</Text></Button></Col>
                        <Col><Button><Text>Balances</Text></Button></Col>
                    </Grid>
                </Footer>
            </Container>
        );
    }
}
