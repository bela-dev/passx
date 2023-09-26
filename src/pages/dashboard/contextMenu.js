import React, { useEffect, useRef, useState } from "react";

import "./style/contextMenu.css";

import { copyToClipboard } from "../../globalComponents/utils";
import { genUUID } from "../../globalComponents/utils";
import { useNavigate } from "react-router-dom";
import { getEntryById } from "../../content/entryManager";

const width = 200, height = 280;
var addedEventListener = false;

function ContextMenu(props) {

    const navigate = useNavigate();

    const menuEl = useRef();

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
        window.addEventListener("click", (e) => {
            
            try {
                if(!menuEl.current.contains(e.target)) close();
            } catch (error) {}
        });
        
        
    });

    function open(e) {
        setEntryId(e.detail.entryId);
        var x = e.detail.x, y = e.detail.y;
        var wrapperHeight = e.detail.wrapperHeight.includes("vh") ? window.innerHeight : e.detail.wrapperHeight;
        var wrapperWidth = e.detail.wrapperWidth.includes("vw") ? window.innerWidth : e.detail.wrapperWidth;
        if(y > (window.innerHeight / 2 + wrapperHeight / 2 - height)) {
            y -= height;
        }
        if(x > (window.innerWidth / 2 + wrapperWidth / 2 - width)) {
            x -= width;
        }
        setX(x);
        setY(y);
        setActive(true);
    }

    function close() {
        setActive(false);
    }

    return <div className="context-menu" ref={menuEl} style={{
        display: active ? "block" : "none",
        left: x + "px",
        top: y + "px"
    }}>
        <a onClick={() => {copyToClipboard(getEntryById(entryId).getUsername());}}>Copy Username</a>
        <a onClick={() => {copyToClipboard(getEntryById(entryId).getEmail());}}>Copy Email</a>
        <a onClick={() => {copyToClipboard(getEntryById(entryId).getPassword(), true);}}>Copy Password</a>
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