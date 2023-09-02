import React from "react";
import {Route, Routes, BrowserRouter, Navigate} from "react-router-dom";

import Login from "./pages/login/login";
import Register from "./pages/login/register";
import Dashboard from "./pages/dashboard/dashboard";
import ErrorPage from "./pages/error/error";

import "./style/colors.css";
import "./style/fonts.css";
import "./style/master.css";
import Settings from "./pages/settings/settings";
import Logout from "./pages/logout/logout";
import Relogin from "./pages/relogin/relogin";
import Cookies from "./pages/cookies/cookies";

import "./style/responsive/smallpc.css";
import "./style/responsive/bigtablet.css";
import "./style/responsive/smalltablet.css";
import "./style/responsive/bigphone.css";
import "./style/responsive/phone.css";
import ChangeAPI from "./pages/changeapi/changeapi";

function App() {

  return (
      <>

          <BrowserRouter basename={"/"}>
              <Routes>
                  <Route path="/" element={<Navigate to={"dashboard"}/>} />

                  <Route path="login" element={<Login/>}/>
                  <Route path="relogin" element={<Relogin/>}/>
                  <Route path="logout" element={<Logout/>}/>
                  <Route path="register" element={<Register/>}/>
                  <Route path="cookies" element={<Cookies/>}/>

                  <Route path="dashboard" element={<Dashboard/>}/>
                  <Route path="dashboard/delete/:id" element={<Dashboard delete/>}/>
                  <Route path="dashboard/edit/:id" element={<Dashboard edit/>}/>
                  <Route path="dashboard/add" element={<Dashboard add/>}/>
                  <Route path="dashboard/export" element={<Dashboard export/>}/>

                  <Route path="settings/:page" element={<Settings/>}/>
                  <Route path="settings/:page/confirm" element={<Settings confirm/>}/>

                  <Route path="error/:error" element={<ErrorPage/>}/>

                  <Route path="change-api" element={<ChangeAPI/>}/>
                  
                  <Route path="*" element={<Navigate to={"error/404"}/>} />
              </Routes>
          </BrowserRouter>
      </>

  );
}

export default App;
