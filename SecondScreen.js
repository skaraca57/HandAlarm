// SecondScreen.js
import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform, View, Image, Text, StyleSheet, ScrollView, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import RNFS from 'react-native-fs';
import PushNotification from 'react-native-push-notification';
import { saveAlarms, loadAlarms } from './storageHelper'; // AsyncStorage fonksiyonlarını ekleyin






const SecondScreen = ({ route, navigation, setGallery, gallery }) => {
    const { imageUri } = route.params || {};
    const [detectedText, setDetectedText] = useState('');
    const [alarms, setAlarms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        requestNotificationPermission();
    }, []);





    useEffect(() => {
        if (imageUri) {
            processImage(imageUri);
        }
    }, [imageUri]);





    const requestNotificationPermission = async () => {
        if (Platform.OS === 'android' && Platform.Version >= 33) {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Notification permission granted.');
            } else {
                Alert.alert(
                    'Permission Denied',
                    'You need to enable notification permissions from settings.'
                );
            }
        }
    };





    const processImage = async (uri) => {
        try {
            const base64Image = await RNFS.readFile(uri, 'base64');
            const apiKey = 'AIzaSyDhJ5ywN5psJLw27O8LChB1oyVx0XCbzhY'; // Replace with your actual API key
            const body = {
                requests: [
                    {
                        image: { content: base64Image },
                        features: [{ type: 'TEXT_DETECTION' }],
                    },
                ],
            };

            const response = await fetch(
                `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                }
            );

            const result = await response.json();
            const text = result.responses[0]?.fullTextAnnotation?.text || 'No text found.';
            setDetectedText(text);
        } catch (error) {
            console.error('Error:', error);
            setDetectedText('An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const validateAndExtract = (text) => {
        // Regex that ignores spaces and possible separators
        const regex = /^\s*(.+?)\s*[\/|\-]?\s*(\d{1,2}[:\.]\d{2})\s*[\/|\-]?\s*(\d{2}\.\d{2}\.\d{4})\s*$/;
        const match = text.match(regex);

        if (match) {
            return {
                job: match[1].trim(),
                time: match[2].trim(),
                date: match[3].trim(),
            };
        }
        return null;
    };

    const addAlarm = async () => {
        const alarmData = validateAndExtract(detectedText);

        if (alarmData) {
            const [day, month, year] = alarmData.date.split('.').map(Number);
            const [hour, minute] = alarmData.time.split(':').map(Number);
            const alarmTime = new Date(year, month - 1, day, hour, minute);

            if (alarmTime < new Date()) {
                Alert.alert('Invalid Time', 'The selected time is in the past!');
                return;
            }

            // Yeni alarm objesi oluştur
            const newAlarm = {
                id: `${Date.now()}`, // Benzersiz bir ID oluştur
                job: alarmData.job,
                time: alarmData.time,
                date: alarmData.date,
            };

            // AsyncStorage'deki mevcut alarmları yükle
            const currentAlarms = await loadAlarms();
            const updatedAlarms = [...currentAlarms, newAlarm];

            // Yeni alarm listesiyle AsyncStorage'ı güncelle
            await saveAlarms(updatedAlarms);

            // Local state'i de güncelle
            setAlarms(updatedAlarms);

            PushNotification.localNotificationSchedule({
                channelId: 'test-alarm-channel',
                title: 'Scheduled Alarm',
                message: `Your scheduled task "${newAlarm.job}" is now!`,
                date: alarmTime,
                allowWhileIdle: true,
                playSound: true,
                soundName: 'default',
                vibrate: true,
                vibration: 300,
            });

            setGallery((prev) => [...prev, { uri: imageUri, date: new Date().toISOString() }]);
            setAlarms((prev) => [...prev, alarmData]);
            Alert.alert(
                'Alarm Set',
                `Task: ${alarmData.job}\nTime: ${alarmData.time}\nDate: ${alarmData.date}`
            );
            navigation.navigate('Agenda', { alarms: [...alarms, alarmData] });
        } else {
            Alert.alert(
                'Invalid Format',
                'Text format is not suitable! Example: Exercise / 20:00 / 26.11.2024'
            );
        }
    };
    const scheduleTestAlarm = () => {
        PushNotification.localNotificationSchedule({
            channelId: 'test-alarm-channel',
            title: 'Test Alarm',
            message: 'This is a test alarm!',
            date: new Date(Date.now() + 5000), // 5 seconds later
            allowWhileIdle: true,
            allowWhileIdle: true,
            playSound: true, // Ses çalma
            soundName: 'default', // Varsayılan alarm sesi
        });

        Alert.alert('Alarm Set', 'The test alarm will ring in 5 seconds.');
    };

    return (
        <ImageBackground
            source={{ uri: 'https://img.freepik.com/premium-photo/blank-clipboard-surrounded-by-stationery_640251-120605.jpg' }} // Background görsel URL
            style={styles.background}
        >
            <ScrollView contentContainerStyle={styles.container}>
                {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
                <View style={styles.textContainer}>
                    {loading ? (
                        <Text style={styles.loadingText}>Loading...</Text>
                    ) : (
                        <Text style={styles.detectedText}>{detectedText}</Text>
                    )}
                </View>
                <TouchableOpacity style={styles.button} onPress={addAlarm}>
                    <Text style={styles.buttonText}>Set Alarm</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={scheduleTestAlarm}>
                    <Text style={styles.buttonText}>Test Alarm</Text>
                </TouchableOpacity>
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover', // Görsel ekranı kaplar
    },
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Arka plana hafif karartma efekti
        padding: 16,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 16,
        borderRadius: 10, // Görselin kenarlarına yuvarlaklık
    },
    textContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFDD0', // Krem rengi
        textAlign: 'center',
    },
    detectedText: {
        fontSize: 16,
        fontWeight: 'normal',
        color: '#FFFDD0', // Krem rengi
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#7E4100FF', // Buton rengi
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 30, // Yuvarlatılmış kenarlar
        shadowColor: '#000', // Gölge efekti
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    buttonText: {
        color: '#FFFDD0', // Krem rengi
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default SecondScreen;
