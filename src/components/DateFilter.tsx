import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface DateFilterProps {
    onFilterChange: (value: 'nearestDeadline' | 'farthestDeadline') => void;
}

export default function DateFilter({ onFilterChange }: DateFilterProps) {
    // Função para lidar com a mudança de filtro
    const handleChange = (value: string) => {
        onFilterChange(value as 'nearestDeadline' | 'farthestDeadline');
    };

    return (
        <Select onValueChange={handleChange}>
            <SelectTrigger className="w-full max-w-[600px]">
                <SelectValue placeholder="Organizar por..." />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Deadline</SelectLabel>
                    <SelectItem value="nearestDeadline">Mais próxima</SelectItem>
                    <SelectItem value="farthestDeadline">Mais distante</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
