import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { TrashIcon } from "lucide-react"
import { useState } from "react";

interface ConfirmDeletionProps {
    taskId: number;
    onDelete: (id: number) => void;
}

export function ConfirmDeletion({ taskId, onDelete }: ConfirmDeletionProps) {
    // Estado local para controlar a abertura do diálogo
    const [isOpen, setIsOpen] = useState(false);

    // Função para lidar com a deleção da tarefa
    const handleDelete = () => {
        onDelete(taskId);
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant='destructive' size='icon' >
                    <TrashIcon size={18} />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Deseja Excluir essa Task?</DialogTitle>
                    <DialogDescription>
                        Ela será permanente e não poderá ser recuperada.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex gap-3 items-center justify-between flex-row">
                    <DialogClose asChild className="w-full">
                        <Button type="submit" >Cancelar</Button>
                    </DialogClose>
                    <Button variant='destructive' className="w-full" onClick={handleDelete}>Excluir</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
