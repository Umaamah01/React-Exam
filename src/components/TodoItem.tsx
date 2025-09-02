import React from "react";
import { Link } from "react-router-dom";

// 1. Define the shape of a Todo
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// 2. Define props for the component
interface TodoItemProps {
  todo: Todo;
}

// 3. Use types in the component
export default function TodoItem({ todo }: TodoItemProps): React.ReactElement {
  return (
    <Link to={`/todos/${todo.id}`}>
      <div className="card bg-black shadow-md p-4 hover:shadow-lg transition">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">{todo.title}</h2>
          <input
            type="checkbox"
            className="checkbox checkbox-primary"
            checked={todo.completed}
            readOnly
          />
        </div>
      </div>
    </Link>
  );
}
