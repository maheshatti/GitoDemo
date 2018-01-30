import React from 'react';
import {
  DrawerNavigator,
  StackNavigator
} from 'react-navigation';
import {withRkTheme} from 'react-native-ui-kitten';
import * as Screens from './screens';
import {View} from "react-native";

function getCurrentRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
}
const Gitomedemo = StackNavigator({
  First: {
    screen: Screens.LoginV1
  },
   Second: {
    screen: Screens.SignUp
  },
  List: {
    screen: Screens.Contacts
  },
  Profile: {
    screen: Screens.ProfileSettings
  },

},);

export default  Gitomedemo
