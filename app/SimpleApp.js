import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

const ScreenOne = ({ navigation }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Screen One</Text>
    <TouchableOpacity onPress={() => navigation.navigate('ScreenTwo')}>
      <Text>Go to Screen Two</Text>
    </TouchableOpacity>
  </View>
);

const ScreenTwo = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Screen Two</Text>
  </View>
);

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="ScreenOne">
        <Drawer.Screen name="ScreenOne" component={ScreenOne} />
        <Drawer.Screen name="ScreenTwo" component={ScreenTwo} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
