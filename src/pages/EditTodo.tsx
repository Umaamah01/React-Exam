import React, { useState, ChangeEvent, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Todo type
interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}


interface TodoForm {
  title: string;
  completed: boolean;
}

export default function EditTodo(): React.ReactElement {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch the todo
  const {
    data: todo,
    isLoading,
    isError,
  } = useQuery<Todo>({
    queryKey: ["todo", id],
    queryFn: async () => {
      const res = await axios.get<Todo>(
        `https://jsonplaceholder.typicode.com/todos/${id}`
      );
      return res.data;
    },
  });


  const [form, setForm] = useState<TodoForm | null>(null);

  const editTodoMutation = useMutation({
    mutationFn: (updatedTodo: Todo) =>
      axios.put<Todo>(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        updatedTodo
      ),
    onSuccess: (res) => {
      console.log("✅ Todo updated:", res.data);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      queryClient.invalidateQueries({ queryKey: ["todo", id] });
      alert("✅ Todo updated!");
      navigate(`/todos/${id}`);
    },
    onError: (err) => {
      console.error("❌ Failed to update todo:", err);
      alert("❌ Failed to update todo");
    },
  });

  if (isLoading) return <p className="p-4">Loading todo...</p>;
  if (isError) return <p className="p-4 text-red-500">Error loading todo</p>;

  
  if (!form && todo) {
    setForm({
      title: todo.title,
      completed: todo.completed,
    });
    return <p className="p-4">Preparing form...</p>;
  }

  if (!form) return <p className="p-4 text-gray-500">No todo data</p>;

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    setForm((prev) =>
      prev
        ? {
            ...prev,
            [name]: type === "checkbox" ? checked : value,
          }
        : prev
    );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!id) return;

    console.log("✏️ Submitting form:", form);

    editTodoMutation.mutate({
      id: Number(id),
      title: form.title,
      completed: form.completed,
      userId: 1, 
    });
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Todo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          className="input input-bordered w-full"
          value={form.title}
          onChange={handleChange}
          required
        />
        <div className="form-control">
          <label className="label cursor-pointer justify-start gap-2">
            <input
              type="checkbox"
              name="completed"
              className="checkbox"
              checked={form.completed}
              onChange={handleChange}
            />
            <span className="label-text">Completed</span>
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={editTodoMutation.isPending}
        >
          {editTodoMutation.isPending ? "Updating..." : "Update Todo"}
        </button>
      </form>
    </div>
  );
}
