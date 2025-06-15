import { Link } from 'react-router-dom'

export default function TodoItem({ todo }) {
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
  )
}
