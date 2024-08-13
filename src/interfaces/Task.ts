// Interface que representa a estrutura de uma tarefa
export interface Task {
    id: number
    title: string;
    description: string;
    dueDate: string;
    completed: boolean;
    createdAt: string;
}
