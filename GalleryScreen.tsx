// GalleryScreen.tsx
import React from 'react';
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
    ImageBackground,
} from 'react-native';
import { Photo } from './navigationTypes';

interface GalleryScreenProps {
    gallery: Photo[];
    setGallery: React.Dispatch<React.SetStateAction<Photo[]>>;
}

const GalleryScreen: React.FC<GalleryScreenProps> = ({ gallery, setGallery }) => {
    // Fotoğrafı silmek için kullanılan fonksiyon
    const deletePhoto = (index: number) => {
        Alert.alert(
            'Delete Photo',
            'Are you sure you want to delete this photo?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        const updatedGallery = [...gallery];
                        updatedGallery.splice(index, 1);
                        setGallery(updatedGallery);
                    },
                },
            ],
            { cancelable: true }
        );
    };

    // Fotoğrafları listelemek için kullanılan render fonksiyonu
    const renderPhoto = ({ item, index }: { item: Photo; index: number }) => (
        <View style={styles.photoContainer}>
            <TouchableOpacity onLongPress={() => deletePhoto(index)}>
                <Image source={{ uri: item.uri }} style={styles.photo} />
            </TouchableOpacity>
            <Text style={styles.date}>{item.date}</Text>
        </View>
    );

    return (
        <ImageBackground
            source={{ uri: 'https://img.freepik.com/premium-photo/blank-clipboard-surrounded-by-stationery_640251-121052.jpg' }} // Arka plan görseli
            style={styles.background}
        >
            <View style={styles.overlay}>
                <FlatList
                    data={[...gallery].reverse()} // Yeni eklenen fotoğraflar en üstte
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderPhoto}
                    contentContainerStyle={styles.flatListContainer}
                />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover', // Görsel ekranı kaplar
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Görselin üzerine karartma efekti
        padding: 10,
    },
    flatListContainer: {
        paddingBottom: 20, // Listeye alt boşluk ekler
    },
    photoContainer: {
        marginBottom: 20,
        alignItems: 'center',
        backgroundColor: '#FFFDD0', // Fotoğraf kutusu arka planı
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000', // Gölge efekti
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    photo: {
        width: 350,
        height: 200,
        borderRadius: 10, // Fotoğraf kenarlarına yuvarlaklık
    },
    date: {
        marginTop: 5,
        fontSize: 16,
        color: '#7E4100FF', // Tarih yazı rengi
        fontWeight: 'bold',
    },
});

export default GalleryScreen;
