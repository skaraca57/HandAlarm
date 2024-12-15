// FirstScreen.js
import React from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity, ImageBackground, } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const FirstScreen = ({ navigation }) => {
    const handleImageProcess = (imageUri) => {
        navigation.navigate('Processed', { imageUri });
    };

    const pickImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.assets && response.assets.length > 0) {
                const image = response.assets[0];
                console.log('Selected Image URI:', image.uri);


                handleImageProcess(image.uri);
            } else if (response.didCancel) {
                console.warn('User canceled the selection process.');
            } else if (response.errorCode) {
                console.error('Error selecting photo:', response.errorMessage);
            }
        });
    };

    return (
        <ImageBackground
            source={{ uri: 'https://img.freepik.com/premium-photo/blank-clipboard-surrounded-by-stationery_640251-120981.jpg' }}
            style={styles.background}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Select and Recognize Image</Text>
                { }
                <TouchableOpacity style={styles.button} onPress={pickImage}>
                    <Text style={styles.buttonText}>Select Image</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({

    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFDD0',
        marginBottom: 30,
        textAlign: 'center',
    },
    button: {

        backgroundColor: '#7E4100FF',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    buttonText: {

        color: '#FFFDD0',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default FirstScreen;
