import React, { useEffect, useState } from "react";

import DefaultWrapper from "../../globalComponents/defaultWrapper";
import DefaultButton from "../../globalComponents/defaultButton";
import LoginWrapper from "../login/loginWrapper";
import LoginInputField from "../login/loginInputField";
import { swipeLeft } from "../../globalComponents/animationWrapper";

import "./changeapi.css";
import { checkStatus, getApiUrl, setApiUrl } from "../../content/apiManager";
import XMarkIcon from "../../assets/icons/xmark";
import { openInfo } from "../../globalComponents/infoDisplay";
import { setParam } from "../../globalComponents/globalParams";

function ChangeAPI() {

    const [currentUrl, setCurrentUrl] = useState(getApiUrl());
    const [status, setStatus] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            checkStatusForCurrentUrl("");
        }, 1000);
    });
    function checkStatusForCurrentUrl(pastUrl) {
        setTimeout(() => {
            checkStatusForCurrentUrl(currentUrl);
        }, 500);
        if(pastUrl == currentUrl) return;
        checkStatus(currentUrl, setStatus);
        
    }
    if(!currentUrl.endsWith("/")) {
        setCurrentUrl(currentUrl + "/");
    }

    return <DefaultWrapper>
            <LoginWrapper className="change-api">
                <h1>Change API</h1>

                <div className="content">
                    <LoginInputField name="API URL" defaultValue={currentUrl} onChange={setCurrentUrl} color={status ? "green" : "red"}/>
                    
                    <a className="switch-btn" onClick={() => {
                        swipeLeft("login");
                    }}>Back to Login?</a>

                    <DefaultButton onClick={() => {
                        if(status) {
                            setApiUrl(currentUrl);
                            setParam("loginMessage", "You successfully updated your Api Url");
                            swipeLeft("login");
                        }else {
                            openInfo("Error", "This API Url is not valid!");
                        }
                    }}>Update</DefaultButton>
                </div>

            </LoginWrapper>
        </DefaultWrapper>;
}

export default ChangeAPI;