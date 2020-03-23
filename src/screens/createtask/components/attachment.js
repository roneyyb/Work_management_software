import React, {Component } from 'react';
import { StyleSheet, View, Text, Dimensions, FlatList, ScrollView } from 'react-native';


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const upadding = Math.round(SCREEN_WIDTH * 0.03);

export default class Attachment extends Component {
    render() {
        return(
            <ScrollView style={styles.attachmentContainer}>
            <View
                  style={styles.acontainer1}
                >
                  <Text
                    style={{
                      color: '#8D8D8C',
                      flex: 18,
                      fontSize: upadding * 1.2,
                      fontWeight: 'bold'
                    }}
                  >
                  {'Attachment   '}
                  </Text> 
            </View>
            {/* <View>       
                 <FlatList
           data={this.props.image}
           contentContainerStyle={{ marginTop:100}}
           horizontal
           renderItem = {({item,index}) => {
           console.log(item.length);
           return (
            <View style={{marginRight:10}}>
            <Image
            style={{width:100, height:100}}
            source={{uri:
              item}}
            />
            
           </View>
          )
        } 
        }
        scrollEnabled={true}
        keyExtractor={item => item.length}
        />
        </View>
        <View>
           <FlatList
           data={this.props.document}
        contentContainerStyle={{ marginTop:100}}
        renderItem = {({item,index}) => {
          console.log(item.length);
          return (
            <View style={{marginRight:10}}>
            <Text style={{fontSize:20}}>{`${this.props.document.attachment_name}`}</Text>
           </View>
          )
        } 
        }
        scrollEnabled={true}
        keyExtractor={item => item.length}
        />
        </View> */}
       </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    attachmentContainer: {
        flexDirection:'row',
        backgroundColor:'#C0C0C01A',
        padding:upadding,
        marginTop:0
      },
      acontainer1: {
        flex: 9,
        height:upadding * 2,
        backgroundColor: '#2B65EC0F',
        borderRadius: 3,
        justifyContent: 'center',
        paddingLeft: upadding  
      },
});