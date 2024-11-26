import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const FirstScreen = ({ navigation, setGallery, gallery }) => {
    const handleImageProcess = (imageUri) => {
        navigation.navigate('Processed', { imageUri });
    };

    const pickImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.assets && response.assets.length > 0) {
                const image = response.assets[0];
                console.log('Selected Image URI:', image.uri);

                // Fotoğrafı galeriye ekle
                setGallery([...gallery, { uri: image.uri, date: new Date().toISOString() }]);

                // SecondScreen'e yönlendir
                handleImageProcess(image.uri);
            } else if (response.didCancel) {
                console.warn('Kullanıcı seçim işlemini iptal etti.');
            } else if (response.errorCode) {
                console.error('Fotoğraf seçme hatası:', response.errorMessage);
            }
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Resim Seç ve Tanı</Text>
            <Button title="Resim Seç" onPress={pickImage} />
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
