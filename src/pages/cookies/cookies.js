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
                    <p className="medium">PassX uses cookies to be able to store your username on your device to speed up the login process.</p>

                    <DefaultButton onClick={() => {
                        storeUser(user);
                        swipeLeft("dashboard");
                    }}>Accept</DefaultButton>
                    <DefaultButton grey onClick={() => {
                        swipeLeft("dashboard");
                    }}>Decline</DefaultButton>
                </div>

            </LoginWrapper>
        </DefaultWrapper>;
}

export default Cookies;