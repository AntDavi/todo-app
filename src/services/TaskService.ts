import axios from 'axios';
import { Task } from '../interfaces/Task';

// Cria uma instância do axios com uma URL base para as requisições
const api = axios.create({
    baseURL: 'http://localhost:3001',
});

// Função para obter todas as tarefas da API
export const getTasks = async () => {
    const response = await api.get('/tasks'); // Faz uma requisição GET para '/tasks'
    return response.data; // Retorna os dados da resposta
};

// Função para criar uma nova tarefa na API
export const createTask = async (task: Omit<Task, 'id' | 'createdAt'>) => {
    const taskWithCreationDate = {
        ...task,
        createdAt: new Date().toISOString(), // Adiciona a data e hora atuais
    };
    const response = await api.post('/tasks', taskWithCreationDate); // Faz uma requisição POST para criar a tarefa
    return response.data; // Retorna os dados da tarefa criada
};

// Função para atualizar uma tarefa existente na API
export const updateTask = async (task: Task) => {
    const response = await api.put(`/tasks/${task.id}`, task); // Faz uma requisição PUT para atualizar a tarefa
    return response.data; // Retorna os dados da tarefa atualizada
};

// Função para excluir uma tarefa da API
export const deleteTask = async (id: number) => {
    await api.delete(`/tasks/${id}`); // Faz uma requisição DELETE para remover a tarefa
};
