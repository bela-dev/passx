import React, { useEffect, useRef } from "react";

function ReloginInput(props) {

    const el = useRef();

    return <input type="password" ref={el} onFocus={() => {
        el.current.value = "";
    }} onKeyPress={(e) => {
        if(e.key === "Enter") return;
        var sibling = e.target.nextElementSibling;
        if(!sibling) {
            props.onFinish();
            return;
        }
        setTimeout(() => {
            sibling.focus();
        }, 1);
    }} onKeyUp={(e) => {
        if(e.keyCode === 8) {
            e.target.previousElementSibling.focus();
        }
    }}></input>;
}

export default ReloginInput;