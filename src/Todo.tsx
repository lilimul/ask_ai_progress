import { useState } from 'react'

type TodoItem = {
  id: number
  text: string
  completed: boolean
}

export default function Todo() {
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [inputValue, setInputValue] = useState('')

  function addTodo() {
    const trimmed = inputValue.trim()
    if (!trimmed) return
    setTodos([...todos, { id: Date.now(), text: trimmed, completed: false }])
    setInputValue('')
  }

  function toggleTodo(id: number) {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  function deleteTodo(id: number) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Todo List</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="添加新任务..."
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
        />
        <button
          onClick={addTodo}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          添加
        </button>
      </div>
      <ul className="space-y-2">
        {todos.map(todo => (
          <li
            key={todo.id}
            className="flex items-center gap-2 p-2 border border-gray-200 dark:border-gray-700 rounded"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="w-5 h-5 cursor-pointer"
            />
            <span
              className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : ''}`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="px-2 py-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-colors"
            >
              删除
            </button>
          </li>
        ))}
      </ul>
      {todos.length === 0 && (
        <p className="text-center text-gray-400 mt-4">暂无任务</p>
      )}
    </div>
  )
}
