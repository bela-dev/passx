import React, { useState } from "react";

import LoginInputField from "./loginInputField";
import LoginCard from "./logincard";

import { isCookieAllowed } from "../../content/cookieManager";

import { login } from "../../content/userManager";
import { getParam, setParam } from "../../globalComponents/globalParams";
import { loadEntries } from "../../content/entryManager";
import { swipeLeft } from "../../globalComponents/animationWrapper";

function handleLogin(data, setError) {
    setParam("loginMessage", null);
    setParam("loginError", null)
    if(data.status.includes("200")) {
        loadEntries(() => {
            if(isCookieAllowed()) {
                swipeLeft("dashboard");
            }else {
                swipeLeft("cookies");

            }
        });
        
    }else {
        setError(data.message);
    }
}

function Login(props) {

    const [error, setError] = useState("");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return <LoginCard
        name="Login"
        error={getParam("loginError") ? getParam("loginError") : error}
        successMessage={getParam("loginMessage")}
        linkTitle="Create new account?"
        linkAddress="register"
        onClick={() => {login(username, password, (data) => {handleLogin(data, setError);})}}
    >
        <LoginInputField name="Username" onChange={setUsername}/>
        <LoginInputField name="Password" onChange={setPassword} password />
    </LoginCard>;

}

export {handleLogin};
export default Login;