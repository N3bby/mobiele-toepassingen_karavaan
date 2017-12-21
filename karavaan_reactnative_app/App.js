import React from 'react';
import {Platform} from 'react-native';

import { Root, Text } from "native-base";
import AppNavigator from "./AppNavigator";
import {KaravaanService} from "./domain/KaravaanService";
import {ObserverService} from "./ObserverService";

import './ServiceWrapper.js';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends React.Component {

    constructor() {
        super();

        this.state = {
            isLoading: true
        };

        global.loadService().then(() =>
        {
            this.setState({
                isLoading: false
            })
        });
    }

    render() {

        if(this.state.isLoading) {
            return (
                <Root>
                    <Text>Loading...</Text>
                </Root>
            );
        }

        return (
            <Root>
                <AppNavigator/>
            </Root>
        );
    }
}

