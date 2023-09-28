import React, { useEffect, useState } from "react";

import LoginInputField from "./loginInputField";
import LoginCard from "./logincard";

import { isCookieAllowed } from "../../content/cookieManager";

import { getPasswordTest, login } from "../../content/userManager";
import { getParam, setParam } from "../../globalComponents/globalParams";
import { loadEntries } from "../../content/entryManager";
import { swipeLeft } from "../../globalComponents/animationWrapper";
import { is2FAActivated } from "../../content/2faManager";

function handleEntryLoading() {
    loadEntries(() => {
        if(isCookieAllowed()) {
            swipeLeft("dashboard");
        }else {
            swipeLeft("cookies");
        }
    });
}

var alreadySent = false;

function handleLogin(data, setError) {
    setParam("loginMessage", null);
    setParam("loginUsername", null);
    setParam("loginError", null);
    if(data.status.includes("200")) {
        if(alreadySent) return;
        alreadySent = true;
        if(data.twofa) {
            swipeLeft("2fa");
        }else {
            handleEntryLoading();
        }
        
        
    }else {
        setError(data.message);
    }
}

function Login(props) {

    const [loginMessage, setLoginMessage] = useState(getParam("loginMessage"));

    const [error, setError] = useState("");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if(getParam("loginUsername")) {
            setLoginMessage("Welcome " + getParam("loginUsername"));
        }
    });

    return <LoginCard
        name="Login"
        error={getParam("loginError") ? getParam("loginError") : error}
        successMessage={loginMessage}
        linkTitle="Create new account?"
        linkAddress="register"
        onClick={() => {login(username, password, (data) => {handleLogin(data, setError);})}}
    >
        <LoginInputField name="Username" onChange={setUsername} defaultValue={getParam("loginUsername") ? getParam("loginUsername") : ""}/>
        <LoginInputField name="Password" onChange={setPassword} password />
    </LoginCard>;

}

export {handleLogin, handleEntryLoading};
export default Login;