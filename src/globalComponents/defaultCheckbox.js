import React, {useState} from "react";

import "./style/defaultCheckbox.css";

function DefaultCheckbox(props) {


    const [checked, setChecked] = useState(props.checked);
    props.onChange(checked);
    
    return <div className={"default-checkbox" + (props.textclick ? " textclick" : "")}>
        <div className={"checkbox" + (checked ? " checked" : "")} onClick={() => {setChecked(!checked);}}><div className="dot"/></div>
        <label onClick={() => {
            if(props.textclick) {
                setChecked(!checked);
            }
        }}>{props.children}</label>
        {props.icons ? <div className="icons">
            {props.icons}
        </div> : ""}
    </div>
}

export default DefaultCheckbox;