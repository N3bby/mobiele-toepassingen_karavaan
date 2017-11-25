/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Platform} from 'react-native';

import {
Container,
Header,
Title,
Content,
Button,
Left,
Right,
Body,
Icon,
Text,
Tabs,
Tab}from 'native-base';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
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
            <Title >Karavaan App</Title>
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
        {/*<Content>*/}
          {/*<Text>Content goes here</Text>*/}
        {/*</Content>*/}
      </Container>
    );
  }
}


