import { CalendarIcon } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Task } from '../interfaces/Task';
import { toast } from 'sonner';
import UpdateTask from './UpdateTask';
import { ConfirmDeletion } from './ConfirmDeletion';

interface TaskItemProps {
    task: Task;
    onDelete: (id: number) => void;
    onUpdate: (task: Task) => void;
}

export default function TaskItem({ task, onDelete, onUpdate }: TaskItemProps) {
    // Função para lidar com a alteração do estado de conclusão da tarefa
    const handleCheckboxChange = () => {
        onUpdate({ ...task, completed: !task.completed });
    };

    // Função para formatar a data de criação
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    };

    return (
        <Card className='w-full max-w-[600px]'>
            <CardContent className='h-full min-h-[150px]'>
                <CardHeader className='px-0'>
                    <div className='flex items-center justify-between'>
                        <CardTitle>{task.title}</CardTitle>

                        {/* Checkbox para marcar a tarefa como concluída */}
                        {!task.completed && (
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={handleCheckboxChange}
                                onClick={() => toast("Tarefa concluída! ✅")}
                            />
                        )}
                    </div>
                    <p className='font-semibold text-gray-500'>Deadline: <span className='text-gray-700'>{task.dueDate}</span></p>
                </CardHeader>
                <p>{task.description}</p>
            </CardContent>
            <CardFooter className='flex justify-between items-center'>
                {/* Exibição da data de criação da tarefa */}
                <div className='gap-2 flex items-center text-gray-500'>
                    <CalendarIcon size={18} />
                    <span className='font-semibold'>{formatDate(task.createdAt)}</span>
                </div>
                <div className='flex items-center gap-2'>
                    {/* Botão para editar a tarefa */}
                    {!task.completed && (
                        <Button variant='default' size='icon'>
                            <UpdateTask task={task} onUpdate={onUpdate} />
                        </Button>
                    )}
                    {/* Botão para deletar a tarefa */}
                    <ConfirmDeletion taskId={task.id} onDelete={onDelete}/>
                </div>
            </CardFooter>
        </Card>
    );
}
