import React, { useEffect, useState } from "react";

import "./style/contextMenu.css";

import { genUUID } from "../../globalComponents/stringHelper";
import { useNavigate } from "react-router-dom";

const width = 200, height = 280;
var addedEventListener = false;

function ContextMenu(props) {

    const navigate = useNavigate();

    const [entryId, setEntryId] = useState(-1);
    const [active, setActive] = useState(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    useEffect(() => {
        if(addedEventListener) {
            window.removeEventListener("openContextMenu", open);
            window.removeEventListener("resize", close);
            window.removeEventListener("closeContextMenu", close);
            addedEventListener = true;
        }
        window.addEventListener("openContextMenu", open);
        window.addEventListener("resize", close);
        window.addEventListener("closeContextMenu", close);
        
        
    });

    function open(e) {
        setEntryId(e.detail.entryId);
        var x = e.detail.x, y = e.detail.y;
        if(y > (window.innerHeight / 2 + e.detail.wrapperHeight / 2 - height)) {
            y -= height;
        }
        if(x > (window.innerWidth / 2 + e.detail.wrapperWidth / 2 - width)) {
            x -= width;
        }
        setX(x);
        setY(y);
        setActive(true);
    }

    function close() {
        setActive(false);
    }

    return <div className="context-menu" style={{
        display: active ? "block" : "none",
        left: x + "px",
        top: y + "px"
    }}>
        <a>Copy Username</a>
        <a>Copy Email</a>
        <a>Copy Password</a>
        <a className="no-hover"><hr/></a>
        <a onClick={() => {
            navigate("/dashboard/edit/" + entryId);
            setActive(false);
        }}>Edit Entry</a>
        <a onClick={() => {
            navigate("/dashboard/delete/" + entryId);
            setActive(false);
        }}>Delete Entry</a>
    </div>;
}

export default ContextMenu;