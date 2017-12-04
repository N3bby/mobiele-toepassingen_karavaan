import React from 'react';
import {Platform} from 'react-native';

import { Root } from "native-base";
import AppNavigator from "./AppNavigator";
import {KaravaanService} from "./domain/KaravaanService";

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends React.Component {

    constructor() {
        super();
        global.service = new KaravaanService();
    }

    render() {
        return (
            <Root>
                <AppNavigator/>
            </Root>
        );
    }
}

