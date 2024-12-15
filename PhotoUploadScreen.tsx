import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const PhotoUploadScreen: React.FC = () => {
    const pickImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.assets && response.assets.length > 0) {
                const image = response.assets[0];
                console.log('Selected Image URI:', image.uri);

            }
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Fotoğraf Yükle</Text>
            <Button title="Fotoğraf Seç" onPress={pickImage} />
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

export default PhotoUploadScreen;
