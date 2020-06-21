import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, Text, TextInput, View} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/MaterialIcons';
import AppConstant from '../../../constants/AppConstant';

export default class WrappedTextInput extends Component {
    constructor(props) {
        super(props);
    }

    getIcon = () => {
        const {error, loading} = this.props;
        if (loading) {
            return (
                <ActivityIndicator
                    size={'small'}
                    style={{marginRight: 5}}
                    color={AppConstant.appColor}
                />
            );
        }
        if (error === false) {
            return (
                <FeatherIcon
                    name={'check'}
                    color={'green'}
                    size={25}
                />
            );
        } else if (typeof error === 'string') {
            return (
                <FeatherIcon
                    name={'clear'}
                    color={'red'}
                    size={25}
                />
            );
        } else {
            return (<View/>);
        }
    };

    render() {
        const {error} = this.props;

        return (
            <View style={styles.containerStyle}>
                <View
                    style={{
                        flexDirection: 'row',
                        borderBottomWidth: 0.5,
                        borderBottomColor: '#222',
                        flex: 4,
                    }}>
                    <TextInput
                        style={[styles.textInputStyle]}
                        placeholder={this.props.placeholder}
                        autocorrect={this.props.autocorrect}
                        selectionColor={`${AppConstant.appColor}33`}
                        //selectionColor={this.props.selectionColor}
                        autoCompleteType={'off'}
                        returnKeyType={this.props.returnKeyType}
                        keyboardType={this.props.keyboardType}
                        secureTextEntry={this.props.secureTextEntry}
                        clearButtonMode={'always'}
                        keyboardAppearance={'dark'}
                        maxLength={this.props.maxLength}
                        onBlur={this.props.onBlur}
                        onChangeText={text => {
                            console.log('text =>', text);
                            this.props.onChangeText(text);
                        }}
                        value={this.props.value}
                        placeholderTextColor={this.props.placeholderTextColor}
                    />
                    <View style={styles.buttonStyle}>
                        {this.getIcon()}
                    </View>
                </View>
                {typeof error === 'string' ? (
                    <View style={{
                        flex: 2,
                        justifyContent: 'center',
                    }}>
                        <Text style={{
                            color: 'red',
                            fontSize: 12,
                        }}>
                            {this.props.error}
                        </Text>
                    </View>
                ) : (
                    <View style={{
                        flex: 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}/>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        height: 60,
        flexDirection: 'column',
    },
    textInputStyle: {
        flex: 8,
        height: 50,
        fontSize: 15,
        alignContent: 'center',
        alignItems: 'center',
        color: AppConstant.appColor,
    },
    buttonStyle: {
        flex: 2,
        height: 50,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
});
