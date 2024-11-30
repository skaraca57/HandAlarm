// SecondScreen.js
import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, Alert, Button } from 'react-native';
import RNFS from 'react-native-fs';

const SecondScreen = ({ route, navigation, setGallery, gallery }) => {
    const { imageUri } = route.params || {};
    const [detectedText, setDetectedText] = useState('');
    const [alarms, setAlarms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (imageUri) {
            processImage(imageUri);
        }
    }, [imageUri]);

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

    const addAlarm = () => {
        const alarmData = validateAndExtract(detectedText);

        if (alarmData) {
            setGallery((prev) => [...prev, { uri: imageUri, date: new Date().toISOString() }]);
            setAlarms((prev) => [...prev, alarmData]);
            Alert.alert('Alarm Set', `${alarmData.job} - ${alarmData.time} - ${alarmData.date}`);
            navigation.navigate('Agenda', { alarms: [...alarms, alarmData] });
        } else {
            Alert.alert(
                'Invalid Format',
                'Text format is not suitable! Example: Exercise / 20:00 / 26.11.2024'
            );
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
            {loading ? <Text>Loading...</Text> : <Text>{detectedText}</Text>}
            <Button title="Set Alarm" onPress={addAlarm} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
    image: { width: 200, height: 200, marginBottom: 16 },
});

export default SecondScreen;
