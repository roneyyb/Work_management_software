import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import styles from '../commonstyles/styles';

class LoadScreen extends Component {
    render() {
        return (
            <View style={styles.cntr}>
                <ActivityIndicator size={'large'} />
            </View>
        );
    }
}


export default LoadScreen;
