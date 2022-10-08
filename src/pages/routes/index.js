import React from "react";

import { Routes, Route } from "react-router-dom";
import Home from "../Home/index";
import Register from "../register/index";
import Admin from '../Admin/admin';

import Private from './Private'

function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />

      <Route path="/admin" element={ <Private > <Admin /> </Private>} />
    </Routes>
  );
}

export default RoutesApp;
