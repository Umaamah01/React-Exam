import { Link, NavLink } from "react-router-dom";

export default function Navbar(): React.ReactElement {
  return (
    <div className="navbar bg-base-200 shadow mb-6">
      <div className="flex-1">
        <Link to="/" className="text-xl font-bold px-4">
          TodoApp
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink
              to="/"
              className={({ isActive }: { isActive: boolean }) =>
                isActive ? "active" : ""
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/todos"
              className={({ isActive }: { isActive: boolean }) =>
                isActive ? "active" : ""
              }
            >
              Todos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/todos/new"
              className={({ isActive }: { isActive: boolean }) =>
                isActive ? "active" : ""
              }
            >
              Add Todo
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
