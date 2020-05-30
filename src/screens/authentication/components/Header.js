import { SafeAreaConsumer } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import AppConstant from '../../../constants/AppConstant';
import Feather1s from 'react-native-vector-icons/MaterialIcons';
import { Header } from 'react-native-elements';
import React from 'react';

export default class Headers extends React.Component {

    render() {
        const { rightIcon, screen, rightComponent, type } = this.props;
        console.log('rightComponent =>', rightComponent);
        if (type === 'login' || type === 'signup') {
            return (
              <SafeAreaConsumer>
                {insets => [
                  <View
                    style={{
                      flex: 1,
                      paddingTop: insets.top,
                      backgroundColor: '#ffffff',
                    }}>
                    <Header
                      placement={'left'}
                      containerStyle={{
                        height: 60,
                        paddingTop: 3,
                        paddingHorizontal: 20,
                      }}
                      backgroundColor={'#ffffff'}
                      leftComponent={
                        <TouchableOpacity
                          onPress={() => {
                            this.props.navigation.goBack();
                          }}>
                          <Feather1s
                            name="chevron-left"
                            size={35}
                            style={{
                              zIndex: 100,
                              color:AppConstant.appColor
                            }}
                          />
                        </TouchableOpacity>
                      }
                    />
                    {this.props.children}
                  </View>,
                ]}
              </SafeAreaConsumer>
            );
        }
        
    }
}

