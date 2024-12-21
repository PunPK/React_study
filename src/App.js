import "./App.css";
import axios from "axios";
import { useState } from "react";
import LoginScreen from "./display/LoginScreen";
import EditPage from "./display/EditPage";
import HomePage from "./display/Home";
import UserPage from "./display/User";
import { CostGraph } from "./display/CostGraph";
import { Dashboard } from "./display/dashborad";
import Signup from "./display/Signup";
import Bar from "./components/Navbar";
// import { NavLink } from "react-router";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";

axios.defaults.baseURL =
  process.env.REACT_APP_BASE_URL || "http://localhost:1337";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => setIsAuthenticated(true);
  const handleLogout = () => {
    setIsAuthenticated(false);
  };
  // const Router = useRoutes([
  //   {
  //     path: "/",
  //     element: <HomePage />,
  //   },
  //   {
  //     path: "/login",
  //     element: <LoginScreen />,
  //   },
  // ]);
  // }

  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route
              path="/signup"
              element={
                !isAuthenticated ? <Signup /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <HomePage />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <HomePage />
                ) : (
                  <LoginScreen onLoginSuccess={handleLoginSuccess} />
                )
              }
            />

            <Route
              path="/Editdata"
              element={
                isAuthenticated ? (
                  <EditPage />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route
              path="/dashboard"
              element={
                isAuthenticated ? (
                  <Dashboard />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route
              path="/costgraph"
              element={
                isAuthenticated ? (
                  <CostGraph />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route
              path="/user"
              element={
                isAuthenticated ? (
                  <UserPage />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
          <div></div>
          <div>
            {isAuthenticated ? (
              <Bar onLogout={handleLogout} isAuthenticated={isAuthenticated} />
            ) : (
              <Navigate to="/login" />
            )}
          </div>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
