import React, { useState } from "react";

import backgroundImage from "../assets/img/background.png";
import AnimationWraper from "./animationWrapper";
import Footer from "./footer";
import { getParam, setParam } from "./globalParams";
import InfoDisplay from "./infoDisplay";
import LoadingBar, { setLoadingBarState } from "./loadingBar";

import "./style/defaultWrapper.css";

function Background(props) {


    return <>
        <LoadingBar/>
        <InfoDisplay/>
        <div className="wrapper" style={{
            backgroundImage:  `linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, .5)), url(${backgroundImage})`
        }}>
            <AnimationWraper className={"wrapper-children" + (props.className ? " " + props.className : "")}>
                {props.children}
            </AnimationWraper>
            <Footer/>
        </div>
    </>;
}

export default Background;