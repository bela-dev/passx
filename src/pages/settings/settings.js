import React, {useState, useEffect} from "react";

import { useNavigate, useParams } from "react-router-dom";

import DefaultWrapper from "../../globalComponents/defaultWrapper";

import UserIcon from "../../assets/icons/user";
import TrashIcon from "../../assets/icons/trash";
import LockIcon from "../../assets/icons/lock";
import KeyIcon from "../../assets/icons/key";

import "./style/settings.css";
import ProfileSettings from "./profileSettings";
import XMarkIcon from "../../assets/icons/xmark";
import { setParam } from "../../globalComponents/globalParams";
import { checkUser, getDummyUser, user } from "../../content/userManager";
import PasswordSettings from "./passwordSettings";
import { swipeRight } from "../../globalComponents/animationWrapper";
import PasswordChangePopUp from "./popup/passwordChangePopUp";
import DeleteSettings from "./deleteSettings";
import TwoFASettings from "./2faSettings";
import DeletePopUp from "./popup/deletePopUp";

function Settings(props) {

    const { page } = useParams();
    const navigate = useNavigate();

    const [localUser, setLocalUser] = useState(getDummyUser());

    useEffect(() => {
        if(checkUser(navigate)) {
            setLocalUser(user);
        }
    });

    const settingsElements = [
        new SettingsElement("Profile", <UserIcon/>, <ProfileSettings user={localUser}/>, <></>),
        new SettingsElement("Password", <KeyIcon/>, <PasswordSettings/>, <PasswordChangePopUp/>),
        new SettingsElement("2FA", <LockIcon/>, <TwoFASettings/>, <></>),
        new SettingsElement("Delete", <TrashIcon/>, <DeleteSettings/>, <DeletePopUp/>),
    ]

    var currentSettingsElement;

    settingsElements.map((e) => {
        if(e.compName(page)) {
            currentSettingsElement = e;
        }
    })
    

    return <>
        {props.confirm ? currentSettingsElement.getPopUp() : <></>}
        <DefaultWrapper>
            <div className="settings box-wrapper fs-wrapper">

                <h1>Settings</h1>
                
                <div className="settings-content">
                    <div className="close-xmark" onClick={() => {
                            swipeRight("dashboard");
                        }}>
                        <XMarkIcon/>
                    </div>
                    <nav>
                        {settingsElements.map((e) => {
                            return <div onClick={() => navigate(e.getPath())} className={"element" + (e.compName(page) ? " active" : "")}>
                                {e.getIcon()}
                                <h3>{e.getName()}</h3>
                            </div>;
                        })}
                    </nav>
                    
                    <div className="content dashboard">
                        {currentSettingsElement.getContent()}
                    </div>
                </div>

            </div>
        </DefaultWrapper>
    </>;
}

class SettingsElement {
    constructor(name, icon, content, popup) {
        this.name = name;
        this.icon = icon;
        this.content = content;
        this.popup = popup;
    }

    getPath() {
        return "/settings/" + this.name.toLowerCase();
    }

    getPopUp() {
        return this.popup;
    }

    compName(txt) {
        return this.name.toLowerCase().includes(txt.toLowerCase());
    }

    getName() {
        return this.name;
    }

    getIcon() {
        return this.icon;
    }

    getContent() {
        return this.content;
    }
}

export default Settings;