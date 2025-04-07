import React from 'react';
import { View, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import CreateTaskForm from '../../components/CreateTaskForm';

export default function Create() {
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safe}>
                <CreateTaskForm />
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    safe: { marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, flex: 1 },
});