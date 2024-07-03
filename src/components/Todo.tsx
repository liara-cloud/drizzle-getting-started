import { useState } from 'react';
import { TodoType } from '@/schema';

interface TodoProps {
  todo: TodoType;
  onUpdate: () => void;
  onDelete: () => void;
}

const Todo = ({ todo, onUpdate, onDelete }: TodoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const handleEdit = async () => {
    await fetch('/api/todos', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: todo.id, text, done: todo.done }),
    });
    setIsEditing(false);
    onUpdate();
  };

  const handleToggle = async () => {
    await fetch('/api/todos', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: todo.id, text: todo.text, done: !todo.done }),
    });
    onUpdate();
  };

  const handleDelete = async () => {
    await fetch('/api/todos', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: todo.id }),
    });
    onDelete();
  };

  return (
    <div className="todo-item">
      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      ) : (
        <span className={`todo-text ${todo.done ? 'done' : ''}`}>
          {todo.text}
        </span>
      )}
      <div className="todo-actions">
        {isEditing ? (
          <button onClick={handleEdit}>Save</button>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleToggle}>
              {todo.done ? 'Undone' : 'Done'}
            </button>
            <button onClick={handleDelete}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Todo;
