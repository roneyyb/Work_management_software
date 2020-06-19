import React, { Component } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet, TouchableHighlight, View} from 'react-native';

export default class extends Component {
    render() {
        const { iconTitle, onPress, iconColor, disabled, iconSize, touchSize } = this.props;
        return (
            <View style={styles.Container1style}>
                <TouchableHighlight
                    style={[styles.touchstyle, { height: touchSize || 36, width: touchSize || 36, borderRadius: touchSize/2 || 18}]}
                    underlayColor={'#8D8D8C33'}
                    onPress={() => {
                        onPress();
                    }}
                    disabled={disabled || false}
                >
                    <MaterialIcons
                        name={iconTitle}
                        size={iconSize || 24}
                        color={iconColor || '#8D8D8C'}
                    />
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Container1style: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    touchstyle: {
        alignItems: 'center',
        justifyContent: 'center'
    },
});