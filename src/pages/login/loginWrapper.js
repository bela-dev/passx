import React, {useState} from "react";

import "./style/loginWrapper.css";

function LoginWrapper(props) {

    /**
     * 0 : not started not needed
     * 1 : not started needed
     * 2 : finished
     */
    const [animationin, setAnimationin] = useState(0);

    if(props.animationin == true && animationin == 0) {
        setAnimationin(1);
        setTimeout(function() {
            setAnimationin(2);
        }, 40);
    }

    return <div className={"login-wrapper box-wrapper" + (props.animationout ? " animationout" : "") + (animationin == 1 ? " animationin" : "") + (props.className ? " " + props.className : "")}>
        <div className="login-flip box-wrapper">
            {props.children}
        </div>
    </div>;
}

export default LoginWrapper;