import React from 'react';
import { View, FlatList, Text, StyleSheet, Image } from 'react-native';

// Fotoğraf objesi için tür tanımı
interface Photo {
    uri: string;
    date: string;
}

// GalleryScreen'in prop'ları için tür tanımı
interface GalleryScreenProps {
    gallery: Photo[];
}

const GalleryScreen: React.FC<GalleryScreenProps> = ({ gallery }) => {
    // FlatList'teki her bir öğe için tür tanımı
    const renderPhoto = ({ item }: { item: Photo }) => (
        <View style={styles.photoContainer}>
            <Image source={{ uri: item.uri }} style={styles.photo} />
            <Text style={styles.date}>{item.date}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={[...gallery].reverse()} //
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderPhoto}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    photoContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    photo: {
        width: 200,
        height: 200,
    },
    date: {
        marginTop: 5,
        fontSize: 16,
    },
});

export default GalleryScreen;
