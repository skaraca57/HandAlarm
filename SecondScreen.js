import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, ScrollView } from 'react-native';
import RNFS from 'react-native-fs';

const SecondScreen = ({ route }) => {
    const { imageUri } = route.params || {};
    const [detectedText, setDetectedText] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (imageUri) {
            processImage(imageUri);
        }
    }, [imageUri]);

    const processImage = async uri => {
        try {
            console.log('Processing Image URI:', uri);
            const base64Image = await RNFS.readFile(uri, 'base64');
            console.log('Base64 Image:', base64Image);

            const apiKey = 'AIzaSyDhJ5ywN5psJLw27O8LChB1oyVx0XCbzhY'; // Google API anahtarınızı buraya yazın
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
            console.log('Result:', result);
            const text = result.responses[0]?.fullTextAnnotation?.text || 'Metin bulunamadı.';
            setDetectedText(text);
        } catch (error) {
            console.error('Error during text recognition:', error);
            setDetectedText('Bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Seçilen Resim:</Text>
            {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
            <Text style={styles.title}>Tanınan Metin:</Text>
            {loading ? <Text>Yükleniyor...</Text> : <Text style={styles.result}>{detectedText}</Text>}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    result: {
        fontSize: 16,
        marginTop: 10,
        textAlign: 'center',
        color: 'black',
    },
});

export default SecondScreen;
