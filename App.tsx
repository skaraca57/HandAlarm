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



  // Uygulama başladığında çalıştırılacak işlemler
  useEffect(() => {
    // Depolanan galeriyi yükleme
    const fetchGallery = async () => {
      const savedGallery = await loadGallery();
      setGallery(savedGallery);
    };
    fetchGallery();

    // Bildirim kanalı oluşturma (App başlatıldığında bir kez)
    PushNotification.createChannel(
      {
        channelId: 'test-alarm-channel',
        channelName: 'Special Notifications',
        channelDescription: 'A channel for special notifications',
        importance: 4,
        vibrate: true,
        playSound: true, // Ses çalma
        soundName: 'default', // Varsayılan alarm sesi
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

  // Galeri güncellemelerini depolama
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
      {/* Sekme Navigasyonu Başlıyor */}
      <Tab.Navigator
        screenOptions={{
          // Sekme Tasarımı
          tabBarStyle: {
            backgroundColor: '#FFFDD0', // Çubuğun arka plan rengi
            height: 50, // Çubuğun yüksekliği artırıldı
            justifyContent: 'center', // İçeriği ortalamak için
          }, // Sekme çubuğu koyu gri
          tabBarLabelStyle: {
            fontSize: 15, // Yazı boyutunu büyüttük
            fontWeight: 'bold',
            color: '#7E4100FF',
            textAlign: 'center', // Metni ortaladık
          }, // Sekme yazıları
          tabBarIndicatorStyle: { backgroundColor: '#7E4100FF', height: 3 }, // Aktif sekme alt çizgisi
          tabBarInactiveTintColor: '#888', // Pasif sekme yazı rengi
          tabBarActiveTintColor: '#7E4100FF', // Aktif sekme yazı rengi
        }}
      >
        {/* İlk Sekme: Upload */}
        <Tab.Screen
          name="Upload"
          component={FirstScreen} // FirstScreen bileşenini bağla
          options={{
            tabBarLabel: 'Upload', // Sekmede görünen yazı
          }}
        />

        {/* İkinci Sekme: Processed */}
        <Tab.Screen
          name="Processed"
          children={(props) => (
            <SecondScreen {...props} setGallery={setGallery} gallery={gallery} />
          )}
          options={{
            tabBarLabel: 'Processed', // Sekme adı
          }}
        />

        {/* Üçüncü Sekme: Gallery */}
        <Tab.Screen
          name="Gallery"
          children={(props) => (
            <GalleryScreen {...props} gallery={gallery} setGallery={setGallery} />
          )}
          options={{
            tabBarLabel: 'Gallery', // Sekme adı
          }}
        />

        {/* Dördüncü Sekme: Agenda */}
        <Tab.Screen
          name="Agenda"
          component={AgendaScreen}
          options={{
            tabBarLabel: 'Agenda', // Sekme adı
          }}
          initialParams={{ alarms: [] }} // Varsayılan alarm listesi
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
