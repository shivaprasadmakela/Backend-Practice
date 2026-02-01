import React from "react";
import AddBook from "./components/AddBook";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoutes";
import Register from "./components/Register";
import Login from "./components/Login";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/books" element={<ProtectedRoute component={AddBook} />} />
      </Routes>
    </Router>
  );
};

export default App;
