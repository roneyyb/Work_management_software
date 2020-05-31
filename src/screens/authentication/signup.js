import React from 'react';
import {Dimensions, Platform, StyleSheet, Text, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import server from '../../constants/Server';
import axios from 'axios';
import Header from './components/Header';
import AwesomeAlert from 'react-native-awesome-alerts';
import BasicInfo from './BasicInfo';
import uuidv1 from 'uuid/v1';
import AppConstant from '../../constants/AppConstant';
import {connect} from 'react-redux';
import {setupUserOnStart} from '../../actions/UserActions';
let deviceWidth = Dimensions.get('window').width;

class Signup extends React.Component {
  static navigationOptions = {headerShown: false};

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      alertVisible: false,
      alertText: '',
    };

    // this.onChangeField = this.onChangeField.bind(this);
    this.showAlert = this.showAlert.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  showAlert(message) {
    this.setState({
      alertText: message,
      alertVisible: true,
    });
  }

  handleAlertConfirm() {
    this.setState({
      alertVisible: false,
      alertText: '',
    });
  }

  handleError(error) {
    function isNetworkError(err) {
      return !!err.isAxiosError && !err.response;
    }

    let message;
    if (isNetworkError(error)) {
      message = 'Network Error';
    } else {
      let responseJson = error.response.data;
      message = responseJson.error;
    }
    this.setState({isLoading: false});
    this.showAlert(message);
  }

  onSubmit = data => {
    console.log(data, `${server}/signup`);
    this.setState({isLoading: true});
    const uuid = uuidv1();
    let config = {
      headers: {
        defaultworkid: uuid,
        date: '',
      },
    };
    axios
      .post(`${server}/signup`, data, config)
      .then(response => {
        const {navigation, setupUserOnStart} = this.props;
        let responseJson = response.data;
        this.setState({isLoading: false});
        setupUserOnStart(responseJson);
        navigation.navigate('settingupdatabase', {signup: true});
      })
      .catch(error => {
        console.log('error =>', error);
        this.handleError(error);
      });
  };

  render() {
    const {navigation} = this.props;

    return (
      <Header type={'login'} navigation={navigation}>
        <Spinner visible={this.state.isLoading} />
        <View style={{paddingHorizontal: 30, marginVertical: 10}}>
          <Text style={styles.headingWhiteBox}>Create your account</Text>
        </View>
        <View style={{paddingHorizontal: 30, flex: 1}}>
          <BasicInfo
            render={true}
            updateState={this.onChangeField}
            navigation={this.props.navigation}
            showAlert={this.showAlert}
            onSubmit={this.onSubmit}
          />
        </View>
        <AwesomeAlert
          show={this.state.alertVisible}
          showProgress={false}
          title={'Error'}
          message={this.state.alertText}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="OK"
          cancelText={null}
          confirmButtonColor={AppConstant.appColor}
          overlayStyle={{
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}
          onConfirmPressed={() => {
            this.handleAlertConfirm();
          }}
        />
      </Header>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  {setupUserOnStart},
)(Signup);

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 20,
  },
  whiteContainer: {
    flex: 1,
    paddingHorizontal: '10%',
  },
  heading: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headingWhiteBox: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'black',
  },
  button: {
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 25,
    padding: 14,
    backgroundColor: AppConstant.appColor,
    marginBottom: 5,
  },
  halfButton: {
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 25,
    padding: 14,
    backgroundColor: AppConstant.appColor,
    marginBottom: 5,
    flex: 1,
  },
  formInputContainer: {
    flexDirection: 'row',
    height: 45,
    backgroundColor: '#FFF',
    borderRadius: 0,
    marginTop: 12,
    borderBottomWidth: 1,
    borderColor: '#B0B0B0',
  },
  textInput: {
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 10,
    fontSize: 16,
    height: 45,
    color: 'black',
  },
  picker: {
    height: 45,
    // marginLeft: 10,
    backgroundColor: 'transparent',
    color: '#B0B0B0',
    fontSize: 16,
  },
  datePicker: {
    height: 45,
    padding: 0,
    paddingTop: 2,
    width: deviceWidth - 100,
  },
  dateInput: {
    marginLeft: 0,
    height: 40,
    borderWidth: 0,
    paddingHorizontal: 3,
  },
  placeholderText: {
    textAlign: 'left',
    width: '100%',
    marginLeft: 10,
    fontSize: 16,
    color: '#B0B0B0',
  },
  dateText: {
    textAlign: 'left',
    width: '100%',
    marginLeft: 10,
    fontSize: 16,
  },

  pageIndicator: {
    borderRadius: 8,
    height: 16,
    width: 16,
  },
  newsInterestContainer: {
    paddingTop: 20,
  },
  saveButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppConstant.appColor,
    borderRadius: 20,
    marginHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 20,
  },
});
