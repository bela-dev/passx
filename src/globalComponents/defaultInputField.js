import React, {useState} from "react";

import VisibleIcon from "../assets/icons/visible";
import InvisibleIcon from "../assets/icons/invisible";

import "./style/defaultInputField.css";

function DefaultInputField(props) {

    const [passwordVisible, setPasswordVisible] = useState(false);

    const elProps = {
        className: "default-input",
        onChange: props.onChange,
        type: props.password && !passwordVisible ? "password" : props.email ? "email" : "text",
        placeholder: props.placeholder,
        autoComplete: props.autoComplete ? "on" : "off",
        defaultValue: props.defaultValue,
        style: {
            color: props.color ? "var(--" + props.color + ")" : ""
        }
    }

    if(props.textarea) {
        return React.cloneElement(<textarea/>, elProps);
    }

    return <>
        {React.cloneElement(<input/>, elProps)}
        {props.password ? <div className={"default-input-icon icon" + (passwordVisible ? " invisible" : " visible")} onClick={() => {setPasswordVisible(!passwordVisible)}}>{!passwordVisible ? <VisibleIcon/> : <InvisibleIcon/>}</div> : <></>}
    </>;

}

export default DefaultInputField;