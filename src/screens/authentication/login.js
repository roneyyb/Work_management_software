import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

import  AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

import {
  onEmailChange,
  onPasswordChange,
  onButtonPress,
  Clearall
} from '../../actions/loginaction';

import { worklistfetch } from '../../actions/worklistaction';
import { cleareverything } from '../../actions/cleareverythingaction';
import Textinput from './components/textinput';
import Button from './components/button';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const upadding = Math.round(SCREEN_WIDTH * 0.03);

class Login extends Component {
 
  constructor(props) {
    super(props);
    this.props.cleareverything();
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.login) {
      AsyncStorage.setItem('userToken', 'abc');
      nextProps.navigation.navigate('settingupdatabase');
      return false;
    }
    return true;
  }

  onEmailChanges = text => {
    this.props.onEmailChange(text);
  };
  onPasswordChanges = password => {
    this.props.onPasswordChange(password);
  };
  onButtonPresss = () => {
    const { email, password } = this.props;
    this.props.onButtonPress({ email, password });
  };
  loadingorbutton = () => {
    if (this.props.loading) {
      return (
        <View
          style={
            ([styles.ButtonContainerstyle],
            { marginTop: upadding, alignSelf: 'center' })
          }
        >
          <ActivityIndicator size='large' color='black' />
        </View>
      );
    }
    return (
      <Button
        buttonLabel={'Login'}
        onPressaction={this.onButtonPresss}
        style={{ marginTop: upadding }}
      />
    );
  };
  onSignuppress = () => {
    this.props.navigation.navigate('signup');
  };
  render() {
    return (
      <LinearGradient
        colors={['#ADD8E6', '#add8e6E6', '#add8e6CC']}
        style={styles.linearGradient}
      >
        <View style={styles.insideContainer}>
          <LinearGradient
            colors={['#ADD8E6', '#add8e6E6', '#add8e6CC']}
            style={{ alignItems: 'center', justifyContent: 'center', flex: 4 }}
          >
            <Text style={styles.titleStyle}>{'Task'}</Text>
          </LinearGradient>
          <View style={{ padding: upadding, flex: 6 }}>
            <View style={{ alignSelf: 'flex-end', marginBottom: upadding }}>
              <Text style={styles.textStyle}>{'Forgot Password?'}</Text>
            </View>
            {this.props.errors.length>0 ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: upadding/2,
                paddingBottom: upadding/2,
              }}
            >
              <Text style={{ color: 'red', fontSize:upadding * 1.5, fontFamily:'cursive' }}>{this.props.errors}</Text>
            </View>
          ) : (
            <View />
          )}
            <View style={styles.Individualcontainerstyle}>
              <Textinput
                placeholder={'E-mail'}
                error={''}
                value={this.props.email}
                onChange={this.onEmailChanges}
              />
            </View>
            <View style={styles.Individualcontainerstyle}>
              <Textinput
                placeholder={'Password'}
                value={this.props.password}
                error={''}
                onChange={this.onPasswordChanges}
                secureTextEntry={true}
              />
            </View>
            <View>{this.loadingorbutton()}</View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: upadding * 2,
                alignItems: 'center'
              }}
            >
              <View
                style={{ flex: 2, height: 0, color: 'black', borderWidth: 0.5 }}
              />
              <View
                style={{
                  flex: 4,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Text style={{ fontSize: upadding * 1.5, color: 'black', fontFamily:'cursive',  }}>
                  {'unregistered user ?'}
                </Text>
              </View>
              <View
                style={{ flex: 2, height: 0, color: 'black', borderWidth: 0.5 }}
              />
            </View>
            <View>
              <Button
                buttonLabel={'Signup'}
                style={{ marginTop: upadding }}
                onPressaction={this.onSignuppress}
              />
            </View>
          </View>
        </View>
      </LinearGradient>
    );
  }
}

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    login: state.auth.login,
    errors: state.auth.errors,
    userid: state.auth.id,
    loading: state.auth.loginloading
  };
};
export default connect(mapStateToProps, {
  onEmailChange,
  cleareverything,
  onPasswordChange,
  onButtonPress,
  Clearall,
  worklistfetch
})(Login);

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  insideContainer: {
    flexDirection: 'column',

    height: SCREEN_HEIGHT * 0.85,
    width: SCREEN_WIDTH * 0.9,
    borderRadius: upadding,
    backgroundColor: 'white',
    elevation: 5,
    marginTop: upadding * 2
  },
  textStyle: {
    color: 'black',
    fontFamily:'cursive',
    fontSize: upadding * 1.6
  },
  Individualcontainerstyle: {
    marginBottom: upadding
  },
  titleStyle: {
    fontSize: upadding * 3,
    fontWeight: 'bold',
    color: 'black',
    fontFamily:'cursive',
    marginBottom: upadding
  },
  inputStyle: {
    marginTop: upadding,
    height: upadding * 1.5,
    borderBottomColor: '#4B0082',
    borderRadius: upadding / 2,
    borderBottomWidth: upadding * 0.3,
    backgroundColor: 'white'
  },
  Viewstyle: {
    marginBottom: upadding / 4
  },
  Buttonstyle: {
    padding: upadding / 4
  }
});
