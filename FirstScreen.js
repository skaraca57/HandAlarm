// FirstScreen.js
import React from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity, ImageBackground, } from 'react-native';
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
        <ImageBackground
            source={{ uri: 'https://img.freepik.com/premium-photo/blank-clipboard-surrounded-by-stationery_640251-120981.jpg' }} // Buraya istediğin bir görsel URL'sini koyabilirsin
            style={styles.background}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Select and Recognize Image</Text>
                {/* YENİ: TouchableOpacity ile özel bir buton tasarımı yapıldı */}
                <TouchableOpacity style={styles.button} onPress={pickImage}>
                    <Text style={styles.buttonText}>Select Image</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    // YENİ: Arka plan stiline yönelik tanımlamalar
    background: {
        flex: 1,
        resizeMode: 'cover', // Görselin ekranı tam kaplaması için
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // YENİ: Görselin üzerine hafif bir karartma efekti
    },
    title: {
        fontSize: 28, // YENİ: Daha büyük ve modern başlık boyutu
        fontWeight: 'bold',
        color: '#FFFDD0', // YENİ: Yazı rengini pink yaptım
        marginBottom: 30, // Daha fazla boşluk
        textAlign: 'center', // Ortalanmış metin
    },
    button: {
        // YENİ: Buton için özelleştirilmiş stil
        backgroundColor: '#7E4100FF', // Mor buton rengi
        paddingVertical: 15, // Dikey boşluk
        paddingHorizontal: 40, // Yatay boşluk
        borderRadius: 30, // Yuvarlatılmış köşeler
        shadowColor: '#000', // Gölge efekti
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5, // Android'de gölge için
    },
    buttonText: {
        // YENİ: Buton içindeki metin stili
        color: '#FFFDD0',
        fontSize: 20, // Daha büyük yazı boyutu
        fontWeight: 'bold',
    },
});

export default FirstScreen;
