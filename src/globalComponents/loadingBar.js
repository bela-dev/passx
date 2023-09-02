import React, { useEffect, useState } from "react";

import "./style/loadingBar.css";

var loadingBarState = 0;

function setLoadingBarState(state) {
    loadingBarState = state;
    const updateLoadingBarEvent = new CustomEvent("updateLoadingBar", {
        
        bubbles: true,
        cancelable: true,
        composed: false,
    });
    window.dispatchEvent(updateLoadingBarEvent);
}

function LoadingBar() {

    const [out, setOut] = useState(0);
    const [update, setUpdate] = useState(0);

    window.addEventListener("updateLoadingBar", (event) => {
        setUpdate(update + 1);
    });

    useEffect(() => {
        const state = loadingBarState;
        if(state == 100 && !out) {
            setTimeout(() => setLoadingBarState(0), 1000);
            setOut(true);
            setTimeout(() => {setOut(false)}, 2000);
        }
    })

    return <div className={"loading-bar" + (out ? " out" : "")} style={{
        width: loadingBarState + "%"
    }}/>
}

export {setLoadingBarState}

export default LoadingBar;