import { useEffect, useState } from 'react';
import AddTask from './components/AddTask';
import SearchInput from './components/SearchInput';
import TaskItem from './components/TaskItem';
import { Button } from './components/ui/button';
import DateFilter from './components/DateFilter';
import { Task } from './interfaces/Task';
import { getTasks, createTask, updateTask, deleteTask } from './services/TaskService';

function App() {
  // Estado para armazenar as tarefas
  const [tasks, setTasks] = useState<Task[]>([]);
  // Estado para armazenar o estado de filtro ativo (pendente ou concluído)
  const [filterState, setFilterState] = useState<'pending' | 'completed'>('pending');
  // Estado para armazenar o filtro de deadline (mais próximo ou mais distante)
  const [filterDeadline, setFilterDeadline] = useState<'nearestDeadline' | 'farthestDeadline'>('nearestDeadline');
  // Estado para armazenar o termo de busca
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    // Busca as tarefas quando o componente é montado
    const fetchTasks = async () => {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    };

    fetchTasks();
  }, []);

  // Função para adicionar uma nova tarefa
  const handleAddTask = async (newTask: Omit<Task, 'id'>) => {
    const addedTask = await createTask(newTask);
    setTasks((prevTasks) => [...prevTasks, addedTask]);
  };

  // Função para atualizar uma tarefa existente
  const handleUpdateTask = async (updatedTask: Task) => {
    const updated = await updateTask(updatedTask);
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updated.id ? updated : task))
    );
  };

  // Função para excluir uma tarefa
  const handleDeleteTask = async (taskId: number) => {
    await deleteTask(taskId);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  // Filtra as tarefas com base no estado do filtro ativo
  const filteredTasks = tasks.filter((task) =>
    filterState === 'pending' ? !task.completed : task.completed
  );

  // Filtra as tarefas com base no termo de busca
  const searchedTasks = filteredTasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Ordena as tarefas filtradas com base no filtro de deadline
  const sortedTasks = searchedTasks.slice().sort((a, b) => {
    const dateA = new Date(a.dueDate).getTime();
    const dateB = new Date(b.dueDate).getTime();
    if (filterDeadline === 'nearestDeadline') {
      return dateA - dateB; // Ordem crescente
    } else if (filterDeadline === 'farthestDeadline') {
      return dateB - dateA; // Ordem decrescente
    }
    return 0;
  });

  return (
    <section className="">
      <div className="container py-6">
        {/* ToolBar */}
        <div className="flex items-center justify-between gap-2 flex-col space-y-2 pb-5 border-b border-solid">
          <h1 className='text-2xl font-bold text-primary'>My ToDo-App</h1>
          {/* Busca de Task */}
          <SearchInput onSearch={setSearchTerm} />

          <div className="flex justify-between items-center w-full max-w-[600px] gap-3">
            {/* Filtro de Deadline */}
            <div className='w-full'>
              <DateFilter onFilterChange={setFilterDeadline} />
            </div>
            {/* Filtro de estado */}
            <div className='w-full flex gap-3 justify-end'>
              <Button
                variant='ghost'
                className={filterState === 'pending' ? 'bg-primary text-white' : ''}
                onClick={() => setFilterState('pending')}
              >
                Em Andamento ✍️
              </Button>
              <Button
                variant='ghost'
                className={filterState === 'completed' ? 'bg-primary text-white' : ''}
                onClick={() => setFilterState('completed')}
              >
                Concluídas
              </Button>
            </div>
          </div>
        </div>

        {/* Lista de tarefas */}
        {/* Aqui as tarefas serão renderizadas */}
        <div className="mt-6 pb-10 gap-3 flex items-center justify-center flex-col">
          {sortedTasks.length > 0 ? (
            sortedTasks.map((task) => (
              <TaskItem key={task.id} task={task} onDelete={handleDeleteTask} onUpdate={handleUpdateTask} />
            ))
          ) : searchTerm ? (
            // Estado de Pesquisa Incorreta ou Inconclusiva
            <div className='w-full max-[600px] flex items-center justify-center flex-col h-[300px]'>
              <img src='./assets/empty.svg' alt="No data" className='size-32' />
              <p className='font-semibold text-xl mt-3 text-gray-500'>Nada foi encontrado com esse nome</p>
              <p className='font-medium text-sm text-gray-500'>Tente buscar por outro termo</p>
            </div>
          ) : (
            // Estado de Lista Vazia
            <div className='w-full max-[600px] flex items-center justify-center flex-col h-[300px]'>
              <img src='./assets/empty.svg' alt="No data" className='size-32' />
              <p className='font-semibold text-xl mt-3 text-gray-500'>Você ainda não possui tarefas cadastradas.</p>
              <p className='font-medium text-sm'>Adicione uma nova tarefa para começar!</p>
            </div>
          )}
        </div>

        {/* Formulário para adicionar tarefa */}
        <div className="fixed bottom-5 right-5">
          <AddTask onAdd={handleAddTask} />
        </div>
      </div>
    </section>
  );
}

export default App;
