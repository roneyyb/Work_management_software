import PushNotificationAndroid from 'react-native-push-notification'
import { DeviceEventEmitter } from 'react-native';

(function localNotification() {
  // Register all the valid actions for notifications here and add the action handler for each action
  PushNotificationAndroid.registerNotificationActions(['Accept','Reject','Yes','No']);
  DeviceEventEmitter.addListener('notificationActionReceived', function(action){
    console.log ('Notification action received: ' + action);
    const info = JSON.parse(action.dataJSON);
    console.log('info =>',info);
    if (info.action == 'Complete') {
      // Do work pertaining to Accept action here
      
    } else if (info.action == 'Delete') {
      // Do work pertaining to Reject action here
    }
    // Add all the required actions handlers
  });
})();