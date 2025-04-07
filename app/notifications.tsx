import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import { getItems, deleteItem } from '../store/db';
import { SchedulableTriggerInputTypes } from 'expo-notifications';

async function registerNotificationCategories() {
    await Notifications.setNotificationCategoryAsync('task_reminder', [
        {
            identifier: 'SHOW_TASK',
            buttonTitle: 'Show',
            options: { opensAppToForeground: true },
        },
        {
            identifier: 'DELETE_TASK',
            buttonTitle: 'Delete',
            options: { isDestructive: true }
        },
    ]);
}

async function scheduleTaskNotifications() {
    const tasks = await getItems();
    const now = Date.now();

    tasks.forEach(async (task) => {
        const deadlineTime = new Date(task.date).getTime();

        const reminders = [
            { time: deadlineTime - 12 * 60 * 60 * 1000, message: `12 hours left until the deadline of your task: ${task.title} ⏳` },
            { time: deadlineTime - 1 * 60 * 60 * 1000, message: `1 hour left until the deadline of your task: ${task.title} ⏳` },
        ];

        reminders.forEach(async ({ time, message }) => {
            if (time > now) {
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: 'Reminder!',
                        body: message,
                        categoryIdentifier: 'task_reminder',
                        data: { id: task.id },
                    },
                    trigger: { 
                        type: SchedulableTriggerInputTypes.TIME_INTERVAL,
                        seconds: Math.floor((time - now) / 1000),
                    },
                });
            }
        });
    });
}

export function useNotifications() {
    useEffect(() => {
        async function setupNotifications() {
            const { status } = await Notifications.getPermissionsAsync();
            if (status !== 'granted') {
                await Notifications.requestPermissionsAsync();
            }
            await registerNotificationCategories();
            await scheduleTaskNotifications();
        }

        setupNotifications();
    }, []);
}

export function useNotificationResponse() {
    useEffect(() => {
        const subscription = Notifications.addNotificationResponseReceivedListener(response => {
            const actionId = response.actionIdentifier;
            const taskId = response.notification.request.content.data?.id;

            if (actionId === 'SHOW_TASK') {
                console.log('Відкриття додатку для перегляду завдання', taskId);
            } else if (actionId === 'DELETE_TASK') {
                console.log('Видалення завдання', taskId);
                if (taskId) {
                    deleteItem(taskId);
                }
            }
        });

        return () => subscription.remove();
    }, []);
}
