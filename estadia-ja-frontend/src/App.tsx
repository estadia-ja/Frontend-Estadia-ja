// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home.tsx';
import { SignUp } from './pages/SignUp/index.tsx';
import { Login } from './pages/Login/index.tsx';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/cadastro' element={<SignUp />} />
    </Routes>
  );
}

export default App;
