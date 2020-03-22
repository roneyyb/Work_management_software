import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions
} from 'react-native';

import  AsyncStorage from '@react-native-community/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/FontAwesome';
import { sendEmail } from './sendmail';
import Gmail from './gmail';

const SCREEN_WIDTH = Dimensions.get('window').width;
const upadding = Math.round(SCREEN_WIDTH * 0.03);

class Modal2Content extends Component {
  render() {
    return (
      <View
        style={{
          flexDirection: 'column',
          backgroundColor: 'white',
          width: SCREEN_WIDTH,
          paddingBottom: upadding /2,
          borderTopRightRadius: upadding,
          borderTopLeftRadius:upadding
        }}
      >
        <Gmail />
        <TouchableOpacity
          underlayColor={'#8D8D8C'}
          style={{
            height: upadding * 7,
            borderBottomWidth: 0.4,
            borderColor: 'grey',
            flexDirection: 'row',
            width: SCREEN_WIDTH,
            alignItems: 'center'
          }}
          onPress={() => {
            sendEmail(this.props.email, 'Send Feedback').then(() => {
              this.props.onBackdropPress(null);
            });
          }}
        >
          <MaterialIcons
            name='feedback'
            size={upadding * 2.5}
            width={0}
            color='grey'
            style={{ marginLeft: upadding  * 1.5 }}
            light
          />
          <Text style={{ marginLeft: upadding * 1.5, color: '#8D8D8C', fontSize: upadding * 1.2 }}>
            {'Send Feedback'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: upadding * 7,
            width: SCREEN_WIDTH,
            alignItems: 'center',
            flexDirection: 'row'
          }}
          onPress={() => {
            AsyncStorage.clear();
            this.props.Logout();
            this.props.cleareverything();
            this.props.navigation.navigate('Auth');
          }}
        >
          <Icons
            name='sign-out'
            size={upadding  * 2.5}
            color='grey'
            style={{ marginLeft: upadding * 1.5 }}
            light
          />
          <Text style={{ marginLeft: upadding * 1.5, color: '#8D8D8C', fontSize: upadding * 1.2 }}>
            {'Logout'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Modal2Content;
