import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ChevronIcon from "../../assets/icons/chevron";
import { setParam } from "../../globalComponents/globalParams";
import { user } from "../../content/userManager";
import { swipeLeft } from "../../globalComponents/animationWrapper";

function DashboardUserDropdown() {

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);


    return <div className={"user-dropdown" + (open ? " open" : "")}>
        <div className="user" onClick={() => {
            setOpen(!open);
            window.dispatchEvent(new CustomEvent("closeContextMenu", {}));
        }}>
            <h4>{user ? user.getName() : ""}</h4>
            <div className="dropdown-btn"><ChevronIcon/></div>
        </div>
        <div className="dropdown">
            <ul>
                <li onClick={() => {
                    swipeLeft("settings/profile");
                }}>Settings</li>
                <li onClick={() => {
                    navigate("/dashboard/export");
                }}>Export</li>
                <li>Import</li>
                <li><hr></hr></li>
                <li onClick={() => {
                    navigate("/logout");
                }}>Logout</li>
            </ul>
        </div>
    </div>;

}

export default DashboardUserDropdown;