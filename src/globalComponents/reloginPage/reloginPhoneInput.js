import React, { useEffect, useRef } from "react";

function ReloginPhoneInput(props) {

    const el = useRef();

    return <><input type="password" ref={el} placeholder="Enter password" onKeyPress={(e) => {
        if(e.key === "Enter") {props.onFinish()}
        setTimeout(() => {
            if(e.target.value.length >= props.passwordLength) {props.onFinish()}
        }, 10);
    }}></input>
    <a onClick={props.onFinish}>{props.btn}</a>
    </>;
}

export default ReloginPhoneInput;