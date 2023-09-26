import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

import DefaultButton from "./defaultButton";
import XMarkIcon from "../assets/icons/xmark";
import WarningIcon from "../assets/icons/warning";

import "./style/popUp.css";
import PassworChangePopUp from "../pages/settings/popup/passwordChangePopUp";

/**
 * 
 * @param {*} props
 * @prop btnLeft: JSON with title and onClick
 * @prop btnRight: JSON with title and onClick
 * @prop title: PopUp Title
 * @prop className: additional classNames
 * @prop children: popup content 
 * @returns 
 */

function PopUp(props) {

    const navigate = useNavigate();

    const [animationout, setAnimationout] = useState(false);

    window.removeEventListener("closePopUp", close);
    window.addEventListener("closePopUp", close);

    function close() {
        setAnimationout(true);
        setTimeout(() => {
            navigate(props.closeLink ? "/" + props.closeLink : "/dashboard");
        }, 400);;
    }

    return <>
        <div className={"overlay popup-overlay" + (animationout ? " animationout" : "")} onClick={() => {
            window.dispatchEvent(new CustomEvent("closePopUp"));
        }}/>
        <div className={"popup dashboard" + (animationout ? " animationout" : "") + " " + (props.className ? props.className : "")}>
            <div className="close-xmark" onClick={() => {
                    close();
                }}>
                <XMarkIcon/>
            </div>
            <h1>{props.title}</h1>
            <hr/>

            {props.warning ? <p className={"warning" + (props.warning == "/e" ? " hidden" : "")}><WarningIcon/>{props.warning}</p> : <></>}
            
            {props.children}

            <div className="button-space">
                <DefaultButton className={props.btnLeft.className ? props.btnLeft.className : ""} onClick={() => {
                    props.btnLeft.onClick();
                    if(!props.noclose) {
                        close()
                    }
                }}>{props.btnLeft.title}</DefaultButton>
                {props.btnRight ? <DefaultButton className={props.btnLeft.className ? props.btnLeft.className : ""} onClick={() => {
                    
                    
                    if(!props.noclose) {
                        close()
                    }
                    props.btnRight.onClick();
                }}>{props.btnRight.title}</DefaultButton> : ""}
            </div>
        </div>
    </>;
}

export default PopUp;