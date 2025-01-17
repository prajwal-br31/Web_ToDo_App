import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import Login from "./components/Login.jsx";
import TodoForm from "./components/TodoForm.jsx";



const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/todo"
        element={isAuthenticated ? <TodoForm /> : <Navigate to="/" />}
      />
    </Routes>
  );
};

export default App;
