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

export default class CreateATripComponent extends Component<{}> {

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
                        <Title>Create A Trip</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                </Content>

            </Container>
        );
    }
}
