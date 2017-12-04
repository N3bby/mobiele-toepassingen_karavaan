import React, {Component} from 'react';
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

export default class CreateTripComponent extends React.Component {

    constructor() {
        super();
    }

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
                    <Title>Create Trip Overview</Title>
                </Body>
                <Right />
            </Header>
            <Content></Content>
        </Container>
        );
    }
}
