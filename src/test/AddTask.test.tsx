//Certifique-se de que, ao submeter o formulário, a função onAdd é chamada com os dados corretos.
//Ainda em estudo para melhoria do código.

import { render, screen, fireEvent } from '@testing-library/react';
import AddTask from '../components/AddTask';

test('should call onAdd with correct values on form submit', () => {
    const mockOnAdd = jest.fn();
    render(<AddTask onAdd={mockOnAdd} />);

    fireEvent.change(screen.getByPlaceholderText('Titulo da Task'), { target: { value: 'Minha Nova Task' } });
    fireEvent.change(screen.getByPlaceholderText('Descrição da Task'), { target: { value: 'Descrição da minha task' } });
    fireEvent.change(screen.getByLabelText('Deadline'), { target: { value: '2024-08-15' } });

    fireEvent.click(screen.getByText('Adicionar'));

    expect(mockOnAdd).toHaveBeenCalledWith({
        title: 'Minha Nova Task',
        description: 'Descrição da minha task',
        dueDate: '2024-08-15',
        completed: false,
        createdAt: expect.any(String),
    });
});
