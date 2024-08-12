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
import { PlusIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Task } from '../interfaces/Task';

interface AddTaskProps {
    onAdd: (task: Omit<Task, 'id'>) => void;
}

export default function AddTask({ onAdd }: AddTaskProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = () => {
        if (!title || !dueDate) {
            alert('Título e data de vencimento são obrigatórios!');
            return;
        }

        onAdd({ title, description, dueDate, completed: false, createdAt: new Date().toISOString() });
        setTitle('');
        setDescription('');
        setDueDate('');
    };

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="default" className="flex items-center gap-2 flex-row">
                    <PlusIcon size={18} />
                    Adicionar Task
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Adicionar Task</DrawerTitle>
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
                            <Button onClick={handleSubmit}>Adicionar</Button>
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
