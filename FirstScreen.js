// FirstScreen.js
import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const FirstScreen = ({ navigation }) => {
    const handleImageProcess = (imageUri) => {
        navigation.navigate('Processed', { imageUri }); // "Processed" corresponds to SecondScreen
    };

    const pickImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.assets && response.assets.length > 0) {
                const image = response.assets[0];
                console.log('Selected Image URI:', image.uri);

                // After selecting the photo, navigate to SecondScreen
                handleImageProcess(image.uri);
            } else if (response.didCancel) {
                console.warn('User canceled the selection process.');
            } else if (response.errorCode) {
                console.error('Error selecting photo:', response.errorMessage);
            }
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select and Recognize Image</Text>
            <Button title="Select Image" onPress={pickImage} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default FirstScreen;
