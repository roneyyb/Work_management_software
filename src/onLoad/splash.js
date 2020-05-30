import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import styles from '../commonstyles/styles';
import AsyncStorage from '@react-native-community/async-storage';

export default class AuthLoadingScreen extends React.Component {
    constructor() {
        super();
        this.checkLoggedIn();
    }

    checkLoggedIn = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    };
    render() {
        return (
            <View style={[{flex:1},styles.cntr]}>
                <ActivityIndicator  size={'large'} color={'#2B65EC'}/>
            </View>
        );
    }
}