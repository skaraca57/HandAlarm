import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

interface Alarm {
    id: string;
    job: string;
    time: string;
    date: string;
}

const AgendaScreen: React.FC = () => {
    const [alarms, setAlarms] = useState<Alarm[]>([
        { id: '1', job: 'Spor', time: '20:00', date: '2024-11-26' },
        { id: '2', job: 'Toplantı', time: '14:30', date: '2024-11-27' },
    ]);

    const renderAlarm = ({ item }: { item: Alarm }) => (
        <View style={styles.alarmContainer}>
            <Text style={styles.alarmText}>
                {item.job} - {item.time} - {item.date}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={alarms}
                keyExtractor={(item) => item.id}
                renderItem={renderAlarm}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    alarmContainer: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    alarmText: {
        fontSize: 16,
    },
});

export default AgendaScreen;
