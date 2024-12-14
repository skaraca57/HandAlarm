import React, { useState, useEffect } from 'react';
import {
    View,
    FlatList,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    Alert,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { TabParamList, Alarm } from './navigationTypes';
import { saveAlarms, loadAlarms } from './storageHelper';

type AgendaScreenRouteProp = RouteProp<TabParamList, 'Agenda'>;

interface Props {
    route: AgendaScreenRouteProp;
}

const AgendaScreen: React.FC<Props> = ({ route }) => {
    const [alarms, setAlarms] = useState<Alarm[]>([]);

    // Alarmları yükleme (ilk açılışta)
    useEffect(() => {
        const fetchAlarms = async () => {
            const savedAlarms = await loadAlarms(); // Depodan alarmları yükle
            setAlarms(savedAlarms || []);
        };
        fetchAlarms();
    }, []);

    // Alarmları kaydetme (her değişiklikte)
    useEffect(() => {
        saveAlarms(alarms); // Depoya kaydet
    }, [alarms]);

    // Alarm silme fonksiyonu
    const deleteAlarm = (index: number) => {
        Alert.alert(
            'Delete Alarm',
            'Are you sure you want to delete this alarm?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        const updatedAlarms = [...alarms];
                        updatedAlarms.splice(index, 1); // Alarmı kaldır
                        setAlarms(updatedAlarms);
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const renderAlarm = ({ item }: { item: Alarm }) => (
        <TouchableOpacity style={styles.alarmContainer}>
            <Text style={styles.jobText}>{item.job}</Text>
            <Text style={styles.timeText}>{item.time}</Text>
            <Text style={styles.dateText}>{item.date}</Text>
        </TouchableOpacity>
    );

    return (
        <ImageBackground
            source={{ uri: 'https://img.freepik.com/premium-photo/blank-clipboard-surrounded-by-stationery_640251-121052.jpg' }} // Arka plan görseli
            style={styles.background}
        >
            <FlatList
                data={alarms}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderAlarm}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No events scheduled</Text>
                    </View>
                }
            />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover', // Arka planı tam kaplar
    },
    listContainer: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    alarmContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Yarı şeffaf beyaz
        marginBottom: 15,
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5, // Android için gölge
    },
    jobText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4A4A4A', // Koyu gri ton
        marginBottom: 5,
    },
    timeText: {
        fontSize: 16,
        color: '#7E4100FF', // Kahverengi ton
        marginBottom: 5,
        fontWeight: 'bold',
    },
    dateText: {
        fontSize: 16,
        color: '#7E4100FF', // Aynı renk ile tarih
        fontWeight: 'bold',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: '#555', // Boş mesaj rengi
    },
});

export default AgendaScreen;
