import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet, Image } from 'react-native';

interface Photo {
    id: string;
    uri: string;
    date: string;
}

const GalleryScreen: React.FC = () => {
    const [photos, setPhotos] = useState<Photo[]>([
        { id: '1', uri: 'photo1.jpg', date: '2024-11-25' },
        { id: '2', uri: 'photo2.jpg', date: '2024-11-26' },
    ]);

    const renderPhoto = ({ item }: { item: Photo }) => (
        <View style={styles.photoContainer}>
            <Image source={{ uri: item.uri }} style={styles.photo} />
            <Text style={styles.date}>{item.date}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={photos}
                keyExtractor={(item) => item.id}
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
