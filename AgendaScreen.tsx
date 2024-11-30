// AgendaScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { TabParamList, Alarm } from './navigationTypes';

type AgendaScreenRouteProp = RouteProp<TabParamList, 'Agenda'>;

interface Props {
    route: AgendaScreenRouteProp;
}

const AgendaScreen: React.FC<Props> = ({ route }) => {
    const [alarms, setAlarms] = useState<Alarm[]>(route.params?.alarms || []);

    useEffect(() => {
        if (route.params?.alarms) {
            setAlarms(route.params.alarms);
        }
    }, [route.params]);

    const renderAlarm = ({ item }: { item: Alarm }) => (
        <View style={styles.alarmContainer}>
            <Text style={styles.alarmText}>{`${item.job} - ${item.time} - ${item.date}`}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={alarms}
                keyExtractor={(item, index) => index.toString()}
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
