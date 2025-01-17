import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TodoProvider } from "./context/TodoContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <TodoProvider>
          <App />
        </TodoProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
