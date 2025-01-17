import { useContext, useState } from "react";
import TodoContext from '../context/TodoContext';
import AuthContext from '../context/AuthContext';

const TodoForm = () => {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editTask, setEditTask] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [reminder, setReminder] = useState("");
  const [editReminder, setEditReminder] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const { todos, addTask, editTask: updateTask, deleteTask, toggleComplete } = useContext(TodoContext);
  const { logout } = useContext(AuthContext);

  const handleAddTask = () => {
    if (task.trim() && description.trim()) {
      addTask(task, description, reminder);
      setTask("");
      setDescription("");
      setReminder("");
    }
  };

  const handleEditTask = (index) => {
    setEditIndex(index);
    setEditTask(todos[index].task);
    setEditDescription(todos[index].description);
    setEditReminder(todos[index].reminder ? 
      new Date(todos[index].reminder).toISOString().slice(0, 16) 
      : 
      "");
  };

  const handleUpdateTask = (index) => {
    if (editTask.trim() && editDescription.trim()) {
      updateTask(index, editTask, editDescription, editReminder);
      setEditIndex(null);
      setEditTask("");
      setEditDescription("");
      setEditReminder("");
    } else {
      alert("Please Enter the Task and description.");
    }
  };

  const handleFilterChange = (filter) => {
    setFilter(filter.target.value);
  };

  const handleSortChange = (sort) => {
    setSortOrder(sort.target.value);
  };

  const handleSearchChange = (search) => {
    setSearchTerm(search.target.value);
  };

  const handleLogout = async () => {
    await logout();
    alert("Logged out successfully!")
    history.push('/login');
  };

  const formatDateTime = (dateTime) => {
    const options = {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateTime).toLocaleDateString('en-GB', options).replace(',', '');
  };

  const filteredTodos = todos.filter((todo) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "completed" && todo.completed) ||
      (filter === "incomplete" && !todo.completed);
    const matchesSearch = todo.task.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const sortedTodos = filteredTodos.sort((a, b) => {
    if (sortOrder === "asc") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Todo List</h2>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
            Log Out
          </button>
        </div>
        <div className="mb-4 flex justify-between items-center space-x-2">
          <select value={filter} onChange={handleFilterChange} className="p-2 border border-gray-300 rounded">
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search tasks"
            className="p-2 border border-gray-300 rounded w-full"
          />
          <select value={sortOrder} onChange={handleSortChange} className="p-2 border border-gray-300 rounded">
            <option value="asc">Sort by Date: Ascending</option>
            <option value="desc">Sort by Date: Descending</option>
          </select>
        </div>
        <div className="mb-4 h-64 overflow-y-auto">
          <ul>
            {sortedTodos.map((todo, index) => (
              <li
                key={index}
                className={`border-b p-2 flex justify-between items-center ${todo.completed ? "bg-gray-200 opacity-75" : ""}`}
              >
                <div className="flex-1 flex items-center">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(index)}
                    className="mr-2 h-5 w-5 text-blue-500 focus:ring-blue-400 transition duration-200 ease-in-out transform hover:scale-110"
                  />
                  {editIndex === index ? (
                    <div className="flex flex-col w-full">
                      <input
                        type="text"
                        value={editTask}
                        onChange={(e) => setEditTask(e.target.value)}
                        className="p-2 border border-gray-300 rounded mb-2"
                      />
                      <input
                        type="text"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="p-2 border border-gray-300 rounded mb-2"
                      />
                      <input
                        type="datetime-local"
                        value={editReminder}
                        onChange={(e) => setEditReminder(e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                      />
                    </div>
                  ) : (
                    <div>
                      <span className={`${todo.completed ? "font-bold" : ""}`}>{todo.task}</span>
                      <p className="text-sm text-gray-600">{todo.description}</p>
                      <p className="text-xs text-gray-500">Created on: {formatDateTime(todo.createdAt)}</p>
                      {todo.reminder && (
                        <p className="text-xs text-red-500">
                          To be completed by: {new Date(todo.reminder).toLocaleString()}
                        </p>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex-shrink-0 ml-2">
                  {editIndex === index ? (
                    <button
                      onClick={() => handleUpdateTask(index)}
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      Save
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditTask(index)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTask(index)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-2"
            placeholder="Task"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-2"
            placeholder="Description"
          />
          <input
            type="datetime-local"
            value={reminder}
            onChange={(e) => setReminder(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <button onClick={handleAddTask} className="w-full bg-blue-500 text-white py-2 rounded">Add Task</button>
        </div>
      </div>
    </div>
  );
};

export default TodoForm;
