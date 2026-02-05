import React from "react";
import { BrowserRouter as Router , Routes , Route , Navigate } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage.jsx"
import RegisterPage from "./pages/Auth/RegisterPage.jsx"

export default function App() {

  const isAuthenticated = false;
  const loading = false;

  if(loading) {
    return (
      <div className="">
        <p>Loading ...</p>
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}/>
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
      </Routes>
    </Router>
  )
}
