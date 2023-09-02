import React from "react";

import "./style/defaultButton.css";

function DefaultButton(props) {
    return <button type="button" className="button1" onClick={props.onClick}>{props.children}</button>;
}

export default DefaultButton;