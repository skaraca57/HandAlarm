import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FirstScreen from './FirstScreen';
import SecondScreen from './SecondScreen';
import GalleryScreen from './GalleryScreen';
import AgendaScreen from './AgendaScreen';
import { saveGallery, loadGallery } from './storageHelper';
import { TabParamList, Alarm, Photo } from './navigationTypes';
import PushNotification from 'react-native-push-notification';
import { Platform, PermissionsAndroid, Alert } from 'react-native';



const Tab = createMaterialTopTabNavigator<TabParamList>();


const App: React.FC = () => {

  const [gallery, setGallery] = React.useState<Photo[]>([]);

  useEffect(() => {

  })



  useEffect(() => {

    const fetchGallery = async () => {
      const savedGallery = await loadGallery();
      setGallery(savedGallery);
    };
    fetchGallery();


    PushNotification.createChannel(
      {
        channelId: 'test-alarm-channel',
        channelName: 'Special Notifications',
        channelDescription: 'A channel for special notifications',
        importance: 4,
        vibrate: true,
        playSound: true,
        soundName: 'default',
      },
      (created) => console.log(`Channel created or already exists: ${created}`)
    );


    const requestNotificationPermission = async () => {
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );

        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Permission Denied', 'You need to enable notification permissions from settings.');
          return false;
        }
      }
      return true;
    };
    const checkPermissions = async () => {
      const granted = await requestNotificationPermission();
      if (!granted) {
        console.log("Notification permission not granted.");
      }
    };
    checkPermissions();
  }, []);


  useEffect(() => {
    saveGallery(gallery);
  }, [gallery]);


  useEffect(() => {
    PushNotification.channelExists('specialid', (exists) => {
      if (!exists) {
        PushNotification.createChannel(
          {
            channelId: 'specialid',
            channelName: 'Special Notifications',
            channelDescription: 'A channel for special notifications',
            importance: 4,
            vibrate: true,
          },
          (created) => console.log(`Channel created: ${created}`)
        );
      } else {
        console.log('Channel already exists');
      }
    });
  }, []);



  return (
    <NavigationContainer>
      { }
      <Tab.Navigator
        screenOptions={{

          tabBarStyle: {
            backgroundColor: '#FFFDD0',
            height: 50,
            justifyContent: 'center',
          },
          tabBarLabelStyle: {
            fontSize: 15,
            fontWeight: 'bold',
            color: '#7E4100FF',
            textAlign: 'center',
          },
          tabBarIndicatorStyle: { backgroundColor: '#7E4100FF', height: 3 },
          tabBarInactiveTintColor: '#888',
          tabBarActiveTintColor: '#7E4100FF',
        }}
      >
        { }
        <Tab.Screen
          name="Upload"
          component={FirstScreen}
          options={{
            tabBarLabel: 'Upload',
          }}
        />

        { }
        <Tab.Screen
          name="Processed"
          children={(props) => (
            <SecondScreen {...props} setGallery={setGallery} gallery={gallery} />
          )}
          options={{
            tabBarLabel: 'Processed',
          }}
        />

        { }
        <Tab.Screen
          name="Gallery"
          children={(props) => (
            <GalleryScreen {...props} gallery={gallery} setGallery={setGallery} />
          )}
          options={{
            tabBarLabel: 'Gallery',
          }}
        />

        { }
        <Tab.Screen
          name="Agenda"
          component={AgendaScreen}
          options={{
            tabBarLabel: 'Agenda',
          }}
          initialParams={{ alarms: [] }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
