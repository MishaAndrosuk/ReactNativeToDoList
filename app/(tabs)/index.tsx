import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react'

const Index = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📌 To-Do List</Text>
    <Text style={styles.subtitle}>Organize your day with ease!</Text>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
