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
  // State: Galerideki fotoğrafları saklamak için
  const [gallery, setGallery] = useState<Photo[]>([]);

  // İlk başlatıldığında galeriyi yükle
  useEffect(() => {
    const fetchGallery = async () => {
      const savedGallery = await loadGallery(); // storage'den galeriyi yükle
      setGallery(savedGallery); // State'e kaydet
    };
    fetchGallery();
  }, []); // Bu sadece ilk başlatıldığında çalışır.

  // Galeride bir değişiklik olduğunda otomatik olarak storage'e kaydet
  useEffect(() => {
    saveGallery(gallery); // storageHelper fonksiyonu
  }, [gallery]);

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
