import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';

const SCREEN_WIDTH = Dimensions.get('window').width;
const upadding = Math.round(SCREEN_WIDTH * 0.03);


class Gmail extends Component {
    render() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: upadding * 1.5,
                    borderBottomColor: 'grey',
                    borderBottomWidth: 0.4
                }}
            >
                <View
                    style={{
                        height: upadding * 3,
                        width: upadding * 3,
                        borderRadius: upadding * 1.5,
                        backgroundColor: '#346ca5',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Text style={{ color: 'white', fontSize: 17.5 }}>{`${this.props.username[0]}`}</Text>
                </View>
                <View
                    style={{
                        height: upadding & 3.5,
                        marginLeft: upadding,
                        paddingBottom: upadding,
                        flexDirection: 'column'
                    }}
                >
                    <Text
                        style={{ fontSize: upadding * 1.3, color: '#8d8d8c', fontWeight: 'bold' }}
                    >{`${this.props.username}`}</Text>
                    <Text
                        style={{ fontSize: upadding, color: '#8D8D8C' }}
                    >{`${this.props.email}`}</Text>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        email: state.user.email,
        username: state.user.username
    };
};

export default connect(mapStateToProps)(Gmail);
