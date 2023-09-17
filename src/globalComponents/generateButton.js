import React from "react";

import "./style/generateButton.css";

function GenerateButton(props) {
    return <div onClick={props.onClick} className={"generate-btn" + (props.active ? " active" : "") + (props.visible ? " visible" : "")}>
        Generate {props.name}
    </div>
}

export default GenerateButton;