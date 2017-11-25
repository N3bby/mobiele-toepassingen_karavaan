import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
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
                    <Body style={styles.header}>
                    <Title style={styles.headerText}>Karavaan App</Title>
                    </Body>
                    <Right/>

                </Header>

                <Tabs>
                    <Tab heading="Trips">
                        <Text>Trips</Text>
                        <Button primary style={styles.addButton}><Text> Create A Trip </Text></Button>                        
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

const styles = StyleSheet.create({
    header: {
        backgroundColor:'#CC6600',
        borderBottomColor: '#ddd',
    },
    headerText: {
        color: '#E6E6DC',
        fontSize: 14,
        padding: 10,
    },
    addButton: {
        position: 'absolute',
        zIndex: 0, //11
        right: 75, //20
        bottom: 10, //90
        justifyContent: 'center',      
        width: 200, //90
        height: 30, //90
        borderRadius: 70, //50
        elevation: 8,
    },
});