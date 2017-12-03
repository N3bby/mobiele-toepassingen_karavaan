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
    Icon
}from 'native-base';
import {Trip} from "../domain/Trip";

export default class TripOverviewComponent extends React.Component {

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Group Overview</Title>
                    </Body>
                    <Right />
                </Header>
                <Content></Content>
            </Container>
        );
    }
}
