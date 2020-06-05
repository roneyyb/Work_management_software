import {
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from '../screens/authentication/Login';
import SignUp from '../screens/authentication/Signup';
import TaskShowUp from '../screens/createtask/TaskShowUp';
import CreateTask from '../screens/createtask/CreateTask';
import CreateWork from '../screens/creatework/CreateWork';
import StatusChange from '../screens/creatework/Work';
import SettingUpDatabase from '../screens/DatabaseSetting/settingupdatabase';
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
    createtask: CreateTask,
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
