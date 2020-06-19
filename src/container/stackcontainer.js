import {
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from '../screens/authentication/Login';
import SignUp from '../screens/authentication/Signup';
import TaskShowUp from '../screens/task/TaskShowUp';
import CreateTask from '../screens/task/CreateTask';
import CreateWork from '../screens/work/CreateWork';
import StatusChange from '../screens/work/Work';
import SettingUpDatabase from '../screens/settingup/SettingUpDatabase';
import Splash from '../onLoad/splash';

const authNavigator = createStackNavigator(
  {
    signup: SignUp,
    login: Login,
    settingupdatabase: {
      screen: SettingUpDatabase,
      navigationOptions: {
      header: () => null
    }
  } 
  },
  {
    initialRouteName: 'login',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
  }
);
const taskNavigator = createStackNavigator(
  {
    task: {
      screen: TaskShowUp,
      navigationOptions: {
        header: () => null
      }
    },
    createtask: {
      screen: CreateTask,
      // navigationOptions: {
      //   headerLeft:() => null
      // }
    },
    worklist: StatusChange,
    creatework: CreateWork
  },
  {
    initialRouteName: 'task'
  }
);


const Container1 = createAppContainer(authNavigator);
const Container2 = createAppContainer(taskNavigator);

const Container = createAppContainer(
  createSwitchNavigator(
    {
      Auth: Container1,
      App: Container2,
      Splash: Splash
    },
    {
      initialRouteName: 'Splash'
    }
  )
);

export default Container;
