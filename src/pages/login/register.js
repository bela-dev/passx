import React, { useState, useRef, useEffect } from "react";

import {Navigate} from 'react-router-dom';

import DefaultWrapper from "../../globalComponents/defaultWrapper";

import LoginWrapper from "./loginWrapper";
import LoginInputField from "./loginInputField";
import DefaultButton from "../../globalComponents/defaultButton";
import LoginCard from "./logincard";

import { useNavigate } from 'react-router-dom';

import { register } from "../../content/userManager";
import { setParam } from "../../globalComponents/globalParams";

function Register(props) {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [email, setEmail] = useState("");
    
    const [error, setError] = useState("");

    const [animationout, setAnimationout] = useState(false);

    function handleRegister(data) {
        if(data.status.includes("201")) {
            setParam("loginUsername", username);
            setAnimationout(true);
            setTimeout(() => navigate("/login"), 100);
        }else {
            setError(data.message);
        }
    }
    

    return <LoginCard
        name="Register"
        error={error}
        linkTitle="Already have an account?"
        linkAddress="login"
        onClick={() => {register(username, email, password, repeatPassword, handleRegister)}}
        animationout={animationout}
    >
        <LoginInputField name="Username" onChange={setUsername}/>
        <LoginInputField name="Email" onChange={setEmail}/>
        <LoginInputField password name="Password" onChange={setPassword}/>
        <LoginInputField password name="Repeat Password" onChange={setRepeatPassword}/>
    </LoginCard>;

}

export default Register;