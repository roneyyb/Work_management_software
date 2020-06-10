import React, {Component} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import PushNotification from 'react-native-push-notification';
import {day} from '../../../constants/Calender';
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
const paddingE = Math.round(SCREEN_WIDTH * 0.05);
const MODAL_MARGIN_HORIZONTAL = Math.round(SCREEN_WIDTH * 0.06);
import Deadline from '../../ReminderModal/deadlinescreen';

export default class Datetimemodal extends Component {
    constructor(props) {
        super(props);
        this.configure();
    }

    state = { Modalscreen: 0, show: false };

    setModalscreen = value => {
        this.setState({ Modalscreen: value });
    };

    convertToMiliseconds = (hour, minutes) => {
        return (hour * 60 + minutes) * 60 * 1000;
    };

    configure() {
        PushNotification.configure({
            onRegister: token => {
                console.log('token', token);
            },
            onNotification: () => {
                console.log('notifiction set');
            },
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },

            popInitialNotification: false,

            requestPermissions: true,
        });
    }

    openAndroidTimePicker = async () => {
        console.log('android time picker');
        const todaydate = new Date();
        try {
            const { action, hour, minute } = await TimePickerAndroid.open({
                hour: todaydate.getHours(),
                minute: todaydate.getMinutes(),
                is24Hour: false,
            });
            var newformat = hour >= 12 ? 'PM' : 'AM';
            var hours = hour % 12;
            hours = hours ? hours : 12;
            console.log('action datemodal', action);
            if (action !== TimePickerAndroid.dismissedAction) {
                console.log('Not dismissed');
                this.setOpacity(1);
                if (hours < 10 && minute < 10)
                    return [`0${hours}:0${minute} ${newformat}`, hour, minute];
                else if (hours < 10 && minute > 10)
                    return [`0${hours}:${minute} ${newformat}`, hour, minute];
                else if (hours > 10 && minute < 10)
                    return [`${hours}:0${minute} ${newformat}`, hour, minute];
                else return [`${hours}:${minute} ${newformat}`, hour, minute];
            } else {
                console.log('Time Picker Dismissed');
                this.setOpacity(1);
                return ['Dismissed'];
            }
        } catch ({ code, message }) {
            console.log('Cannot open time picker', message);
        }
    };

    setNotification = (time, date, times) => {
        var d = new Date();
        const id = '' + time;
        var newid = '';
        if (id.length > 10) {
            newid = id.slice(0, 10);
        } else {
            newid = id;
        }

        console.log('Push notification time',time);
        if (time > d.getTime()) {
            PushNotification.localNotificationSchedule({
                title: this.props.title,
                id: newid,
                message: this.props.description,
                date: new Date(time),
                playSound: true,
                vibrate: true,
            });
            this.props.onChangeDeadline(date, times, false, newid);
        } else {
            this.props.onChangeDeadline(date, times, false, -1);
        }
    };

    Returnscreen = () => {
        if (this.state.Modalscreen === 0) {
            return (
                <Deadline
                    ref={child => {
                        this.returnscreen = child;
                    }}
                    onDate={this.props.onDate}
                    onChangeDeadline={this.props.onChagneDeadline}
                    setModalscreen={this.setModalscreen}
                    setOpacity={this.setOpacity}
                    setNotification={this.setNotification}
                    openAndroidTimePicker={this.openAndroidTimePicker}
                    convertToMiliseconds={this.convertToMiliseconds}
                />
            );
        }
    };

    setOpacity = (value, show) => {
        this.ref_view.setNativeProps({ opacity: value });
        this.setState({ show });
    };

    onChange = (event, date) => {
        if (date == null) {
            console.log('Dismissed');
            this.setOpacity(1);
            this.returnscreen.setDeadline(['Dismissed']);
        } else {
            let minute = date.getMinutes();
            let hour = date.getHours();
            var newformat = hour >= 12 ? 'PM' : 'AM';
            var hours = hour % 12;
            hours = hours ? hours : 12;
            this.setOpacity(1);
            if (hours < 10 && minute < 10)
                this.returnscreen.setDeadline([
                    `0${hours}:0${minute} ${newformat}`,
                    hour,
                    minute,
                ]);
            else if (hours < 10 && minute > 10)
                this.returnscreen.setDeadline([
                    `0${hours}:${minute} ${newformat}`,
                    hour,
                    minute,
                ]);
            else if (hours > 10 && minute < 10)
                this.returnscreen.setDeadline([
                    `${hours}:0${minute} ${newformat}`,
                    hour,
                    minute,
                ]);
            else
                this.returnscreen.setDeadline([
                    `${hours}:${minute} ${newformat}`,
                    hour,
                    minute,
                ]);
        }
    };

    render() {
        return (
            <View
                ref={child => {
                    this.ref_view = child;
                }}
                style={styles.modalContainer}>
                {this.Returnscreen()}
                {this.state.show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        timeZoneOffsetInMinutes={0}
                        value={new Date()}
                        mode={'time'}
                        is24Hour={true}
                        display="default"
                        onChange={this.onChange}
                    />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'white',
        paddingRight: paddingE,
        paddingLeft: paddingE,
        flexDirection: 'column',
        borderRadius: paddingE * 0.3,
        marginRight: MODAL_MARGIN_HORIZONTAL,
        marginLeft: MODAL_MARGIN_HORIZONTAL,
    },
});
