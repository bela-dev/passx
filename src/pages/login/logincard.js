import React, {useState} from "react";

import {useNavigate} from 'react-router-dom';

import DefaultWrapper from "../../globalComponents/defaultWrapper";

import LoginWrapper from "./loginWrapper";
import LoginInputField from "./loginInputField";
import DefaultButton from "../../globalComponents/defaultButton";

import { setParam, getParam } from "../../globalComponents/globalParams";

/**
 * 
 * @param {*} props 
 * @prop name
 * @prop linkTitle
 * @prop children
 * @returns 
 */

function LoginCard(props) {

    const navigate = useNavigate();

    var error = props.error;
    if(props.successMessage) {
        error = props.successMessage;
    }
    const [linkState, setLinkState] = useState(0);

    function openLink() {
        setLinkState(1);
        setTimeout(function() {
            setParam("animationin", true);
            navigate("/" + props.linkAddress);
        }, 100);
    }

    return <DefaultWrapper>
        <LoginWrapper
            linkAddress={props.name.toLowerCase()}
            animationout={linkState == 1 || props.animationout}
            animationin={getParam("animationin") || props.animationin}
        >
            <h1>PassX</h1>

            <div className="content" onKeyUp={(e) => {
                if(e.keyCode === 13) {
                    props.onClick();
                }
            }}>
                <p className={"error" + (props.successMessage ? " success" : "")}>{error}</p>

                {props.children}

                <a className="switch-btn" onClick={openLink}>{props.linkTitle}</a>

                <DefaultButton onClick={props.onClick}>{props.name}</DefaultButton>
            </div>

        </LoginWrapper>
    </DefaultWrapper>;
}

export default LoginCard;