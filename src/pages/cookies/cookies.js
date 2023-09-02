import React, { useEffect } from "react";

import DefaultWrapper from "../../globalComponents/defaultWrapper";
import DefaultButton from "../../globalComponents/defaultButton";
import LoginWrapper from "../login/loginWrapper";
import { storeUser } from "../../content/cookieManager";
import { checkUser, user } from "../../content/userManager";
import { swipeLeft } from "../../globalComponents/animationWrapper";
import { useNavigate } from "react-router-dom";

function Cookies() {

    const navigate = useNavigate();

    useEffect(() => {
        checkUser(navigate);
    });

    return <DefaultWrapper>
            <LoginWrapper>
                <h1>We use cookies!</h1>

                <div className="content">
                    <p className="medium">We us cookies on PassX to save your user data (except the password) after you logged in. So you only have to enter your password to login again.</p>

                    <DefaultButton onClick={() => {
                        storeUser(user);
                        swipeLeft("dashboard");
                    }}>Accept</DefaultButton>
                    <DefaultButton onClick={() => {
                        swipeLeft("dashboard");
                    }}>Decline</DefaultButton>
                </div>

            </LoginWrapper>
        </DefaultWrapper>;
}

export default Cookies;