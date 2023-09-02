import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import ContextMenu from "./contextMenu";

function DashboardTableTr(props) {

    var e = props.entry;
    const navigate = useNavigate();

    const [contextMenuX, setContextMenuX] = useState(0);
    const [contextMenuY, setContextMenuY] = useState(0);
    const [active, setActive] = useState(0);

    return <tr
        onClick={() => {
            navigate("/dashboard/edit/" + e.getId());
            window.dispatchEvent(new CustomEvent("closeContextMenu", {}));
        }}
        onContextMenu={(event) => {
            event.preventDefault();
            const openContextMenuEvent = new CustomEvent("openContextMenu", {
                detail: {
                    entryId: e.getId(),
                    x: event.pageX,
                    y: event.pageY,
                    wrapperWidth: props.wrapperWidth,
                    wrapperHeight: props.wrapperHeight
                }
            });
            window.dispatchEvent(openContextMenuEvent);
        }}
    >
        <th>{e.getTitle()}</th>
        <th>{e.getUsername()}</th>
        <th>{e.getEmail()}</th>
        <th>{e.getUrl()}</th>
        <th>{e.getDescription()}</th>
    </tr>;
}

export default DashboardTableTr;