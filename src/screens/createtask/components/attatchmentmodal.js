import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
    TouchableHighlight
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const MODAL_MARGIN_HORIZONTAL = Math.round(SCREEN_WIDTH * 0.06);

const paddingE = Math.round(SCREEN_WIDTH * 0.05);
const upadding = Math.round(SCREEN_WIDTH * 0.03);

export default class Attatchmentmodal extends Component {
    render() {
        return(
            <View 
            ref = {(child) => {this.ref_view = child}}
            style={styles.modalContainer}
            >    
            <Text style={{color:'#2B65EC', fontWeight:'bold'}}>{'Attachment'}</Text>
                <TouchableHighlight style={styles.touchablehighlightstyle}
                onPress={() => {this.props.onAttatchment(0);}}
                underlayColor={null}
                >
                    <View style={styles.container}>
                        <View style={styles.container1}>
                            <MaterialIcons
                              name='photo'
                              size={paddingE}
                              color='#8D8D8C'
                            />
                        </View>
                        <View style={styles.container2}>
                            <Text style={styles.textstyle}>
                                {'Add image'}
                            </Text>
                        </View>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.touchablehighlightstyle}
                onPress={() => {this.props.onAttatchment(0);}}
                underlayColor={null}
                >
                    <View style={styles.container}>
                        <View style={styles.container1}>
                            <MaterialIcons
                              name='attach-file'
                              size={paddingE}
                              color='#8D8D8C'
                            />
                        </View>
                        <View style={styles.container2}>
                            <Text style={styles.textstyle}>
                                {'Add document'}
                            </Text>
                        </View>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={styles.touchablehighlightstyle}
                onPress={() => {this.props.onAttatchment(0);}}
                underlayColor={null}
                >
                    <View style={styles.container}>
                        <View style={styles.container1}>
                            <MaterialIcons
                              name='camera-front'
                              size={paddingE}
                              color='#8D8D8C'
                            />
                        </View>
                        <View style={styles.container2}>
                            <Text style={styles.textstyle}>
                                {'Add image from camera'}
                            </Text>
                        </View>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
              underlayColor={'#2B65EC33'}
              style={{
                height: upadding *3,
                  width: upadding * 5,
                  borderRadius: upadding,
                  alignItems: 'center',
                  justifyContent: 'center'
              }}
              onPress={() => {
                this.props.onAttatchment(0);
              }}
            >
              <Text style={{ fontSize: upadding * 1.2 , color: '#2B65EC', fontWeight:'bold' }}>{`cancel `}</Text>
            </TouchableHighlight>
            </View>
        );
    }
} 

const styles = StyleSheet.create({
    modalContainer: {
      backgroundColor: 'white',
      paddingRight: paddingE,
      paddingLeft: paddingE,
      paddingTop:upadding,
      flexDirection: 'column',
      borderRadius: paddingE * 0.3,
      paddingBottom:upadding,
      marginRight: MODAL_MARGIN_HORIZONTAL,
      marginLeft: MODAL_MARGIN_HORIZONTAL
    },
      touchablehighlightstyle: {
    height: upadding * 3,
    marginTop:upadding,
    justifyContent: 'center',
    borderRadius: 3,
    marginRight: upadding * 2
 },
 container: {
     flexDirection:'row',
     justifyContent:'center'
 },
 container1: {
     flex:2,
     alignItems:'center',
     justifyContent:'center'
 },
 container2: {
     flex:8,
     justifyContent:'center'
 },
 textstyle: {
     fontSize:upadding * 1.5,
 }
  });
  