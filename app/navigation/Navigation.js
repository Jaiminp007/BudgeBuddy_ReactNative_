// import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
// import LoginScreen from '../components/LoginScreen';
import DashboardScreen from '../components/DashboardScreen';
import ProblemScreen from '../components/ProblemScreen';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
const Navigation = () => {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Dashboard">
          <Drawer.Screen name="Dashboard" component={DashboardScreen} />
          <Drawer.Screen name="Problems" component={ProblemScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  };
  
  export default Navigation;