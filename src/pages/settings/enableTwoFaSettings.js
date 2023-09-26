import React, {useState, useEffect, useRef} from "react";

import { confirm2FA, enable2FA } from "../../content/2faManager";
import ReloginInput from "../../globalComponents/reloginPage/reloginInput";

import { isNumberKey } from "../../globalComponents/utils";
import { setParam } from "../../globalComponents/globalParams";
import { swipeRight } from "../../globalComponents/animationWrapper";
import { useNavigate } from "react-router-dom";

function EnableTwoFaSettings() {

    const navigate = useNavigate();

    const [qrCode, setQrCode] = useState("");
    const codeInput = useRef();

    useEffect(() => {
        loadQRCode();
    });

    function loadQRCode() {
        enable2FA(setQrCode);
    }

    function finish() {
        var enteredCode = codeInput.current.value;
        confirm2FA(enteredCode, (success) => {
            if(success) {
                navigate("/error/701");
            }else {
                codeInput.current.value = "";
            }
        });
    }

    return <>
        <p className="info">To enable two factor authentification scan the QR Code below with your 2FA App and enter the code you get</p>
        <img title="Click to reload" onClick={loadQRCode} src={qrCode} loading="eager" alt={qrCode}/>
        <div className="inputs">
            <input ref={codeInput} type="text" onKeyPress={(e) => {
                if(e.key === "Enter") {
                    finish();
                }
                if(!isNumberKey(e)) {
                    e.preventDefault();
                    return;
                }
            }} onKeyUp={(e) => {
                if(e.target.value.length >= 6) {
                    //finish();
                }
            }}/>
            <a onClick={finish}>Enter</a>
        </div>
    </>

}

function TwoFAInput(props) {
    return <input type="text" onKeyPress={(e) => {
        if(e.key === "Enter") return;
        if(!isNumberKey(e) && props.number) {
            e.preventDefault();
            return;
        }
        var sibling = e.target.nextElementSibling;
        if(!sibling) {
            props.onFinish();
            return;
        }
        setTimeout(() => {
            sibling.focus();
        }, 1);
    }} onKeyUp={(e) => {
        if(e.keyCode === 8 && e.target.previousElementSibling) {
            e.target.previousElementSibling.focus();
        }
    }}/>
}

export default EnableTwoFaSettings;