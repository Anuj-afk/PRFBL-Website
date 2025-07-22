import React from 'react'
import { Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import Admin from './pages/Admin';

function App() {

  
  return (
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/admin" element={<Admin></Admin>}></Route>
    </Routes>
  )
}

export default App