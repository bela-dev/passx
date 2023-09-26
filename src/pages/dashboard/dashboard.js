import React, { useEffect, useRef, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import "./style/dashboard.css";

import AddIcon from "../../assets/icons/add";

import DefaultWrapper from "../../globalComponents/defaultWrapper";
import DashboardTable from "./dashboardTable";
import DashboardUserDropdown from "./dashboardUserDropdown";

import { checkUser } from "../../content/userManager";
import { getEntries, getEntryById, loadEntries } from "../../content/entryManager";
import { getParam, setParam } from "../../globalComponents/globalParams";

import DeleteEntryPopUp from "./popup/deleteEntryPopUp";
import EditEntryPopUp from "./popup/editEntryPopUp";
import ContextMenu from "./contextMenu";
import { swipeLeft } from "../../globalComponents/animationWrapper";
import ExportPopUp from "./popup/exportPopUp";
import ImportPopUp from "./popup/importPopUp";
import DefaultButton from "../../globalComponents/defaultButton";

function Dashboard(props) {

    const entryId = useParams("id");

    const dashboardEl = useRef();

    const navigate = useNavigate();
    const [entries, setEntries] = useState([]);
    const [userValid, setUserValid] = useState(true);

    const [filter, setFilter] = useState("");
    const [entryCount, setEntryCount] = useState(-1);

    window.addEventListener("updateEntryCount", (e) => {
        setEntryCount(e.detail.count);
    });

    window.addEventListener("updateDashboard", () => {
        setEntries(getEntries());
    });

    useEffect(() => {
        if(!checkUser(navigate)) {
            setUserValid(false);
        }
        setEntries(getEntries());
    });

    if(!userValid) {
        return <DefaultWrapper/>;
    }

    return <>
        {props.add ? <EditEntryPopUp add/> : <></>}
        {props.export ? <ExportPopUp/> : <></>}
        {props.import ? <ImportPopUp/> : <></>}
        {props.edit ? <EditEntryPopUp entry={getEntryById(entryId.id)}/> : <></>}
        {props.delete ? <DeleteEntryPopUp entryId={entryId.id}/> : <></>}
        <ContextMenu/>
        <DefaultWrapper>
            <div className="dashboard box-wrapper fs-wrapper" ref={dashboardEl}>
                <header>
                    <input type="text" className="filter" placeholder="Filter..." autoComplete="off" onChange={(e) => {setFilter(e.target.value)}}/>
                    <span className="entry-count">{entryCount > -1 ? entryCount : ""}</span>
                    <div className="add" onClick={() => navigate("/dashboard/add")}><AddIcon/></div>
                    <DashboardUserDropdown/>
                </header>
                {entries.length > 0 ? <DashboardTable
                    entries={entries} 
                    filter={filter}
                    wrapperWidth={dashboardEl.current ? getComputedStyle(dashboardEl.current).getPropertyValue("--width").replace("px", "") : 0}
                    wrapperHeight={dashboardEl.current ? getComputedStyle(dashboardEl.current).getPropertyValue("--height").replace("px", "") : 0}
                /> : <div className="empty">
                    <h1>Seems a bit empty</h1>
                    <DefaultButton onClick={() => navigate("/dashboard/add")}>Add Entry</DefaultButton>
                </div>}
                
            </div>
        </DefaultWrapper>
    </>;
}

export default Dashboard;