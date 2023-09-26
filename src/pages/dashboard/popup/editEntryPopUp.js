import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addEntry, editEntry } from "../../../content/entryManager";

import { openInfo } from "../../../globalComponents/infoDisplay";
import PopUp from "../../../globalComponents/popUp";


import DefaultInputField from "../../../globalComponents/defaultInputField";
import GenerateButton from "../../../globalComponents/generateButton";

function EditEntryPopUp(props) {

    const navigate = useNavigate();

    const add = props.add;

    const [title, setTitle] = useState(props.entry ? props.entry.getTitle() : "");
    const [username, setUsername] = useState(props.entry ? props.entry.getUsername() : "");
    const [email, setEmail] = useState(props.entry ? props.entry.getEmail() : "");
    const [url, setUrl] = useState(props.entry ? props.entry.getUrl() : "");
    const [password, setPassword] = useState(props.entry ? props.entry.getPassword() : "");
    const [description, setDescription] = useState(props.entry ? props.entry.getDescription() : "");

    useEffect(() => {
        window.dispatchEvent(new CustomEvent("closeContextMenu", {}));
    });

    return <PopUp 
    className={props.add ? "add" : "edit"}
    title={(props.add ? "Add" : "Edit") + " Entry"}
    btnLeft={{
        title: props.add ? "Add" : "Save",
        onClick: () => {
            if(title == "") {
                openInfo("Error", "Your title cannot be empty");
                return;
            }
            if(add) {
                addEntry(title, username, url, email, password, description);
            }else {
                editEntry(props.entry.getId(), title, username, url, email, password, description);
            }
        }
    }} btnRight={add ? "" : {
        title: "Delete",
        onClick: () => {
            setTimeout(() => {
                navigate("/dashboard/delete/" + props.entry.getId());
            }, 500);
        }
    }}>
        <DefaultInputField placeholder="Title" defaultValue={title} onChange={(e) => {setTitle(e.target.value)}}/>
        <DefaultInputField placeholder="Username" defaultValue={username} onChange={(e) => setUsername(e.target.value)}/>
        <DefaultInputField placeholder="Email" defaultValue={email} onChange={(e) => setEmail(e.target.value)}/>
        <DefaultInputField placeholder="URL" defaultValue={url} onChange={(e) => setUrl(e.target.value)}/>
        <DefaultInputField generate generateName="Password" password placeholder="Password" defaultValue={password} onChange={(e) => setPassword(e.target.value)}/>
        <DefaultInputField placeholder="Description" defaultValue={description} onChange={(e) => {setDescription(e.target.value)}} textarea />
    </PopUp>;

}

export default EditEntryPopUp;