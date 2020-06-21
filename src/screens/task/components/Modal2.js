import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Dimensions} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/FontAwesome';
import {sendEmail} from './sendmail';
import Gmail from './gmail';
import WrappedModal2Button from './WrappedModal2Button';

const SCREEN_WIDTH = Dimensions.get('window').width;
const upadding = Math.round(SCREEN_WIDTH * 0.03);

class Modal2Content extends Component {
  render() {
    return (
      <View
        style={{
          flexDirection: 'column',
          backgroundColor: 'white',
          borderTopRightRadius: upadding,
          borderTopLeftRadius: upadding,
        }}>
        <Gmail />
        <WrappedModal2Button
          onPress={() => {
            sendEmail(this.props.email, 'Send Feedback').then(() => {
              this.props.onBackdropPress(null);
            });
          }}
          style={{}}
          buttonText={'Send Feedback'}
          iconTitle={'feedback'}
        />

        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            height: upadding * 6,
            width: SCREEN_WIDTH,
            alignItems: 'center',
            flexDirection: 'row',
          }}
          onPress={() => {
            AsyncStorage.clear();
            this.props.Logout();
            this.props.navigation.navigate('Auth');
          }}>
          <Icons
            name="sign-out"
            size={upadding * 2.5}
            color="grey"
            style={{marginLeft: upadding * 1.5}}
            light
          />
          <Text
            style={{
              marginLeft: upadding * 1.5,
              color: '#8D8D8C',
              fontSize: upadding * 1.2,
            }}>
            {'Logout'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Modal2Content;
