import { Link } from "react-router-dom";

export default function NotFound(): React.ReactElement {
  return (
    <div className="text-center p-6">
      <h1 className="text-4xl text-red-600 font-bold">404</h1>
      <p className="mb-4">Page not found</p>
      <Link to="/" className="btn btn-outline btn-primary">
        Go Home
      </Link>
    </div>
  );
}
