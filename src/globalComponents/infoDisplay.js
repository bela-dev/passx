import React, { useState } from "react";

import "./style/infoDisplay.css";

const DELAY = 3500;

function openInfo(title, msg) {
    const openInfoEvent = new CustomEvent("openInfo", {
        
        detail: {
            title: title,
            msg: msg
        },
        bubbles: true,
        cancelable: true,
        composed: false,
    });
    window.dispatchEvent(openInfoEvent);
}

function InfoDisplay() {

    const [timeoutId, setTimeoutId] = useState(-1);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [msg, setMsg] = useState("");

    window.addEventListener("openInfo", (event) => {
        setOpen(true);
        setTitle(event.detail.title);
        setMsg(event.detail.msg);
        clearTimeout(timeoutId);
        // TODO Fix timeout clear
        setTimeoutId(setTimeout(() => {
            setOpen(false);
        }, DELAY));
    });

    return <div className={"info-display" + (open ? " open" : "")}>
        <h3>{title}</h3>
        <p>{msg}</p>
    </div>;

}

export {openInfo}
export default InfoDisplay;