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
} from 'react-native';
import { Photo } from './navigationTypes';

interface GalleryScreenProps {
    gallery: Photo[];
    setGallery: React.Dispatch<React.SetStateAction<Photo[]>>;
}

const GalleryScreen: React.FC<GalleryScreenProps> = ({ gallery, setGallery }) => {
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

    const renderPhoto = ({ item, index }: { item: Photo; index: number }) => (
        <View style={styles.photoContainer}>
            <TouchableOpacity onLongPress={() => deletePhoto(index)}>
                <Image source={{ uri: item.uri }} style={styles.photo} />
            </TouchableOpacity>
            <Text style={styles.date}>{item.date}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={[...gallery].reverse()}
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
