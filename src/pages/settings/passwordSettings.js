import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import DefaultInputField from "../../globalComponents/defaultInputField";
import DefaultButton from "../../globalComponents/defaultButton";
import { setCurrentPasswordPopUp, setNewPasswordPopUp } from "./popup/passwordChangePopUp";

function PasswordSettings() {

    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [info, setInfo] = useState(undefined);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatNewPassword, setRepeatNewPassword] = useState("");

    window.removeEventListener("setPasswordSettingsError", handleSetErrorEvent);
    window.addEventListener("setPasswordSettingsError", handleSetErrorEvent);
    function handleSetErrorEvent(e) {
        setError(e.detail.error);
    }

    return <div className="master-password">

        <p className={(info ? "success" : "error")}>{info ? info : error}</p>

        <label>Current Password</label>
        <DefaultInputField placeholder="Enter Current Password" onChange={(e) => {setCurrentPassword(e.target.value)}} password/>
        <label>New Password</label>
        <DefaultInputField placeholder="Enter New Password" onChange={(e) => {setNewPassword(e.target.value)}} password/>
        <label>Repeat New Password</label>
        <DefaultInputField placeholder="Repeat New Password" onChange={(e) => {setRepeatNewPassword(e.target.value)}} password/>

        <DefaultButton onClick={() => {
            if(newPassword != repeatNewPassword) {
                setError("Your entered passwords do not match");
                setInfo(undefined);
                return;
            }
            // TODO: Check the password quality
            setCurrentPasswordPopUp(currentPassword);
            setNewPasswordPopUp(newPassword);
            navigate("/settings/password/confirm");
            
        }}>Update</DefaultButton>

    </div>;

}

export default PasswordSettings;