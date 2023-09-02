import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./style/animationWrapper.css";

const Direction = {
    Up: 'up',
    Down: 'down',
    Left: 'left',
    Right: 'right'
  };

var globalSwipeIn = false;
var direction = Direction.Left;

function swipeRight(page) {
    direction = Direction.Right;
    swipe(page);
}

function swipeLeft(page) {
    direction = Direction.Left;
    swipe(page);
}

function swipe(page) {
    window.dispatchEvent(new CustomEvent("swipe", {
        detail: {
            page: page
        },
        bubbles: true,
        cancelable: false,
        composed: false
    }));
}

function AnimationWraper(props) {

    const navigate = useNavigate();
    const animationWrapperEl = useRef();

    const [firstInit, setFirstInit] = useState(true);

    const [swipeOut, setSwipeOut] = useState(false);
    const [swipeIn, setSwipeIn] = useState(globalSwipeIn && !swipeOut);
    const [navigateTo, setNavigateTo] = useState("");

    // TODO: Fix that event listener is added very often

    useEffect(() => {
        if(!firstInit) return;
        setFirstInit(false);
        window.removeEventListener("swipe", handleSwipe)
        window.addEventListener("swipe", handleSwipe);
    });

    function handleSwipe(e) {
        if(swipeOut) return;
        setSwipeOut(true);
        globalSwipeIn = true;
        setTimeout(() => {
            if(navigateTo != "") return;
            window.removeEventListener("swipe", handleSwipe);
            setNavigateTo("/" + e.detail.page);
        }, (animationWrapperEl.current ? getComputedStyle(animationWrapperEl.current).getPropertyValue("--swipe-amount") === "0" ? 0 : 400 : 400));
    }

    useEffect(() => {
        if(navigateTo != "") {
            navigate(navigateTo);
        }
        setTimeout(() => {
            if(swipeIn) {
                globalSwipeIn = false;
                setSwipeIn(false);
            }
        }, 50);
    })

    return <div ref={animationWrapperEl} className={"animation-wrapper" + (swipeOut ? " swipe-out" : "") + (swipeIn ? " swipe-in" : "") + " " + direction + (props.className ? " " + props.className : "")}>
        {props.children}
    </div>;

}

export {swipeLeft, swipeRight}
export default AnimationWraper;