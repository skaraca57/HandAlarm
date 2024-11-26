import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveGallery = async (gallery) => {
    try {
        await AsyncStorage.setItem('gallery', JSON.stringify(gallery));
    } catch (error) {
        console.error('Galeri kaydedilirken hata oluştu:', error);
    }
};

export const loadGallery = async () => {
    try {
        const savedGallery = await AsyncStorage.getItem('gallery');
        return savedGallery ? JSON.parse(savedGallery) : [];
    } catch (error) {
        console.error('Galeri yüklenirken hata oluştu:', error);
        return [];
    }
};
