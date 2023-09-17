import React, { useEffect, useState } from "react";

import DefaultCheckbox from "../../globalComponents/defaultCheckbox";
import DefaultWrapper from "../../globalComponents/defaultWrapper";
import ReloginInput from "../../globalComponents/reloginPage/reloginInput";
import ReloginPage from "../../globalComponents/reloginPage/reloginPage";
import { checkUser, confirmIdentity } from "../../content/userManager";

import { swipeLeft } from "../../globalComponents/animationWrapper";
import { useNavigate } from "react-router-dom";
import { handleEntryLoading } from "../login/login";
import DefaultWhiteCheckbox from "../../globalComponents/defaultWhiteCheckbox";

function TWOFA() {

    const [remember, setRemember] = useState(true);

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
                <div className="btn-row"><DefaultWhiteCheckbox/><a>Remember Me</a></div>
                <a onClick={() => {navigate("/error/665")}}>Lost your device?</a>
            </>
        }
        onFinish={(txt, clear) => {
            confirmIdentity(txt, remember, () => {
                handleEntryLoading();
            }, clear);
        }}
    />
}

export default TWOFA;