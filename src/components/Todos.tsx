import { useState, useEffect } from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';
import { TodoType } from '@/schema';

const Todos = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);

  const fetchTodos = async () => {
    const res = await fetch('/api/todos');
    const data: TodoType[] = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <AddTodo onAdd={fetchTodos} />
      <div>
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default Todos;
