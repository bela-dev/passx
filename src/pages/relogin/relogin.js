import React, { useEffect, useState, useRef } from "react";
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";
import { useNavigate } from "react-router-dom";
import { getCookiePasswordLength, getCookieSessionId, getCookieUsername, unstoreUser } from "../../content/cookieManager";
import { delUserInformation, login, user } from "../../content/userManager";

import { handleLogin } from "../login/login";

import { swipeRight } from "../../globalComponents/animationWrapper";

import { getParam, removeParam, setParam } from "../../globalComponents/globalParams";
import ReloginPage from "../../globalComponents/reloginPage/reloginPage";

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
    });

    return <ReloginPage
        title={<>Welcome back <b>{getCookieUsername()}</b></>}
        subtitle={reloginMsg}
        length={getCookiePasswordLength()}
        btn="Login"
        buttons={
            <a onClick={() => {
                swipeRight("login");
                delUserInformation();
            }}>Login to a different account?</a>
        }
        onFinish={(txt, clear) => {
            console.log("finish");
            login(getCookieUsername(), txt, (data) => {
                console.log(data);
                handleLogin(data, (e) => {
                    clear();
                });
            });
        }}
    />

}

export default Relogin;