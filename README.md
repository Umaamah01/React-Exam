# My Todo App

This is a modern React Todo app with error boundaries and API integration. This project demonstrates modern React patterns, API integration, routing, and error boundaries.

---

## 🚀 Features

- ✅ View paginated list of todos from an API
- ➕ Add new todos
- 📝 Edit existing todos
- 🔍 Search todos by title
- ❌ Handle 404 routes with a custom Not Found page
- 🛠 Error boundaries with reset
- 💅 Modern and accessible UI with DaisyUI
- 🔗 Nested and dynamic routes

---

## 📸 Screenshot

![App Screenshot](./assets/Screenshot.png)

---

## 🛠️ Tech Stack

- **React 19+**
- **React Router**
- **TanStack Query**
- **Axios**
- **DaisyUI + TailwindCSS**
- **Lucide React Icons**

---

## 🧱 Project Structure

```
src/
├── components/
│   ├── NavBar.jsx
│   └── ErrorFallBack.jsx
|   |__ TodoItem.jsx
├── pages/
│   ├── TodosPage.jsx
│   ├── TodoDetail.jsx
│   ├── AddTodo.jsx
│   ├── EditTodo.jsx
│   └── NotFound.jsx
├── App.jsx
└── main.jsx
```

---

## 🧪 Error Boundary

When an unexpected error occurs, the `ErrorBoundary` component will catch it and display a fallback UI with an option to retry:

```js
<ErrorBoundary FallbackComponent={ErrorFallBack}>
  <BrowserRouter>
    <NavBar />
    <Routes>...</Routes>
  </BrowserRouter>
</ErrorBoundary>
```

---

## 🔧 Setup & Run

1. **Clone the repository**

```bash
git clone https://github.com/Umaamah01/todo-app.git
cd todo-app
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Run the development server**

```bash
pnpm run dev
```

---

## 🧼 Linting and Formatting

Optional setup with ESLint and Prettier for consistent code formatting.


---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
