import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FirstScreen from './FirstScreen';
import SecondScreen from './SecondScreen';
import GalleryScreen from './GalleryScreen';
import AgendaScreen from './AgendaScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveGallery, loadGallery } from './storageHelper';




const Tab = createMaterialTopTabNavigator();

const App = () => {
  const [gallery, setGallery] = useState([]); // Global galeri state'i

  useEffect(() => {
    const fetchGallery = async () => {
      const savedGallery = await loadGallery();
      setGallery(savedGallery);
    };
    fetchGallery();
  }, []);

  // Galeri Değiştiğinde AsyncStorage'e Kaydet
  useEffect(() => {
    saveGallery(gallery);
  }, [gallery]);
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Upload">
          {(props) => <FirstScreen {...props} setGallery={setGallery} gallery={gallery} />}
        </Tab.Screen>
        <Tab.Screen name="Processed" component={SecondScreen} />
        <Tab.Screen name="Gallery">
          {(props) => <GalleryScreen {...props} gallery={gallery} />}
        </Tab.Screen>
        <Tab.Screen name="Agenda" component={AgendaScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
