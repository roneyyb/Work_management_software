import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';

class Gmail extends Component {
  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems:'center',
          padding:20,
          borderBottomColor: 'grey',
          borderBottomWidth: 0.4
        }}
      >
        <View
          style={{
            height: 35,
            width: 35,
            borderRadius: 17.5,
            backgroundColor: '#346ca5',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text style={{ color: 'white', fontSize:17.5 }}>{`${this.props.username[0]}`}</Text>
        </View>
        <View
          style={{
            height: 40,
            marginLeft:10,
            paddingBottom: 10,
            flexDirection: 'column'
          }}
        >
          <Text
            style={{ fontSize: 15 , color: '#000000CC', fontWeight:'bold' }}
          >{`${this.props.username}`}</Text>
          <Text
            style={{ fontSize: 10, color: '#8D8D8C' }}
          >{`${this.props.email}`}</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  if (state.signup.signup) {
    return {
      email: state.signup.email,
      username: state.signup.username
    };
  }
  return {
    email: state.auth.email,
    username: state.auth.username
  };
};

export default connect(mapStateToProps)(Gmail);
