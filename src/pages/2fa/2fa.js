import React, { useEffect } from "react";

import DefaultWrapper from "../../globalComponents/defaultWrapper";
import ReloginInput from "../../globalComponents/reloginPage/reloginInput";
import ReloginPage from "../../globalComponents/reloginPage/reloginPage";
import { checkUser, confirmIdentity } from "../../content/userManager";

import { swipeLeft } from "../../globalComponents/animationWrapper";
import { useNavigate } from "react-router-dom";
import { handleEntryLoading } from "../login/login";

function TWOFA() {

    const navigate = useNavigate();

    useEffect(() => {
        checkUser(navigate);
    });

    return <ReloginPage
        title="Enter 2FA Code"
        number
        btn="Enter"
        length={6}
        placeholder={[3]}
        buttons={
            <>
                
            </>
        }
        onFinish={(txt, clear) => {
            confirmIdentity(txt, false, () => {
                handleEntryLoading();
            }, clear)
        }}
    />
}

export default TWOFA;