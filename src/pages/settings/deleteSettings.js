import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import WarningIcon from "../../assets/icons/warning";

import DefaultButton from "../../globalComponents/defaultButton";
import DefaultInputField from "../../globalComponents/defaultInputField";
import { setPasswordPopUp } from "./popup/deletePopUp";

function DeleteSettings() {

    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    window.removeEventListener("setDeleteSettingsError", handleSetErrorEvent);
    window.addEventListener("setDeleteSettingsError", handleSetErrorEvent);
    function handleSetErrorEvent(e) {
        setError(e.detail.error);
    }

    return <div className="delete">
        <p className="error">{error}</p>
        <p><WarningIcon/>When you delete your account there ist no way that this action can be undone!</p>
        <label>Password</label>
        <DefaultInputField placeholder="Enter New Password" onChange={(e) => {setPassword(e.target.value)}} password/>
        <label>Repeat Password</label>
        <DefaultInputField placeholder="Repeat New Password" onChange={(e) => {setRepeatPassword(e.target.value)}} password/>
        <DefaultButton onClick={() => {
            if(password != repeatPassword) {
                setError("Your entered passwords do not match");
                return;
            }
            setPasswordPopUp(password);
            navigate("/settings/delete/confirm");
        }}>
            Delete
        </DefaultButton>
    </div>;
}

export default DeleteSettings;