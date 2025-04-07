export interface Task {
    readonly id: number;
    title: string;
    date: Date;
    priority: 'low' | 'mid' | 'high';
    status: 'in progress' | 'completed';
};