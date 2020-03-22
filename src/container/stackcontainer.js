import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  View,
  Animated,
  Easing
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

//Screens
import Login from '../screens/authentication/login';
import Signupform from '../screens/authentication/signup';
import Taskshowup from '../screens/createtask/taskshowup';
import Createtask from '../screens/createtask/createtask';
import Creatework from '../screens/creatework/creatework';
import Statuschange from '../screens/creatework/statuschange';
import Settingupdatabase from '../screens/userguid/settingupdatabase';

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };
  render() {
    return (
      <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 30,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true
    },
    screenInterpolator: sceneProps => {
      const { position, scene } = sceneProps;
      const thisSceneIndex = scene.index;
      const height = sceneProps.layout.initHeight;

      const translateY = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [height, 0]
      });

      return { transform: [{ translateY }] };
    }
  };
};

const stack1 = createStackNavigator(
  {
    signup: Signupform,
    login: Login,
    settingupdatabase: {
      screen: Settingupdatabase,
      navigationOptions: {
      header: () => null
    }
  } 
  },
  {
    initialRouteName: 'login',
    //transitionConfig,
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
  }
);
const stack2 = createStackNavigator(
  {
    task: {
      screen: Taskshowup,
      navigationOptions: {
        header: () => null
      }
    },
    createtask: Createtask,
    worklist: Statuschange,
    creatework: Creatework
  },
  {
    initialRouteName: 'task',
   // transitionConfig
  }
);


//const Container3 = createAppContainer(stack3);
const Container1 = createAppContainer(stack1);
const Container2 = createAppContainer(stack2);

const Container = createAppContainer(
  createSwitchNavigator(
    {
      App: Container2,
      Auth: Container1,
      //Searchtask: Container3,
      AuthLoading: AuthLoadingScreen
    },
    {
      initialRouteName: 'AuthLoading'
    }
  )
);

export default Container;
