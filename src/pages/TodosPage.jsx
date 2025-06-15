import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Link } from 'react-router-dom'

const fetchTodos = async (page) => {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/todos`,
    { params: { _limit: 10, _page: page } }
  )
  return res.data
}

export default function TodosPage() {
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  const {
    data: todos = [],
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ['todos', page],
    queryFn: () => fetchTodos(page),
    keepPreviousData: true,
  })

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) return <p className="p-4">Loading todos...</p>
  if (isError) return <p className="p-4 text-red-500">Error loading todos.</p>

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Todos (Page {page})</h2>
        <Link to="/todos/new" className="btn btn-primary btn-sm">Add Todo</Link>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search todos..."
          className="input input-bordered w-full max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isFetching && <p className="text-gray-500 mb-2">Updating...</p>}

      <ul className="space-y-2">
        {filteredTodos.map(todo => (
          <li key={todo.id} className="p-4 bg-base-100 rounded shadow flex justify-between items-center">
            <span className={todo.completed ? 'line-through text-gray-400' : ''}>
              {todo.title}
            </span>
            <Link to={`/todos/${todo.id}`} className="btn btn-sm btn-outline">View</Link>
          </li>
        ))}
      </ul>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => setPage(old => Math.max(old - 1, 1))}
          disabled={page === 1}
          className="btn btn-sm"
        >
          ← Prev
        </button>
        <button
          onClick={() => setPage(old => old + 1)}
          className="btn btn-sm"
        >
          Next →
        </button>
      </div>
    </div>
  )
}
