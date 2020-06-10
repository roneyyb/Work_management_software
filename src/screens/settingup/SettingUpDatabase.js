import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import { createDatabase } from '../../database/createTable';
import { updatingDatabase } from './UpdatingDatabase';
import { giveAllWork, giveAllTask } from '../../database/giveAllItem';
import GeneralModal from '../task/components/generalmodalcomponent';

class Settingupdatabase extends Component {

    constructor(props) {
        super(props);
        console.log('setting up database');
        const signup = this.props.navigation.getParam('signup', false);
        console.log(signup);
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
            await AsyncStorage.setItem('userToken', this.props.user._id);
            this.props.Give_all_work();
            this.props.navigation.navigate('App');
        }
    }

    componentDidMount() {
       this.props.createDatabase(this.props.user.work, this.actionwhensetdatabasecom, this.state.signup);
    }

    cancelFunction = (value) => {
        this.setState({ notificationmodal: value });
        this.updatingdatabase();
    }

    afterdatabaseupdatedcom = async () => {
        console.log("database update completed");
        const { user } = this.props;
        await AsyncStorage.setItem('userToken', user._id);
        this.props.giveAllWork();
        this.props.giveAllTask(user.work.workid);
        setTimeout(() => { this.props.navigation.navigate('App') }, 1000);
    }

    updatingdatabase = () => {
        updatingDatabase(this.props.user._id, this.afterdatabaseupdatedcom);
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
    return {
        user: state.user.user
    };
};

export default connect(
    mapStateToProps,
    { createDatabase, giveAllWork, giveAllTask}
)(Settingupdatabase);
