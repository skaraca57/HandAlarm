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
import { useFocusEffect } from '@react-navigation/native';

type AgendaScreenRouteProp = RouteProp<TabParamList, 'Agenda'>;

interface Props {
    route: AgendaScreenRouteProp;
}

const AgendaScreen: React.FC<Props> = ({ route }) => {
    const [alarms, setAlarms] = useState<Alarm[]>([]);


    useFocusEffect(
        React.useCallback(() => {
            const fetchAlarms = async () => {
                const savedAlarms = await loadAlarms();
                console.log('Loaded Alarms on Focus:', savedAlarms);
                setAlarms(savedAlarms || []);
            };

            fetchAlarms();
        }, [])
    );


    const deleteAlarm = (id: string) => {
        Alert.alert(
            'Delete Alarm',
            'Are you sure you want to delete this alarm?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {

                        const updatedAlarms = alarms.filter((alarm) => alarm.id !== id);

                        await saveAlarms(updatedAlarms);

                        setAlarms(updatedAlarms);

                        Alert.alert('Deleted', 'The alarm has been deleted.');
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const renderAlarm = ({ item }: { item: Alarm }) => (
        <TouchableOpacity
            style={styles.alarmContainer}
            onLongPress={() => deleteAlarm(item.id)}
        >
            <Text style={styles.jobText}>{item.job}</Text>
            <Text style={styles.timeText}>{item.time}</Text>
            <Text style={styles.dateText}>{item.date}</Text>
        </TouchableOpacity>
    );

    return (
        <ImageBackground
            source={{
                uri: 'https://img.freepik.com/premium-photo/blank-clipboard-surrounded-by-stationery_640251-121052.jpg',
            }}
            style={styles.background}
        >
            <FlatList
                data={alarms}
                keyExtractor={(item) => item.id}
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
        resizeMode: 'cover',
    },
    listContainer: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    alarmContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        marginBottom: 15,
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    jobText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4A4A4A',
        marginBottom: 5,
    },
    timeText: {
        fontSize: 16,
        color: '#7E4100FF',
        marginBottom: 5,
        fontWeight: 'bold',
    },
    dateText: {
        fontSize: 16,
        color: '#7E4100FF',
        fontWeight: 'bold',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: '#555',
    },
});

export default AgendaScreen;
