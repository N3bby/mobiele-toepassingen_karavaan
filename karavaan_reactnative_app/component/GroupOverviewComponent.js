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
    Left
}from 'native-base';
import {Trip} from "../domain/Trip";

export default class GroupOverviewComponent extends Component<{}> {

    constructor() {
        super();
    }

    render() {


        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => navigation.goBack()}>
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
