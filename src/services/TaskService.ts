import axios from 'axios';
import { Task } from '../interfaces/task';

const api = axios.create({
    baseURL: 'http://localhost:3001',
});

export const getTasks = async () => {
    const response = await api.get('/tasks');
    return response.data;
};

export const createTask = async (task: Omit<Task, 'id' | 'createdAt'>) => {
    const taskWithCreationDate = {
        ...task,
        createdAt: new Date().toISOString(), // Adiciona a data e hora atuais
    };
    const response = await api.post('/tasks', taskWithCreationDate);
    return response.data;
};


export const updateTask = async (task: Task) => {
    const response = await api.put(`/tasks/${task.id}`, task);
    return response.data;
};

export const deleteTask = async (id: number) => {
    await api.delete(`/tasks/${id}`);
};
