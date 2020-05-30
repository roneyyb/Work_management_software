import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableHighlight,
  Dimensions
} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const paddingE = Math.round(SCREEN_WIDTH * 0.05);
const fontSizeE = Math.round(SCREEN_WIDTH * 0.035);

LocaleConfig.locales['fr'] = {
    monthNames: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    monthNamesShort: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'June',
      'July',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec'
    ],
    dayNames: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ],
    dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  };
  LocaleConfig.defaultLocale = 'fr';
  
export default class Deadlinescreen extends Component {
  constructor(props) {
    super(props);
    var d= new Date;
    d.setHours(0);
    d.setMinutes(0);
    d.setHours(0);
    d.setMilliseconds(0);
    this.daytimestamp = d.getTime();
    this.timeofday = 0;
    const todaydate = new Date();
    const day = todaydate.getDate();
    const year = todaydate.getFullYear();
    const month = todaydate.getMonth();
    var months = month+1;
    if(month<10) {
      months = '0' + months;
    }
    this.state = {selecteddate: day<10?`${year}-${months}-0${day}`:`${year}-${months}-${day}`, deadline: 'Select Deadline Time'};
  }
  onDayPress = (value) => {
    this.daytimestamp = value.timestamp;
    this.setState({selecteddate: value.dateString });
  }  

  setDeadline = (value) => {
    if(value[0]!=="Dismissed") {
    this.setState({deadline: value[0]});
    this.timeofday = value.slice(1,3);
  }
}

  onSaveDeadline = (day, time) => {
    if(time === 0)
    {
      this.props.setNotification(day, this.state.selecteddate, this.state.deadline);
    }
    else 
    {
      const times = this.props.convertToMiliseconds(time[0], time[1]);
      this.props.setNotification(day+times, this.state.selecteddate, this.state.deadline);
    }
  }

  render() {
        return (
            <View >
                 <Calendar
              onDayPress={this.onDayPress}
              current={this.state.selecteddate}
              style={{marginTop:paddingE}}
              hideExtraDays
              theme={{
                textDayFontWeight: 'normal',
                textMonthFontWeight: '600',
                textDayHeaderFontWeight: '300',
                textDayFontSize: 13,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 13,
                selectedDayBackgroundColor: '#2B65EC',
                todayTextColor: '#2B65EC'
              }}
              renderArrow={direction => {
                if (direction === 'right') {
                  return (
                    <MaterialIcons
                      name='navigate-next'
                      size={25}
                      width={5}
                      color='black'
                     />
                  );
                } 
                  return (
                    <MaterialIcons
                      name='navigate-before'
                      size={25}
                      width={5}
                      color='black'
                    />
                  );
              }}
              markedDates={{
                [this.state.selecteddate]: {
                  customStyles: {
                    container: {
                      height: 20,
                      width: 20,
                      backgroundColor: 'green'
                    }
                  },
                  selected: true,
                  disableTouchEvent: true,
                  selectedDotColor: 'orange'
                }
              }}
            />
            <TouchableHighlight
              onPress={
                async () => {
                await this.props.setOpacity(0,true);
              }
              }
              underlayColor={'#8D8D8C0F'}
              style={styles.touchablehighlightstyle}
            >
              <View style={{flex:1,flexDirection: 'row', alignItems:'center', height: paddingE * 1.5}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'

                  }}
                >
                  <MaterialIcons
                    name='access-time'
                    size={fontSizeE * 1.5}
                    color='grey'
                  />
                </View>
                <View
                  style={{
                    height: paddingE * 1.5,
                    marginRight: paddingE * 0.4,
                    flex: 3,
                    paddingLeft: paddingE * 0.8,
                    backgroundColor: '#2B65EC0F',
                    borderRadius: 3,
                    justifyContent: 'center'
                  }}
                >
                  <Text style={{ color: '#8D8D8C', fontSize: fontSizeE, fontWeight:'bold' }}>
                    {this.state.deadline}
                  </Text>
                </View>
              </View>
            </TouchableHighlight>
            <View style={styles.buttonContainer}>
              <TouchableHighlight
              onPress={() => {
                  this.props.onDate(false);
              }}
                style={styles.buttonStyle}
                underlayColor={'#2B65EC33'}
              >
                <Text style={styles.buttontext}>{'Cancel '}</Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={()=> { this.onSaveDeadline(this.daytimestamp, this.timeofday);}}
                style={styles.buttonStyle}
                underlayColor={'#2B65EC33'}
              >
                <Text style={styles.buttontext}>{'Save'}</Text>
              </TouchableHighlight>
            </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
    touchablehighlightstyle: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop:paddingE * 0.6,
      height: paddingE*2,
      borderRadius: 3
    },
    buttonStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      padding:paddingE * 0.4,
      height: paddingE*1.5,
      borderRadius: 3 
    },
    buttonContainer: {
      justifyContent: 'flex-end',
      flexDirection: 'row',
      marginTop: paddingE * 0.6,
      marginRight:0,
      marginBottom:paddingE,
      fontWeight:'bold'
    },
    buttontext: {
      color: '#2B65EC',
      fontWeight:'600',
      fontSize: fontSizeE*1.1
    }
  });
  