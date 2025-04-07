import * as SQLite from 'expo-sqlite';
import { Task } from '../models/tasks';

export const db = SQLite.openDatabaseSync('tasks.db');

async function init() {
    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY NOT NULL, 
            title TEXT NOT NULL,
            date TEXT NOT NULL,
            priority TEXT CHECK(priority IN ('low', 'mid', 'high')) NOT NULL,
            status TEXT CHECK(status IN ('in progress', 'completed')) NOT NULL
        );
        INSERT INTO tasks (id, title, date, priority, status) VALUES (1, 'Meet Lorence', '2025-03-28T12:00:00', 'mid', 'in progress');
        INSERT INTO tasks (id, title, date, priority, status) VALUES (2, 'Call John', '2025-03-28T18:30:00', 'low', 'in progress');
        INSERT INTO tasks (id, title, date, priority, status) VALUES (3, 'Submit report', '2025-04-04T10:00:00', 'high', 'in progress');
        INSERT INTO tasks (id, title, date, priority, status) VALUES (4, 'Team meeting', '2025-04-15T09:00:00', 'mid', 'in progress');
        INSERT INTO tasks (id, title, date, priority, status) VALUES (5, 'Doctor appointment', '2025-05-01T11:00:00', 'low', 'in progress');
    `);
}

async function addItem(title: string, date: Date, priority: 'low' | 'mid' | 'high', status: 'in progress' | 'completed') {
    await db.runAsync(`INSERT INTO tasks (title, date, priority, status) VALUES (?, ?, ?, ?);`, 
                      [title, date.toISOString(), priority, status]);
}

async function deleteItem(id: number) {
    await db.runAsync(`DELETE FROM tasks WHERE id = ?;`, [id]);
}

async function updateItem(id: number, title: string, date: Date, priority: 'low' | 'mid' | 'high', status: 'in progress' | 'completed') {
    await db.runAsync(`UPDATE tasks SET title = ?, date = ?, priority = ?, status = ? WHERE id = ?;`, 
                      [title, date.toISOString(), priority, status, id]);
}

async function getItems(): Promise<Task[]> {
    const items = await db.getAllAsync<Task>('SELECT * FROM tasks');
    return items.map(task => ({
        id: task.id,
        title: task.title,
        date: task.date,
        priority: task.priority,
        status: task.status
    }));
}

export { init, addItem, deleteItem, getItems, updateItem }
