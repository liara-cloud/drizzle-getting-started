import { TodoType } from '@/schema';

interface TodoProps {
  todo: TodoType;
}

const Todo = ({ todo }: TodoProps) => {
  return (
    <div>
      <span>{todo.text}</span>
    </div>
  );
};

export default Todo;
