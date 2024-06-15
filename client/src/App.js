import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Main from './components/Main';
import Signup from './components/Signup';
import Login from './components/Login';
import HealthProfileForm from './components/HealthProfileForm';
import EditHealthProfileForm from './components/EditHealthProfileForm';
import AllRemainder from './components/AllRemainder';
import AddRemainder from './components/AddRemainder';

function App() {
  const user = localStorage.getItem("token");

  return (
    <Routes>
      {/* Route for Main component */}
      {user ? (
        <Route path="/" element={<Main />} />
      ) : (
        <Route path="/" element={<Navigate replace to="/login" />} />
      )}

      {user ? (
        <Route path="/all-remainder" element={<AllRemainder />} />
      ) : (
        <Route path="/all-remainder" element={<Navigate replace to="/login" />} />
      )}

      {user ? (
        <Route path="/add-remainder" element={<AddRemainder />} />
      ) : (
        <Route path="/add-remainder" element={<Navigate replace to="/login" />} />
      )}

      {/* Route for Signup component */}
      <Route path="/signup" element={<Signup />} />

      {/* Route for Login component */}
      <Route path="/login" element={<Login />} />

      {/* Route for HealthProfileForm component */}
      {user ? (
        <Route path="/health-profile" element={<HealthProfileForm />} />
      ) : (
        <Route path="/health-profile" element={<Navigate replace to="/login" />} />
      )}

      {user ? (
        <Route path="/edit-health-profile" element={<EditHealthProfileForm />} />
      ) : (
        <Route path="/edit-health-profile" element={<Navigate replace to="/login" />} />
      )}

      {/* Redirect to login if not logged in */}
      {!user && <Route path="*" element={<Navigate replace to="/login" />} />}
    </Routes>
  );
}

export default App;
