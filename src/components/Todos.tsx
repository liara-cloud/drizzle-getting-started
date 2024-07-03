// src/components/Todos.tsx
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

  const activeTodos = todos.filter(todo => !todo.done);
  const doneTodos = todos.filter(todo => todo.done);

  return (
    <div>
      <AddTodo onAdd={fetchTodos} />
      <h2>Active Todos</h2>
      <div>
        {activeTodos.map((todo) => (
          <Todo key={todo.id} todo={todo} onUpdate={fetchTodos} onDelete={fetchTodos} />
        ))}
      </div>
      <h2>Done Todos</h2>
      <div>
        {doneTodos.map((todo) => (
          <Todo key={todo.id} todo={todo} onUpdate={fetchTodos} onDelete={fetchTodos} />
        ))}
      </div>
    </div>
  );
};

export default Todos;
