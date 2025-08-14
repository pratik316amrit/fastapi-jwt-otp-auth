import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Register from './pages/Register';
import Verify from './pages/Verify';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

export default function App(){
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md px-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold">Auth Flow</h1>
          <p className="text-gray-500">Register • Verify • Login • Reset</p>
        </div>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
        <div className="mt-6 text-center text-sm text-gray-600">
          <Link className="mx-2 text-blue-600" to="/">Register</Link>|
          <Link className="mx-2 text-blue-600" to="/verify">Verify</Link>|
          <Link className="mx-2 text-blue-600" to="/login">Login</Link>|
          <Link className="mx-2 text-blue-600" to="/forgot-password">Forgot</Link>
        </div>
      </div>
    </div>
  );
}
