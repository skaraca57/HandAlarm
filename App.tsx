import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FirstScreen from './FirstScreen';
import SecondScreen from './SecondScreen';
import GalleryScreen from './GalleryScreen';
import AgendaScreen from './AgendaScreen';

const Tab = createMaterialTopTabNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Upload" component={FirstScreen} />
        <Tab.Screen name="Processed" component={SecondScreen} />
        <Tab.Screen name="Gallery" component={GalleryScreen} />
        <Tab.Screen name="Agenda" component={AgendaScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
