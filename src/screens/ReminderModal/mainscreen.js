import React, { Component } from 'react';
import {
  View,
  Text,
  Picker,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import PushNotification from 'react-native-push-notification';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Monthview from './monthview';
import Weekview from './weekview';
import Dayview from './dayView';
import Alldayview from './alldayview';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const paddingE = Math.round(SCREEN_WIDTH * 0.05);
const fontSizeE = Math.round(SCREEN_WIDTH * 0.035);
const MODAL_MARGIN_VERTICAL = Math.round(SCREEN_HEIGHT * 0.25);
const MODAL_MARGIN_HORIZONTAL = Math.round(SCREEN_WIDTH * 0.06);


export default class reminderModal extends Component {
  state = { setReminder: 'minute', every: '' };

  componentDidMount() {
    this._input.focus();
  }
  onEveryChanges = text => {
    this.setState({ every: text });
  };

  returnSelectedDayReminder = () => {
    if(this.state.setReminder==='minute')
    {
      return <View/>;
    }
    else if(this.state.setReminder==='hour')
    {
      return <Dayview title={'Set Minutes'}/>;
    }
    else if(this.state.setReminder ==='day')
    {
      return <Dayview title={'Set Time'}/>
    }
    else if(this.state.setReminder==='year')
    {
      return <View />;
    }
    else if(this.state.setReminder ==='month')
    {
      return <Monthview setModalscreen={this.props.setModalscreen}/>;
    }
    else if(this.state.setReminder === 'week')
    {
      return <Weekview />;
    }
    
  }

  render() {
    return (
      <View>
        <View style={styles.staticContainerStyle}>
          <Text style={{color:'black', fontSize: fontSizeE * 1.1}}>{'Every'}</Text>
          <TextInput
            style={styles.textInputstyle}
            textAlign={'center'} 
            value={this.props.every}
            onChangeText={text => {
              this.onEveryChanges(text);
            }}
            autoCorrect={false}
            ref={c => {
              this._input = c;
            }}
            keyboardType={'number-pad'}
            placeholderTextColor='#8D8D8C'
          />
          <Picker
            selectedValue={this.state.setReminder}
            style={styles.pickerStyle}
            itemStyle={{ color: '#8D8D8C' }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ setReminder: itemValue })
            }
          >
            <Picker.Item label='minute' value='minute' />
            <Picker.Item label='hour' value='hour' />
            <Picker.Item label='day' value='day' />
            <Picker.Item label='week' value='week' />
            <Picker.Item label='month' value='month' />
            <Picker.Item label='year' value='year' />
          </Picker>
        </View>
        {this.returnSelectedDayReminder()}
        <View style={{ marginTop: paddingE * 0.4 }}>
          <Text style={styles.textStyles}>{'First Notification'}</Text>
        </View>

          <TouchableHighlight
            onPress={() => {
              this.props.setReminderModalOpacity(0);
              this.props.openAndroidTimePicker()}
            }
            underlayColor={'#8D8D8C0F'}
            style={{
              height: paddingE * 2,
              marginTop: paddingE * 0.6,
              justifyContent:'center',
              borderRadius: paddingE * 0.1
            }}

          >
            <View style={{flexDirection: 'row', alignItems:'center'}}>
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
                  alignSelf: 'stretch',
                  flex: 3,
                  paddingLeft: paddingE * 0.8,
                  backgroundColor: '#2B65EC0F',
                  borderRadius: 3,
                  justifyContent: 'center'
                }}
              >
                <Text style={{ color: 'black', fontSize: fontSizeE * 0.9, fontWeight:'400' }}>
                  {'Thu, Dec 10, 8:56 AM'}
                </Text>
              </View>
              </View>
          </TouchableHighlight>

        <View style={styles.buttonContainer}>
          <TouchableHighlight
            onPress={() => {
              console.log('cancel pressed');
              this._input.blur();  this.props.setOpacity(1);
              this.props.visibleReminderModal(0);}}
            style={styles.touchablehighlightstyle}
            underlayColor={'#2B65EC33'}
          >
            <Text style={styles.buttontext}>{'Cancel'}</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {

              console.log('saved pressed');
              this._input.blur();
              this.props.setOpacity(1);
              this.props.visibleReminderModal(0);
              
            }}
            style={styles.touchablehighlightstyle}
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
  staticContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: paddingE,
    paddingBottom: paddingE * 0.4
    //paddingBottom: paddingE
  },
  staticContainer1Style: {
    flex: 1,
    flexDirection: 'row'
  },
  textStyles: {
    fontSize: fontSizeE*0.8,
    color: '#8D8D8C',
    fontWeight:'500'
  },
  textInputstyle: {
    marginLeft: paddingE * 0.5,
    height: paddingE * 1.3,
    width: paddingE * 1.5,
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 2,
    backgroundColor: '#2B65EC0F'
  },
  pickerStyle: {
    height: paddingE * 1.3,
    width: paddingE * 6,
    marginLeft:paddingE * 0.8,
    color: 'black',
    fontSize:20,
    //backgroundColor:'#2B65EC0F',
    fontWeight:'400'
  },
  touchablehighlightstyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: paddingE*1.2,
    borderRadius: 3,
    width: paddingE * 3
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: paddingE,
    marginBottom:paddingE,
    fontWeight: 'bold'
  },
  buttontext: {
    color: '#2B65EC',
    fontWeight: '600',
    fontSize: 15
  }
});
