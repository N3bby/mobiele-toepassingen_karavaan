import React, {Component} from 'react';

import {
    Container,
    Header,
    Title,
    Button,
    Left,
    Right,
    Body,
    Icon,
    Text,
    Tabs,
    Tab
}from 'native-base';

export default class HomeComponent extends Component<{}> {
    render() {
        return (
            <Container>

                <Header hasTabs>
                    <Left>
                        <Button transparent>
                            <Icon name='menu'/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>Header</Title>
                    </Body>
                    <Right/>

                </Header>

                <Tabs>
                    <Tab heading="Trips">
                        <Text>Trips</Text>
                    </Tab>
                    <Tab heading="Users">
                        <Text>Users</Text>
                    </Tab>
                    <Tab heading="Activity">
                        <Text>Activity</Text>
                    </Tab>
                </Tabs>

            </Container>
        );
    }
}