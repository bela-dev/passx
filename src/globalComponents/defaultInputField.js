import React, {useRef, useState} from "react";

import VisibleIcon from "../assets/icons/visible";
import InvisibleIcon from "../assets/icons/invisible";

import "./style/defaultInputField.css";
import GenerateButton from "./generateButton";

import Randomstring from "randomstring";

function DefaultInputField(props) {

    const inputEl = useRef();

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [generateActive, setGenerateActive] = useState(false);
    const [generateVisible, setGenerateVisible] = useState(false);
    const [generatedString, setGeneratedString] = useState("");

    const elProps = {
        onFocus: () => {
            setGenerateActive(true);
            setTimeout(() => {
                if(inputEl.current.value != "") {
                    return;
                }
                setGenerateVisible(true);
            }, 400);
        },
        onBlur: () => {
            setTimeout(() => {
                setGenerateActive(false);
                setGenerateVisible(false);
            }, 200);
        },
        ref: inputEl,
        className: "default-input",
        onChange: props.onChange,
        type: props.password && !passwordVisible ? "password" : props.email ? "email" : "text",
        placeholder: props.placeholder,
        autoComplete: props.autoComplete ? "on" : "off",
        defaultValue: props.defaultValue ? props.defaultValue : generatedString,
        style: {
            color: props.color ? "var(--" + props.color + ")" : ""
        }
    }

    if(props.textarea) {
        return React.cloneElement(<textarea/>, elProps);
    }

    return <>
        {props.generate ? <GenerateButton onClick={() => {
            var genPassword = Randomstring.generate(18);
            inputEl.current.value = genPassword;
            if(props.generatenextsibling) {
                var elSibling = inputEl.current.nextElementSibling;
                while(elSibling.nodeName != "INPUT") {
                    elSibling = elSibling.nextElementSibling;
                }
                elSibling.value = genPassword;
            }
            if(props.generateprevsibling) {
                var elSibling = inputEl.current.previousElementSibling;
                while(elSibling.nodeName != "INPUT") {
                    elSibling = elSibling.previousElementSibling;
                }
                elSibling.value = genPassword;
            }
        }} name={props.generateName} active={generateActive} visible={generateVisible}/> : <></>}
        {React.cloneElement(<input/>, elProps)}
        {props.password ? <div className={"default-input-icon icon" + (passwordVisible ? " invisible" : " visible")} onClick={() => {setPasswordVisible(!passwordVisible)}}>{!passwordVisible ? <VisibleIcon/> : <InvisibleIcon/>}</div> : <></>}
    </>;

}

export default DefaultInputField;