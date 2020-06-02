import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { createDatabase } from '../../database/createtable';
import Updatingdatabase from './updatingdatabase';
import { giveAllWork } from '../../database/select';
import GeneralModal from '../createtask/components/generalmodalcomponent';

class Settingupdatabase extends Component {

    constructor(props) {
        super(props);
        console.log('setting up database');
        signup = this.props.navigation.getParam('signup', false);
        this.state = {
            message: 'Setting up database',
            set_database: false,
            updating_database: false,
            notificationmodal: 0,
            signup
        };
    }

    actionwhensetdatabasecom = async () => {
        if (!this.state.signup) {
            this.setState({ message: 'Updating database with the previous progress', notificationmodal: 1 });
        }
        else {
            await AsyncStorage.setItem('userToken', this.props.userid);
            //this.props.Give_all_work();
            this.props.navigation.navigate('App');
        }
    }

    componentDidMount() {
        console.log('database ', this.props.work, this.state.signup);
        this.props.createDatabase(this.props.work, this.actionwhensetdatabasecom, this.state.signup);
    }

    cancelFunction = (value) => {
        this.setState({ notificationmodal: value });
        this.updatingdatabase();
    }

    afterdatabaseupdatedcom = async () => {
        await AsyncStorage.setItem('userToken', this.props.userid);
        this.props.giveAllWork();
        this.props.navigation.navigate('App');
    }

    updatingdatabase = () => {
        Updatingdatabase(this.props.userid, this.afterdatabaseupdatedcom);
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
    console.log(state);
    return {
        userid: state.user._id,
        work: state.user.work
    };
};

export default connect(
    mapStateToProps,
    { createDatabase, giveAllWork}
)(Settingupdatabase);
