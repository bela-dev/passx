import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import ChevronIcon from "../../assets/icons/chevron";
import { setParam } from "../../globalComponents/globalParams";
import { user } from "../../content/userManager";
import { swipeLeft } from "../../globalComponents/animationWrapper";

function DashboardUserDropdown() {

    const dropdownEl = useRef();

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    useEffect(() => {
        window.addEventListener("click", (e) => {
            try {
                if(!dropdownEl.current.contains(e.target)) setOpen(false);
            } catch (error) {}
        });
    });


    return <div ref={dropdownEl} className={"user-dropdown" + (open ? " open" : "")}>
        <div className="user" onClick={() => {
            setOpen(!open);
            window.dispatchEvent(new CustomEvent("closeContextMenu", {}));
        }}>
            <h4>{user ? user.getName() : ""}</h4>
            <div className="dropdown-btn"><ChevronIcon down={!open} up={open}/></div>
        </div>
        <div className="dropdown">
            <ul>
                <li onClick={() => {
                    swipeLeft("settings/profile");
                }}>Settings</li>
                <li onClick={() => {
                    setOpen(false);
                    navigate("/dashboard/export");
                }}>Export</li>
                <li onClick={() => {
                    setOpen(false);
                    navigate("/dashboard/import");
                }}>Import</li>
                <li className="hr"><hr></hr></li>
                <li onClick={() => {
                    setOpen(false);
                    navigate("/logout");
                }}>Logout</li>
            </ul>
        </div>
    </div>;

}

export default DashboardUserDropdown;