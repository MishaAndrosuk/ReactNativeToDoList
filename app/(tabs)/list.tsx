import { View, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import ToDoList from '../../components/ToDoList';
import React, { useEffect, useState } from 'react'

import { drizzle } from 'drizzle-orm/expo-sqlite';
import { tasksTable } from '../../store/schema';
import { init, getItems } from '../../store/db';
import { useSQLiteContext } from 'expo-sqlite';

import * as schema from '../../store/schema';

import { Task } from '../../models/tasks';

const List = () => {
    const db = drizzle(useSQLiteContext(), { schema });

    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        init();
        loadItems();
        console.log('tasks:', tasks);
    }, []);

    const loadItems = async () => {
        try {
            const items = await getItems();
            console.log('items from getItems:', items);
    
            const tasksWithDate = items.map(item => ({
                ...item,
                date: new Date(item.date),
            }));
    
            setTasks(tasksWithDate);
        } catch (error) {
            console.error('Error loading items:', error);
        }
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safe}>
                <ToDoList tasks={tasks} />
            </SafeAreaView>
        </View>
    )
}

export default List

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    safe: { marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, flex: 1 },
});