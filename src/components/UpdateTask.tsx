import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { PenIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Task } from '../interfaces/Task';

interface UpdateTaskProps {
    task: Task;
    onUpdate: (task: Task) => void;
}

export default function UpdateTask({ task, onUpdate }: UpdateTaskProps) {
    // Estado local para gerenciar os valores dos campos de edição
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [dueDate, setDueDate] = useState(task.dueDate);

    // Função para lidar com a submissão do formulário
    const handleSubmit = () => {
        if (!title || !dueDate) {
            alert('Título e data de vencimento são obrigatórios!');
            return;
        }

        // Atualiza a tarefa com os novos valores
        onUpdate({ ...task, title, description, dueDate });
    };

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <PenIcon size={18} />
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Atualizar Task</DrawerTitle>
                    </DrawerHeader>

                    <div>
                        <div>
                            <Label>Titulo</Label>
                            <Input placeholder="Titulo da Task" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div>
                            <Label>Descrição</Label>
                            <Textarea className="resize-none" placeholder="Descrição da Task" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div>
                            <Label>Deadline</Label>
                            <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                        </div>
                    </div>

                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button onClick={handleSubmit}>Atualizar</Button>
                        </DrawerClose>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
