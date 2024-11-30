import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FirstScreen from './FirstScreen';
import SecondScreen from './SecondScreen';
import GalleryScreen from './GalleryScreen';
import AgendaScreen from './AgendaScreen';
import { saveGallery, loadGallery } from './storageHelper';
import { TabParamList, Alarm, Photo } from './navigationTypes';

const Tab = createMaterialTopTabNavigator<TabParamList>();


const App: React.FC = () => {
  const [gallery, setGallery] = useState<Photo[]>([]);

  useEffect(() => {
    const fetchGallery = async () => {
      const savedGallery = await loadGallery();
      setGallery(savedGallery);
    };
    fetchGallery();
  }, []);

  useEffect(() => {
    saveGallery(gallery);
  }, [gallery]);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Upload" component={FirstScreen} />
        <Tab.Screen
          name="Processed"
          children={(props) => (
            <SecondScreen {...props} setGallery={setGallery} gallery={gallery} />
          )}
        />
        <Tab.Screen
          name="Gallery"
          children={(props) => (
            <GalleryScreen {...props} gallery={gallery} setGallery={setGallery} />
          )}
        />
        <Tab.Screen
          name="Agenda"
          component={AgendaScreen}
          initialParams={{ alarms: [] }} // Provide initial alarms
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
