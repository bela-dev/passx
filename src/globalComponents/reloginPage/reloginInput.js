import React, { useEffect, useRef } from "react";
import { isNumberKey } from "../utils";

function ReloginInput(props) {

    var strgPressed = false;

    const el = useRef();

    return <input className={props.className ? props.className : ""} type={props.number ? "text" : "password"} ref={el} onFocus={() => {
        el.current.value = "";
    }}
    onPaste={(e) => {
        var text = e.clipboardData.getData("text");
        var el = e.target;
        function nextPaste() {
            el.value = text.charAt(0);
            text = text.substring(1);
            el = el.nextElementSibling;
            if(!el) {
                props.onFinish();
                return;
            }
            el.focus();
            if(text.length > 0) {
                setTimeout(nextPaste, 25);
            }
        }
        e.preventDefault();
        nextPaste();
    }}
    onKeyDown={(e) => {
        if(e.which == 17) {
            strgPressed = true;
        }
    }}
    onKeyPress={(e) => {
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
            if(strgPressed) {
                var sib = e.target.previousElementSibling;
                while(sib.previousElementSibling) {
                    sib.focus();
                    sib = sib.previousElementSibling;
                }
                sib.focus();
            }
        }
        strgPressed = false;
    }}></input>;
}

export default ReloginInput;