import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Task } from '../models/tasks';

interface ToDoListProps {
  tasks: Task[];
}

export default function ToDoList({ tasks }: ToDoListProps) {
  const [taskList, setTasks] = useState<Task[]>(tasks);
  const today = new Date();

  useEffect(() => {
    const updatedTasks = tasks.map(task => {
      if (task.date < today && task.status !== 'completed') {
        return { ...task, status: 'completed' as 'completed' };
      }
      return task;
    });
    setTasks(updatedTasks);
  }, [tasks]);

  const toggleTask = (id: number) => {
    setTasks(taskList.map(task =>
      task.id === id ? { ...task, status: task.status === 'in progress' ? 'completed' : 'in progress' } : task
    ));
  };

  const formatDate = (date: Date) => {
    const taskDate = new Date(date);
    const isToday = taskDate.toLocaleDateString() === today.toLocaleDateString();

    if (isToday) {
      return taskDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return taskDate.toLocaleDateString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>To do List</Text>
      <Text style={styles.date}>{today.toLocaleDateString()}</Text>
      <FlatList
        data={taskList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.task} onPress={() => toggleTask(item.id)}>
            <Text style={[styles.taskText, item.status === 'completed' && styles.completed]}>
              {item.status === 'completed' && <AntDesign name="checkcircle" size={16} color="green" />} {item.title}
            </Text>
            <Text style={styles.time}>{formatDate(item.date)}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f1f3f6',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: 6,
  },
  date: {
    fontSize: 16,
    textAlign: 'center',
    color: '#7f8c8d',
    marginBottom: 20,
  },
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  taskText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    flexShrink: 1,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#95a5a6',
  },
  time: {
    fontSize: 14,
    color: '#95a5a6',
    marginLeft: 10,
  },
});
