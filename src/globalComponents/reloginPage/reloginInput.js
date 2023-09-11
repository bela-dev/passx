import React, { useEffect, useRef } from "react";
import { isNumberKey } from "../utils";

function ReloginInput(props) {

    const el = useRef();

    return <input className={props.className ? props.className : ""} type={props.number ? "text" : "password"} ref={el} onFocus={() => {
        el.current.value = "";
    }} onKeyPress={(e) => {
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
    }}></input>;
}

export default ReloginInput;