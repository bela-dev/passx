import React, {useState} from "react"

import "./style/defaultWhiteCheckbox.css";

import CheckIcon from "../assets/icons/check";

function DefaultWhiteCheckbox() {

    const [checked, setChecked] = useState(false);

    return <div className={"default-white-checkbox" + (checked ? " checked" : "")} onClick={() => {setChecked(!checked)}}>
        <CheckIcon/>
    </div>
}

export default DefaultWhiteCheckbox;