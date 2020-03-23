import React from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  Dimensions,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Textinput from './components/textinput';
import Button from './components/button';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const upadding = Math.round(SCREEN_WIDTH * 0.03);

import {
  onChangeusername,
  onChangeconfirmpassword,
  onChangeemail,
  onChangepassword,
  onSignup,
  Clearall
} from '../../actions/signupactions';

class SignUp extends React.Component {
  static navigationOptions = () => ({
    headerTitle: () => {
      <Text
        style={{
          fontSize: 25,
          fontWeight: '400',
          color: 'black',
          paddingLeft: Math.round(Dimensions.get('window').width) / 2 - 120
        }}
      >
        {'Signup'}
      </Text>
    },
    headerStyle: {
      backgroundColor: 'white',
      borderBottomColor: '#202020'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: '200'
    }
  });
  constructor(props) {
    super(props);
    this.props.Clearall();
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.signup) {
      this.props.navigation.navigate('settingupdatabase');
      return false;
    }
    return true;
  }

  onChangeemails(email) {
    this.props.onChangeemail(email);
  }
  onChangepasswords(password) {
    this.props.onChangepassword(password,this.props.confirmpassword,this.props.error4);
  }
  onChangeconfirmpasswords(confirmpassword) {
    this.props.onChangeconfirmpassword({
      password: this.props.password,
      confirmpassword,
      error3: this.props.error3
    });
  }
  onChangeusernames(username) {
    this.props.onChangeusername(username);
  }

  onSignups() {
    const user = {
      email: this.props.email,
      password: this.props.password,
      username: this.props.username,
      confirmpassword: this.props.confirmpassword,
      error1: this.props.error1,
      error2: this.props.error2,
      error3: this.props.error3,
      error4: this.props.error4
    };
    this.props.onSignup(user);
  }

  iferror(error) {
    if (error.length > 0) {
      return 'red';
    }
    return 'white';
  }

  loadingorbutton() {
    if (this.props.loading) {
      return (
        <View style={styles.ButtonContainerstyle}>
          <ActivityIndicator size='large' color='black' />
        </View>
      );
    }
    return (
      <Button
        buttonLabel={'Signup'}
        style={{ marginTop: upadding }}
        onPressaction={this.onSignups.bind(this)}
      />
    );
  }
  render() {
    return (
      <LinearGradient
        colors={['#ADD8E6', '#add8e6E6', '#add8e6CC']}
        style={styles.linearGradient}
      >
        <KeyboardAvoidingView behavior='padding'>
          <View style={styles.insideContainer}>
          
          <LinearGradient
            colors={['#ADD8E6', '#add8e6E6', '#add8e6CC']}
            style={{ alignItems: 'center', justifyContent: 'center', flex: 4 }}
          >
            <Text style={styles.titleStyle}>{'Task'}</Text>
          </LinearGradient>
            <View style={{ padding: upadding, flex: 6 }}>
            {this.props.error
             ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: upadding/2,
                paddingBottom:upadding/2
              }}
            >
        <Text style={{ color: 'red' , fontSize:upadding * 1.8, fontWeight:'400', fontFamily:'cursive'}}>{this.props.error5}</Text>
            </View>
          ) : (
            <View />
          )}
              <View style={styles.Individualcontainerstyle}>
                <Textinput
                  placeholder={'username'}
                  error={this.props.error1}
                  value={this.props.username}
                  onChange={this.onChangeusernames.bind(this)}
                  autocorrect={false}
                />
              </View>
              <View style={styles.Individualcontainerstyle}>
                <Textinput
                  onChange={this.onChangeemails.bind(this)}
                  placeholder='Email'
                  error={this.props.error2}
                  autocorrect={false}
                  value={this.props.email}
                />
              </View>
              <View style={styles.Individualcontainerstyle}>
                <Textinput
                  onChange={this.onChangepasswords.bind(this)}
                  error={this.props.error3}
                  placeholder='password'
                  secureTextEntry={true}
                  autocorrect={false}
                  value={this.props.password}
                />
              </View>
              <View style={styles.Individualcontainerstyle}>
                <Textinput
                  onChange={this.onChangeconfirmpasswords.bind(this)}
                  error={this.props.error4}
                  secureTextEntry={true}
                  autocorrect={false}
                  placeholder='confirmpassword'
                  value={this.props.confirmpassword}
                />
              </View>
              <View>{this.loadingorbutton()}</View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    );
  }
}
const mapStateToProps = state => {
  return {
    email: state.signup.email,
    password: state.signup.password,
    username: state.signup.username,
    confirmpassword: state.signup.confirmpassword,
    error: state.signup.error,
    error1: state.signup.error1,
    error2: state.signup.error2,
    error3: state.signup.error3,
    error4: state.signup.error4,
    error5: state.signup.error5,
    signup: state.signup.signup,
    loading: state.signup.signuploading,
    userid: state.signup.id
  };
};

export default connect(mapStateToProps, {
  onChangeconfirmpassword,
  onChangeemail,
  onChangepassword,
  onChangeusername,
  onSignup,
  Clearall
  //worklistfetch
})(SignUp);

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: upadding * 3,
    fontWeight: 'bold',
    fontFamily:'cursive',
    color: 'black',
    marginBottom: upadding
  },
  linearGradient: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  Individualcontainerstyle: {
    marginBottom: upadding
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
    color: '#4B0082',
    fontSize: upadding * 1.5
  },
  titleStyle: {
    fontSize: upadding * 3,
    fontWeight: '600',
    fontFamily:'cursive',
    color: 'black',
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
    marginBottom: 3
  },
  Buttonstyle: {
    padding: 3
  }
});
