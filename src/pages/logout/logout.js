import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { checkUser, disableSessionCheck, logout } from "../../content/userManager";
import { getParam, setParam } from "../../globalComponents/globalParams";
import DefaultWrapper from "../../globalComponents/defaultWrapper";

import "./style/logout.css";
import Dashboard from "../dashboard/dashboard";
import { swipeRight } from "../../globalComponents/animationWrapper";

function Logout() {

    const navigate = useNavigate();

    const [logoutMessage, setLogoutMessage] = useState(getParam("logoutMessage"));
    if(logoutMessage == undefined) {
        setLogoutMessage("You successfully logged out");
    }

    useEffect(() => {
        logout((data) => {
            setTimeout(() => {
                navigate("/error/703");
                disableSessionCheck();
            }, 400);
        }, () => {
            navigate("/error/401");
        });
        
    });

    return <Dashboard/>;
}

export default Logout;