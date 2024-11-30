// storageHelper.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const GALLERY_KEY = 'gallery_key';

export const saveGallery = async (gallery) => {
    try {
        const jsonValue = JSON.stringify(gallery);
        await AsyncStorage.setItem(GALLERY_KEY, jsonValue);
    } catch (e) {
        console.error('Failed to save gallery to storage', e);
    }
};

export const loadGallery = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(GALLERY_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error('Failed to load gallery from storage', e);
        return [];
    }
};
