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
        <ImageBackground
            source={{ uri: 'https://img.freepik.com/premium-photo/blank-clipboard-surrounded-by-stationery_640251-121052.jpg' }}
            style={styles.background}
        >
            <View style={styles.overlay}>
                <FlatList
                    data={[...gallery].reverse()}
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
        resizeMode: 'cover',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
    },
    flatListContainer: {
        paddingBottom: 20,
    },
    photoContainer: {
        marginBottom: 20,
        alignItems: 'center',
        backgroundColor: '#FFFDD0',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    photo: {
        width: 350,
        height: 200,
        borderRadius: 10,
    },
    date: {
        marginTop: 5,
        fontSize: 16,
        color: '#7E4100FF',
        fontWeight: 'bold',
    },
});

export default GalleryScreen;
