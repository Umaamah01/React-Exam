import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export default function TodoDetail(): React.ReactElement {
  const { id } = useParams<{ id: string }>(); // ✅ params are strings
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch a single todo
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
      console.log("📦 Loaded todo:", res.data);
      return res.data;
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async () =>
      axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`),
    onSuccess: () => {
      console.log(`🗑️ Deleted todo with id: ${id}`);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      alert("✅ Todo deleted successfully");
      navigate("/todos");
    },
    onError: (error) => {
      console.error("❌ Error deleting todo:", error);
      alert("❌ Failed to delete todo");
    },
  });

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this todo?")) {
      console.log("🧹 Deleting todo with id:", id);
      deleteMutation.mutate();
    }
  };

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (isError) return <p className="p-4 text-red-500">Failed to load todo</p>;
  if (!todo) return <p className="p-4 text-gray-500">Todo not found</p>; // ✅ extra safety

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold">{todo.title}</h2>
      <p>Status: {todo.completed ? "✅ Completed" : "❌ Not completed"}</p>

      <div className="flex gap-4 mt-4">
        <Link to={`/todos/${id}/edit`} className="btn btn-outline btn-sm">
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="btn btn-error btn-sm"
          disabled={deleteMutation.isPending}
        >
          {deleteMutation.isPending ? "Deleting..." : "Delete"}
        </button>
        <Link to="/todos" className="btn btn-ghost btn-sm">
          ← Back
        </Link>
      </div>
    </div>
  );
}
