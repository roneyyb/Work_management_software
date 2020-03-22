import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import  AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { createDatabase } from '../../database/createtable';
import Updatingdatabase from './updatingdatabase';
import { Give_all_work, Give_all_task } from '../../database/select';
import GeneralModal from '../createtask/components/generalmodalcomponent';

class Settingupdatabase extends Component {

    constructor(props) {
        super(props);
        this.state={message:'Setting up database', set_database: false, updating_database:false, notificationmodal:0};
    }

    actionwhensetdatabasecom = async () => {
      if(!this.props.signup)
      {
      this.setState({message:'Updating database with the previous progress',notificationmodal:1});
      }
      else
      {
        await AsyncStorage.setItem('userToken', this.props.userid);
        this.props.Give_all_work();
        this.props.navigation.navigate('App');
      }
    }
    componentDidMount() {
      this.props.createDatabase(this.props.work,this.actionwhensetdatabasecom,this.props.signup);
    }
    cancelFunction = (value) => {
      this.setState({notificationmodal:value});
      this.updatingdatabase();
    }

    afterdatabaseupdatedcom = async () => {
      await AsyncStorage.setItem('userToken', this.props.userid);
      this.props.Give_all_work();
      this.props.navigation.navigate('App');
    }

    updatingdatabase = () => {
      Updatingdatabase(this.props.userid,this.afterdatabaseupdatedcom);
    }

    
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{this.state.message}</Text>
        <ActivityIndicator size='large' color='black' />
        <GeneralModal
        title={'Set notification'}
        message={'Do you want to set previous deadline and reminder for all task and work'}
        Rightbuttontitle={'No'}
        Leftbuttontitle={'Yes'}
        cancelFunction={this.cancelFunction}
        actiononbuttonpress={this.updatingdatabase}
        visibleornot={this.state.notificationmodal}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  var userid = '';
  var signup = '';
  var work = '';
  if (state.signup.signup) {
    userid = state.signup.id;
    signup = true;
    work=state.signup.defaultwork;
    } else {
    userid = state.auth.id;
    signup = false;
    work=state.auth.defaultwork;
  }
  return {
    signup,
    userid,
    work
  };
};

export default connect(
  mapStateToProps,
  { createDatabase, Give_all_work, Give_all_task }
)(Settingupdatabase);
