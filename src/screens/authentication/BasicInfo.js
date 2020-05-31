import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import WrappedTextInput from './components/WrappedTextInput';
import AppConstant from '../../constants/AppConstant';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class BasicInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorAvail: '#FF0000',
      userName: '',
      email: '',
      password: '',
      confirmpassword: '',
      userNameError: undefined,
      emailError: undefined,
      passwordError: undefined,
      confirmpasswordError: undefined,
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  performDataValidation() {
    const {state} = this;
    const alert = this.props.showAlert;

    if (state.userName.trim().length === 0) {
      alert('Username should be atleast 3 characters long.');
      return;
    } else if (state.userName.trim().length <= 2) {
      alert('Username should be atleast 3 characters long.');
      return;
    } else if (state.email.trim().length === 0) {
      alert('Please enter your email.');
      return;
    } else if (!state.email.includes('@')) {
      alert('Please enter valid email');
      return;
    } else if (state.password.trim().length === 0) {
      alert('Please enter your password.');
      return;
    } else if (typeof state.passwordError === 'string') {
      alert('Please enter password according to requirement.');
      return;
    } else if (state.confirmpassword.trim().length === 0) {
      alert('Please enter password again.');
      return;
    } else if (typeof confirmpasswordError === 'string') {
      alert('Password does not match.');
      return;
    }

    console.log('Seems Correct');
    return true;
  }

  onSubmit() {
    console.log(this.props.state);
    console.log(this.state);
    const correct = this.performDataValidation();
    if (correct) {
      let data = {
        username: this.state.userName,
        email: this.state.email,
        password: this.state.password,
      };
      this.props.onSubmit(data);
    }
  }

  checkUserName(userName) {
    userName = this.state.userName;
    if (userName.length <= 2) {
      this.setState({
        userNameError: 'Username should be atleast 3 characters long.',
      });
    } else {
      this.setState({userNameError: false});
    }
  }

  checkEmail() {
    const email = this.state.email.trim();
    if (!email.includes('@')) {
      this.setState({emailError: 'Please enter valid email.'});
    } else {
      this.setState({emailError: false});
    }
  }

  checkPassword() {
    const {password} = this.state;
    var pass = password.split('');
    var flag1 = 0;
    var flag2 = 0;
    var flag3 = 0;
    pass.forEach(element => {
      if (/^[A-Z]{1}$/.test(element)) {
        flag1 = 1;
      }

      if (/^[a-z]{1}$/.test(element)) {
        flag2 = 1;
      }

      if (/^[0-9]{1}$/.test(element)) {
        flag3 = 1;
      }
    });

    if (!(flag1 == 1 && flag2 == 1 && flag3 == 1)) {
      this.setState({
        passwordError:
          'Should contain atleast one capital, one small letter and one digit',
      });
    } else {
      this.setState({passwordError: false});
    }
  }

  checkconfirmPassword() {
    const {password, confirmpassword} = this.state;
    if (password !== confirmpassword) {
      this.setState({confirmpasswordError: 'Password does not match.'});
    } else {
      this.setState({confirmpasswordError: false});
    }
  }

  render() {
    const textInputProps = {
      placeholderTextColor: '#777',
      selectionColor: AppConstant.appColor,
      autoCorrect: false,
      keyboardType: 'default',
      returnKeyType: 'done',
      maxLength: 50,
    };

    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <KeyboardAwareScrollView style={{flex: 1}}>
          <View>
            <WrappedTextInput
              {...textInputProps}
              placeholder="Username"
              onBlur={this.checkUserName.bind(this)}
              onChangeText={userName => {
                this.setState({userName, userNameError: false});
              }}
              value={this.state.userName}
              error={this.state.userNameError}
              loading={this.state.checkLoader}
            />
          </View>
          <View>
            <WrappedTextInput
              {...textInputProps}
              placeholder="Email"
              onBlur={this.checkEmail.bind(this)}
              onChangeText={email => {
                this.setState({email, emailError: false});
              }}
              value={this.state.email}
              error={this.state.emailError}
            />
          </View>
          <View>
            <WrappedTextInput
              {...textInputProps}
              placeholder="Password"
              onBlur={this.checkPassword.bind(this)}
              onChangeText={password => {
                this.setState({password, passwordError: false});
              }}
              secureTextEntry={true}
              value={this.state.password}
              error={this.state.passwordError}
            />
          </View>
          <View>
            <WrappedTextInput
              {...textInputProps}
              placeholder="confirm-password"
              onBlur={this.checkconfirmPassword.bind(this)}
              onChangeText={confirmpassword => {
                this.setState({confirmpassword, confirmpasswordError: false});
              }}
              secureTextEntry={true}
              value={this.state.confirmpassword}
              error={this.state.confirmpasswordError}
            />
          </View>
          <View style={{alignItems: 'flex-end', marginBottom: 5}}>
            <TouchableOpacity
              style={{
                elevation: 2,
                height: 30,
                width: 120,
                borderRadius: 15,
                backgroundColor: AppConstant.appColor,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={this.onSubmit}>
              <Text
                style={{
                  color: '#ffffff',
                  fontSize: 20,
                  fontWeight: 'bold',
                  fontFamily: 'cursive',
                }}>
                {'Submit '}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

BasicInfo.propTypes = {};

export default BasicInfo;
