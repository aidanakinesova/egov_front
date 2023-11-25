import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppContainer, Login, PersonalAccount, Register, Applications } from "./components";
import { Home } from "./pages";
import "./styles/globals.scss";


export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppContainer />}>
          <Route index element={<Login />}></Route>
          <Route path="/main" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/personal-account" element={<PersonalAccount />}></Route>
          <Route path="/applications" element={<Applications />}></Route>
        </Route> 
      </Routes>
    </BrowserRouter>
  );
};
