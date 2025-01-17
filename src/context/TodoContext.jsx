import { createContext, useState, useEffect } from "react";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const checkReminders = setInterval(() => {
      const now = new Date();
      todos.forEach((todo, index) => {
        if (todo.reminder && new Date(todo.reminder) <= now) {
          alert(`Reminder: ${todo.task} - ${todo.description}`);
          const newTodos = [...todos];
          newTodos[index].reminder = null;
          setTodos(newTodos);
        }
      });
    }, 60000);

    return () => clearInterval(checkReminders);
  }, [todos]);

  const addTask = (task, description, reminder) => {
    const newTask = {
      task,
      description,
      completed: false,
      createdAt: new Date(),
      reminder,
    };
    setTodos([...todos, newTask]);
  };

  const editTask = (index, newTask, newDescription, newReminder) => {
    const newTodos = [...todos];
    newTodos[index] = { ...newTodos[index], task: newTask, description: newDescription, reminder: newReminder };
    setTodos(newTodos);
  };

  const deleteTask = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const toggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index] = { ...newTodos[index], completed: !newTodos[index].completed };
    setTodos(newTodos);
  };

  return (
    <TodoContext.Provider value={{ todos, addTask, editTask, deleteTask, toggleComplete }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
