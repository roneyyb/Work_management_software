import React, { Componenet } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const paddingE = Math.round(SCREEN_WIDTH * 0.05);
const fontSizeE = Math.round(SCREEN_WIDTH * 0.035);
const height = paddingE * 1.2;

export default class Reminder extends Componenet {
    render() {
        return(
            <View>

            </View>
        );
        }
    }

const styles = StyleSheet.create({
    container: {
        height: paddingE * 1.5,
        marginRight: paddingE * 0.4,
        flex: 3,
        paddingLeft: paddingE * 0.8,
        backgroundColor: '#2B65EC0F',
        borderRadius: 3,
        justifyContent: 'center'
    }
})

