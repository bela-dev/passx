import React, {useEffect, useState, useRef} from "react";

import { useNavigate } from "react-router-dom";
import ReloginInput from "./reloginInput";
import ReloginPhoneInput from "./reloginPhoneInput";
import DefaultWrapper from "../../globalComponents/defaultWrapper";

import "../style/reloginPage.css";

function ReloginPage(props) {

    const navigate = useNavigate();
    const length = props.length;

    var placeholder = props.placeholder;
    if(!placeholder) {
        placeholder = [];
    }


    const reloginEl = useRef();

    useEffect(() => {
        if(reloginEl.current && reloginEl.current.children[0]) {
            reloginEl.current.children[0].focus();
        }
    });

    var inputFields = [];
    for(var i = 0; i < length; i++) {
        inputFields.push(<ReloginInput/>);
    }

    for(var i = 0; i < inputFields.length; i++) {
        inputFields[i] = <ReloginInput
            number={props.number}
            className={placeholder.includes(i) ? "placeholder" : ""}
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
        var enteredText = "";
        var reloginElements = reloginEl.current.children;
        for(var i = 0; i < reloginElements.length; i++) {
            if(!reloginElements[i].value) continue;
            enteredText += reloginElements[i].value;
        }
        props.onFinish(enteredText, clear);
    }

    const [reloginInputClassName, setReloginInputClassName] = useState("");

    function checkSize() {
        var inputWidth = (10 + 10 + 70) * length + 50;
        if(inputWidth > window.innerWidth) {
            inputWidth = (10 + 10 + 50) * length + 50;
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
            <h1>{props.title}</h1>
            <h2>{props.subtitle}</h2>
            <div className={"relogin-input " + reloginInputClassName} ref={reloginEl}>
                {reloginInputClassName == "phone" ? <ReloginPhoneInput btn={props.btn} passwordLength={length} onFinish={finish}/> : inputFields}
            </div>
            
            {props.buttons}
        </div>

    </DefaultWrapper>
}

export default ReloginPage;