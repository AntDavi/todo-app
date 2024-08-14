import axios from 'axios';
import MockAdapter from 'jest-mock-axios'; // Corrija a importação para axios-mock-adapter
import { getTasks, createTask, updateTask, deleteTask } from '../services/TaskService';
import { Task } from '../interfaces/Task';

// Crie uma instância do MockAdapter
const mock = new MockAdapter(axios);

// Limpe o mock após cada teste
afterEach(() => {
  mock.reset(); // Certifique-se de que o reset é uma função válida
});

describe('TaskService', () => {
  test('getTasks should fetch tasks from API', async () => {
    const mockTasks: Task[] = [
      {
        id: 1,
        title: 'Test Task',
        description: 'This is a test task',
        dueDate: new Date().toISOString(),
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ];
    mock.onGet('/tasks').reply(200, mockTasks);

    const tasks = await getTasks();
    expect(tasks).toEqual(mockTasks);
  });

  test('createTask should create a new task in the API', async () => {
    const newTask: Omit<Task, 'id' | 'createdAt'> = {
      title: 'New Task',
      description: 'Description for new task',
      dueDate: new Date().toISOString(),
      completed: false,
    };
    const createdTask: Task = {
      id: 1,
      ...newTask,
      createdAt: new Date().toISOString(),
    };
    mock.onPost('/tasks', newTask).reply(201, createdTask);

    const task = await createTask(newTask);
    expect(task).toEqual(createdTask);
  });

  test('updateTask should update an existing task in the API', async () => {
    const updatedTask: Task = {
      id: 1,
      title: 'Updated Task',
      description: 'Updated description',
      dueDate: new Date().toISOString(),
      completed: true,
      createdAt: new Date().toISOString(),
    };
    mock.onPut(`/tasks/${updatedTask.id}`, updatedTask).reply(200, updatedTask);

    const task = await updateTask(updatedTask);
    expect(task).toEqual(updatedTask);
  });

  test('deleteTask should delete a task from the API', async () => {
    mock.onDelete('/tasks/1').reply(200);

    await expect(deleteTask(1)).resolves.toBeUndefined();
  });
});
