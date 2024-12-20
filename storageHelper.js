import AsyncStorage from '@react-native-async-storage/async-storage';

const GALLERY_KEY = 'gallery_key';
const ALARMS_KEY = 'alarms_key';


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


export const saveAlarms = async (alarms) => {
    try {
        const jsonValue = JSON.stringify(alarms);
        await AsyncStorage.setItem(ALARMS_KEY, jsonValue);
    } catch (e) {
        console.error('Failed to save alarms to storage', e);
    }
};


export const loadAlarms = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(ALARMS_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error('Failed to load alarms from storage', e);
        return [];
    }
};
