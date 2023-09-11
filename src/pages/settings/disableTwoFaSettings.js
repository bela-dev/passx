import React from "react";

import DefaultButton from "../../globalComponents/defaultButton";
import { disable2FA } from "../../content/2faManager";
import { openInfo } from "../../globalComponents/infoDisplay";
import { setParam } from "../../globalComponents/globalParams";
import { swipeRight } from "../../globalComponents/animationWrapper";
import { useNavigate } from "react-router-dom";

function DisableTwoFaSettings() {

    const navigate = useNavigate();

    return <>
    <p className="info">Two Factor Authentification is currently enabled. To disable it press the button below.</p>
        <DefaultButton onClick={() => {
            disable2FA((success) => {
                if(success) {
                    navigate("/error/702");
                }else {
                    openInfo("Error", "An error occured while trying to disable 2FA");
                }
            })
        }}>Disable</DefaultButton>
    </>;
}

export default DisableTwoFaSettings;