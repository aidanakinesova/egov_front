import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppContainer, Login, PersonalAccount, Register, Applications, DefaultPage, CreateApplication, CreateApplication2_0 } from "./components";
import { Home } from "./pages";
import "./styles/globals.scss";


export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppContainer />}>
          <Route index element={<DefaultPage />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="main" element={<Home />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="personal-account" element={<PersonalAccount />}></Route>
          <Route path="applications" element={<Applications />}></Route>
          <Route path="create-application" element={<CreateApplication />}></Route>
          <Route path="create-application2-0" element={<CreateApplication2_0 />}></Route>
        </Route> 
      </Routes>
    </BrowserRouter>
  );
};
