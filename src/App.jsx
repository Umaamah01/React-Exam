import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import TodosPage from './pages/TodosPage'
import TodoDetail from './pages/TodoDetail'
import AddTodo from './pages/AddTodo'
import NotFound from './pages/NotFound'
import EditTodo from './pages/EditTodo'
import NavBar from './components/NavBar'
import ErrorFallBack from './components/ErrorFallBack'

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex items-center justify-center h-[70vh]">
              <h2 className="text-3xl font-bold">Welcome to my Todo App!</h2>
            </div>
          }
        />
        
        {/* ✅ Only wrap TodosPage in ErrorBoundary */}
        <Route
          path="/todos"
          element={
            <ErrorBoundary FallbackComponent={ErrorFallBack}>
              <TodosPage />
            </ErrorBoundary>
          }
        />
        
        <Route path="/todos/new" element={<AddTodo />} />
        <Route path="/todos/:id" element={<TodoDetail />} />
        <Route path="/todos/:id/edit" element={<EditTodo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
