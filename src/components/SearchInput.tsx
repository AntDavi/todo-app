import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from 'react';

interface SearchInputProps {
    onSearch: (searchTerm: string) => void;
}

export default function SearchInput({ onSearch }: SearchInputProps) {
    const [inputValue, setInputValue] = useState<string>('');

    // Atualiza o estado interno do componente quando o valor do input muda
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    // Chama a função de busca ao clicar no botão
    const handleSearch = () => {
        onSearch(inputValue);
    };

    // Reseta a busca e exibe todas as tarefas quando o input estiver vazio
    const handleResetSearch = () => {
        if (inputValue === '') {
            onSearch('');
        }
    };

    return (
        <div className="flex items-center justify-center flex-row gap-2 w-full max-w-[600px]">
            <Input
                placeholder="Buscar por Task..."
                value={inputValue}
                onChange={handleInputChange}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') handleSearch();
                }}
                onBlur={handleResetSearch}
            />
            <Button size="icon" onClick={handleSearch}>
                <SearchIcon size={18} />
            </Button>
        </div>
    );
}
