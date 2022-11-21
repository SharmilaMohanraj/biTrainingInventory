import React from 'react';
import SignUp from './SignUp';
import UserDashBoard from './UserDashboard';
import { BrowserRouter as Router, Route,Link } from "react-router-dom";
import { Routes } from "react-router-dom";
import Login from './Login';

function Main() {
  return (
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<SignUp />}>
            </Route>
            <Route path="/login" element={<Login />}>
            </Route>
            <Route path="/dashboard" element={<UserDashBoard />}>
            </Route>
          </Routes>
        </div>
      </Router>
    );
}

export default Main;
