// src/components/ErrorBoundary.jsx
export default function ErrorFallBack({ error, resetErrorBoundary }) {
  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold text-red-500 mb-2">Something went wrong!</h2>
      <p className="text-gray-700 mb-4">{error.message}</p>
      <button onClick={resetErrorBoundary} className="btn btn-error">
        Try again
      </button>
    </div>
  );
}
