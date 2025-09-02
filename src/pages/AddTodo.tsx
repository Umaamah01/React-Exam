import React, { useState, FormEvent, ChangeEvent } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

// Define Todo type
interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export default function AddTodo(): React.ReactElement {
  const [title, setTitle] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]); // Local todos state

  const addTodoMutation = useMutation({
    mutationFn: (newTodo: Omit<Todo, "id">) =>
      axios.post<Todo>("https://jsonplaceholder.typicode.com/todos", newTodo),
    onSuccess: (data) => {
      setTodos((prev) => [...prev, data.data]); // Append new todo
      setTitle(""); // Clear input
    },
    onError: () => {
      alert("❌ Failed to add todo");
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTodoMutation.mutate({
      title,
      completed: false,
      userId: 1,
    });
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Add New Todo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Todo title"
          className="input input-bordered w-full"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          required
        />
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={addTodoMutation.isPending}
        >
          {addTodoMutation.isPending ? "Adding..." : "Add Todo"}
        </button>
      </form>

      {/* ✅ Render the list of added todos */}
      {todos.length > 0 && (
        <ul className="mt-6 list-disc list-inside space-y-2">
          {todos.map((todo) => (
            <li key={todo.id}>
              <strong>{todo.title}</strong> — {todo.completed ? "✅" : "❌"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
