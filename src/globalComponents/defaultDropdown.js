import React, { useState } from "react";
import ChevronIcon from "../assets/icons/chevron";

import "./style/defaultDropdown.css";

function DefaultDropdown(props) {

    const [active, setActive] = useState(false);
    const [activeItem, setActiveItem] = useState(0);
    if(props.onChange) {
        props.onChange(activeItem);
    }

    const items = props.items;

    return <div className={"default-dropdown" + (active ? " active" : "")} onClick={() => {if(props.forceActive === -1) setActive(!active);}}>
        <div className="chevron"><ChevronIcon up/></div>
        <h2>{items[props.forceActive !== -1 ? props.forceActive : activeItem]}</h2>
        <ul>
            {items.map((v, i) => {
                return <li onClick={() => {setActiveItem(i);}}>{v}</li>;
            })}
        </ul>
    </div>;
}

export default DefaultDropdown;