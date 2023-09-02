import React, { useEffect, useState, useRef } from "react";
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";
import { useNavigate } from "react-router-dom";
import { getCookiePasswordLength, getCookieSessionId, getCookieUsername, unstoreUser } from "../../content/cookieManager";
import { delUserInformation, login, user } from "../../content/userManager";

import DefaultWrapper from "../../globalComponents/defaultWrapper";
import { handleLogin } from "../login/login";
import ReloginInput from "./reloginInput";

import { swipeRight } from "../../globalComponents/animationWrapper";

import "./style/relogin.css";
import { getParam, removeParam, setParam } from "../../globalComponents/globalParams";
import ReloginPhoneInput from "./reloginPhoneInput";

function Relogin() {

    const navigate = useNavigate();

    const [reloginMsg, setReloginMsg] = useState(getParam("reloginMsg"));
    useEffect(() => {
        if(reloginMsg) {
            removeParam("reloginMsg");
        }
    });

    useEffect(() => {
        if(!(getCookieSessionId() && getCookieUsername() && getCookiePasswordLength())) {
            navigate("/error/401");
        }
        if(reloginEl.current) {
            reloginEl.current.children[0].focus();
        }
    });

    const reloginEl = useRef();

    var inputFields = [];
    for(var i = 0; i < getCookiePasswordLength(); i++) {
        inputFields.push(<ReloginInput/>);
    }

    for(var i = 0; i < inputFields.length; i++) {
        inputFields[i] = <ReloginInput
            onFinish={() => {
                setTimeout(finish, 10);
            }}
        />
    }

    function clear() {
        var reloginElements = reloginEl.current.children;
        for(var i = 0; i < reloginElements.length; i++) {
            reloginElements[i].value = "";
        }
        reloginElements[0].focus();
        if(reloginEl.current) {
            reloginEl.current.classList.add("fail");
            setTimeout(() => {
                if(!reloginEl.current) return;
                reloginEl.current.classList.remove("fail");
                
            }, 300);
        }
    }

    function finish() {
        var enteredPassword = "";
        var reloginElements = reloginEl.current.children;
        for(var i = 0; i < reloginElements.length; i++) {
            if(!reloginElements[i].value) continue;
            enteredPassword += reloginElements[i].value;
        }
        login(getCookieUsername(), enteredPassword, (data) => {
            handleLogin(data, (e) => {
                clear();
            });
        });
    }

    const [reloginInputClassName, setReloginInputClassName] = useState("");

    function checkSize() {
        var inputWidth = (10 + 10 + 70) * getCookiePasswordLength() + 50;
        if(inputWidth > window.innerWidth) {
            inputWidth = (10 + 10 + 50) * getCookiePasswordLength() + 50;
            if(inputWidth > window.innerWidth) {
                setReloginInputClassName("phone");
            }else {
                setReloginInputClassName("small");
            }
        }else {
            setReloginInputClassName("");
        }
        console.log("check", window.innerWidth, inputWidth);
    }


    useEffect(() => {
        checkSize();
        window.addEventListener("resize", checkSize);
    });

    return <DefaultWrapper className="relogin-wrapper">
        
        <div className="relogin">
            <h1>Welcome back <b>{getCookieUsername()}</b></h1>
            <h2>{reloginMsg}</h2>
            <div className={"relogin-input " + reloginInputClassName} ref={reloginEl}>
                {reloginInputClassName == "phone" ? <ReloginPhoneInput passwordLength={getCookiePasswordLength()} onFinish={finish}/> : inputFields}
            </div>
            
            <a onClick={() => {
                swipeRight("login");
                delUserInformation();
            }}>Login to a different account?</a>
        </div>
    </DefaultWrapper>;

}

export default Relogin;