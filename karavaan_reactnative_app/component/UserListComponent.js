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
    Right
} from 'native-base';

import '../ServiceWrapper.js';

export default class UserListComponent extends React.Component {

    //Properties
    // - navigation: Navigation object
    // - userSrcFunc: Function that gets the array for users -- see HomeComponent for an example

    constructor() {
        super();
        //TODO: Make the oobserver stuff generic for this class
        global.observerService.addPersonMapCallback(() => this.forceUpdate() );
    }

    render() {
        return (
            <Content>
                <List dataArray={this.props.userSrcFunc()} renderRow={(user) =>
                    <ListItem key={user.userId} button={false} icon>
                        <Left>
                            <Icon style={{fontSize: 25}} name="person"/>
                        </Left>
                        <Body>
                        <Text style={{fontSize: 18}}>{user.name}</Text>
                        </Body>
                    </ListItem>
                }/>
            </Content>
        );
    }
}
