import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/controller/ProtectedRoute";
import UnProtectedRoute from "./components/controller/UnProtectedRoute";
import Logout from "./components/Logout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route
            exact
            path="/login"
            element={
              <UnProtectedRoute>
                <Login />
              </UnProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <UnProtectedRoute>
                <SignUp />
              </UnProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
