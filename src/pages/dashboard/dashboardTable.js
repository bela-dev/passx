import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardTableTr from "./dashboardTableTr";

import "./style/dashboardTable.css";

function DashboardTable(props) {

    var trEntries = []
    trEntries.push(
        <tr className="title">
            <th>Title</th>
            <th>Username</th>
            <th>Email</th>
            <th>URL</th>
            <th>Description</th>
        </tr>
    );
    var entriesDisplayed = 0;
    props.entries.forEach((e) => {
        if(!e.filter(props.filter)) return;
        trEntries.push(
            <DashboardTableTr entry={e} wrapperWidth={props.wrapperWidth} wrapperHeight={props.wrapperHeight}/>
        );
        entriesDisplayed+=1;
    });
    if(entriesDisplayed != props.entries.length) {
        window.dispatchEvent(new CustomEvent("updateEntryCount", {
            detail: {
                count: entriesDisplayed
            }
        }));
    }else {
        window.dispatchEvent(new CustomEvent("updateEntryCount", {
            detail: {
                count: -1
            }
        }));
    }

    return <div className="table-wrapper" onScroll={() => {
        window.dispatchEvent(new CustomEvent("closeContextMenu", {}));
    }}>
        <table>
            {trEntries}
        </table>
    </div>;
}

export default DashboardTable;