import React, { Component } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import Container from './src/container/stackcontainer';
import IMAGE from './IMAGE';
import { store, persistor } from './src/reduxForm/persiststore';


export default class App extends Component{
 
 render() {
   return (
     <Provider store={store}>
       <PersistGate loading={<IMAGE />} persistor={persistor}>
         <StatusBar backgroundColor={'white'} barStyle={'dark-content'}/>
         <Container />
       </PersistGate>
     </Provider>
   );
 }
}

// import React, { Component } from 'react';
// import DocumentPicker from 'react-native-document-picker';
// import { View, Image, FlatList } from 'react-native';
// import RNFS from 'react-native-fs';
// // Pick a single  0file

// export default class App extends Component {
//   state = {
//     imageurl:[],
//     base64:""
//   }
//   async componentDidMount() {
//     try {
//       const ress = await DocumentPicker.pickMultiple({
//         type: [DocumentPicker.types.images],
//       });
// //       this.setState({imageurl: res.uri});


//       // console.log(
//       //   res.uri,
//       //   res.type, // mime type
//       //   res.name,
//       //   res.size
//       // );
//       var arr = [];

//     ress.forEach((item,i) => {  console.log(i);
//             RNFS.readFile(item.uri, 'base64')
// .then(res =>{
//   console.log(typeof res, i, arr.length);
//   arr.push('data'+ `:${item.type};base64,`+res);
//   console.log(typeof res, i, arr.length,res.length-1);
//   if(i===(ress.length-1)) {
//     console.log(arr.length);
  
//     this.setState({imageurl:arr});
//   }
// });

// });


//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//         // User cancelled the picker, exit any dialogs or menus and move on
//       } else {
//         throw err;
//       }
//     }
     
//     // Pick multiple files
//     // try {
//     //   const results = await DocumentPicker.pickMultiple({
//     //     type: [DocumentPicker.types.images],
//     //   });
//     //   for (const res of results) {
//     //     console.log(
//     //       res.uri,
//     //       res.type, // mime type
//     //       res.name,
//     //       res.size
//     //     );
//     //   }
//     // } catch (err) {
//     //   if (DocumentPicker.isCancel(err)) {
//     //     // User cancelled the picker, exit any dialogs or menus and move on
//     //   } else {
//     //     throw err;
//     //   }
//     // }
//   }
//   render() {
//     console.log(this.state.imageurl.length);
//     return(
//       <View style={{flex:1, justifyContent:'center'}}>
//         {/* <Image
//         style={{width:'10%', height:'10%'}}
//         source={{uri:this.state.imageurl}}
//         />
//         <Image
//         style={{width:'10%', height:'10%'}}
//         source={{uri:
//           this.state.base64}}
//         /> */}
//         <FlatList
//         data={this.state.imageurl}
//         contentContainerStyle={{ marginTop:100}}
//         horizontal
//         renderItem = {({item,index}) => {
//           console.log(item.length);
//           return (
//             <View style={{marginRight:10}}>
//             <Image
//             style={{width:100, height:100}}
//             source={{uri:
//               item}}
//             />
//            </View>
//           )
//         } 
//         }
//         scrollEnabled={true}
//         keyExtractor={item => item.length}
//         />
//         </View>
//     );
//   }
// }