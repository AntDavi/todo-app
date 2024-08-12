import { CalendarIcon, TrashIcon } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Task } from '../interfaces/Task';
import { toast } from 'sonner';
import UpdateTask from './UpdateTask';

interface TaskItemProps {
    task: Task;
    onDelete: (id: number) => void;
    onUpdate: (task: Task) => void;
}

export default function TaskItem({ task, onDelete, onUpdate }: TaskItemProps) {
    const handleCheckboxChange = () => {
        onUpdate({ ...task, completed: !task.completed });
    };

    // Formata a data de criação para um formato legível
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

                        {/* Checkbox ao marcada muda o status da Task de false para true */}
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
                {/* Data de criação */}
                <div className='gap-2 flex items-center text-gray-500'>
                    <CalendarIcon size={18} />
                    <span className='font-semibold'>{formatDate(task.createdAt)}</span> {/* Aqui você pode ajustar para mostrar a data de criação real */}
                </div>
                <div className='flex items-center gap-2'>
                    {/* Editar Task */}
                    {!task.completed && (
                        <Button variant='default' size='icon'>
                            <UpdateTask task={task} onUpdate={onUpdate} />
                        </Button>
                    )}
                    {/* Deletar Task do Banco de dados */}
                    <Button variant='destructive' size='icon' onClick={() => onDelete(task.id)}>
                        <TrashIcon size={18} />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
