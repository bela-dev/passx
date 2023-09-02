import React, {useState} from "react";

import "./style/defaultCheckbox.css";

function DefaultCheckbox(props) {


    const [checked, setChecked] = useState(props.checked);
    props.onChange(checked);
    
    return <div className="default-checkbox">
        <div className={"checkbox" + (checked ? " checked" : "")} onClick={() => {setChecked(!checked);}}/>
        <label>{props.children}</label>
    </div>
}

export default DefaultCheckbox;