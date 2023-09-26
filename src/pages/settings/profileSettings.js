import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import { updateUser } from "../../content/userManager";

import DefaultButton from "../../globalComponents/defaultButton";
import DefaultInputField from "../../globalComponents/defaultInputField";

function ProfileSettings(props) {

    const user = props.user;
    
    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [info, setInfo] = useState(undefined);

    const [username, setUsername] = useState(user.getName());
    const [email, setEmail] = useState(user.getEmail());
    const [password, setPassword] = useState(user.getPassword());

    return <div className="profile">
        <p className={(info ? "success" : "error")}>{info ? info : error}</p>
        <label>Username</label>
        <DefaultInputField placeholder="Enter Username" defaultValue={user.getName()} onChange={(e) => {setUsername(e.target.value);setError("");setInfo(undefined);}}/>
        <label>Email</label>
        <DefaultInputField placeholder="Enter Email" defaultValue={user.getEmail()} onChange={(e) => {setEmail(e.target.value);setError("");setInfo(undefined);}} email/>
        
        <a onClick={() => {navigate("/settings/password");}}>Change Master Password?</a>
        <DefaultButton onClick={() => {
            updateUser(password, username, email, (d) => {
                if(d.status.includes("200")) {
                    setInfo("You successfully updated your user information!");
                }else {
                    setError(d.message);
                }
            });
        }}>Save</DefaultButton>
    </div>;
}

export default ProfileSettings;