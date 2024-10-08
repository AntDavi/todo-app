import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "./ui/drawer";
import { PlusIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Task } from "../interfaces/Task";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { toast } from 'sonner';

// Definindo o esquema de validação com Zod
const formSchema = z.object({
    title: z.string().min(1, { message: "O título é obrigatório." }),
    description: z.string().optional(),
    dueDate: z.string().min(1, { message: "A data de vencimento é obrigatória." }),
});

type FormData = z.infer<typeof formSchema>;

interface AddTaskProps {
    onAdd: (task: Omit<Task, "id">) => void;
}

export default function AddTask({ onAdd }: AddTaskProps) {
    // Configuração do formulário com validação
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            dueDate: "",
        },
    });

    // Função para submeter o formulário
    const onSubmit = async (data: FormData) => {
        // Adiciona a tarefa e aguarda a conclusão
        await onAdd({
            title: data.title, // Garante que title seja passado
            description: data.description ?? "", // Garante que a descrição seja uma string
            dueDate: data.dueDate, // Garante que dueDate seja passado
            completed: false,
            createdAt: new Date().toISOString(),
        });

        // Exibe o toast após a tarefa ser adicionada com sucesso
        toast("Tarefa adicionada à lista! ✅");

        // Limpa o formulário após a submissão
        form.reset();
    };

    // Função para lidar com o fechamento do Drawer
    const handleDrawerClose = () => {
        form.reset(); // Limpa o formulário ao fechar o Drawer
    };

    return (
        <Drawer onClose={handleDrawerClose}>
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

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <FormLabel>Titulo</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Titulo da Task" {...field} />
                                        </FormControl>
                                        <FormMessage>{fieldState.error?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Descrição</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                className="resize-none"
                                                placeholder="Descrição da Task"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="dueDate"
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <FormLabel>Deadline</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage>{fieldState.error?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />

                            <DrawerFooter>
                                <Button type="submit">Adicionar</Button>
                                <DrawerClose asChild>
                                    <Button variant="outline" onClick={handleDrawerClose}>
                                        Cancelar
                                    </Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </form>
                    </Form>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
